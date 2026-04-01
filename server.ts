import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import axios from "axios";
import { createServer as createViteServer } from "vite";
import { supabase } from "./src/lib/supabase.ts";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  app.use(express.json());
  app.use(cookieParser());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "BioNatural Logic Architect v2" });
  });

  /**
   * Database Logic: Fetch products from Master_Inventory
   * Filters by location and handles bilingual fallback with Gemini.
   */
  app.get("/api/products", async (req, res) => {
    const lang = (req.query.lang as string) || "en";
    const location = (req.query.location as string) || "1";
    
    // Query Master_Inventory table
    const { data, error } = await supabase
      .from("Master_Inventory")
      .select("*")
      .eq("location_id", location);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Bilingual Sync: AI-driven fallback
    const processedProducts = await Promise.all((data || []).map(async (product: any) => {
      let name = product[`name_${lang.toLowerCase()}`] || product.name_es || product.name_en;
      let description = product[`description_${lang.toLowerCase()}`];

      // Fallback: If English description is missing, translate from Spanish using Gemini
      if (lang.toLowerCase() === "en" && !description && product.description_es) {
        try {
          const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `Translate the following organic product description from Spanish to English. Keep it professional and appetizing: "${product.description_es}"`,
          });
          description = response.text?.trim() || product.description_es;
          
          // Optional: Cache the translation back to Supabase to save tokens in future
          /*
          await supabase
            .from("Master_Inventory")
            .update({ description_en: description })
            .eq("Odoo_ID", product.Odoo_ID);
          */
        } catch (aiError) {
          console.error("Gemini translation failed:", aiError);
          description = product.description_es; // Fallback to Spanish if AI fails
        }
      } else if (!description) {
        description = product.description_es || product.description_en;
      }

      return {
        ...product,
        name,
        description,
        id: product.Odoo_ID // Use Odoo_ID as the primary identifier for the frontend
      };
    }));

    res.json(processedProducts);
  });

  /**
   * Automation Hub: n8n-ready webhook
   * Performs 'safe upsert' into Master_Inventory using Odoo_ID as unique key.
   */
  app.post("/api/inventory-sync", async (req, res) => {
    const products = Array.isArray(req.body) ? req.body : [req.body];

    if (!products.length) {
      return res.status(400).json({ error: "No product data provided" });
    }

    // Safe upsert on Odoo_ID
    const { data, error } = await supabase
      .from("Master_Inventory")
      .upsert(products, { onConflict: "Odoo_ID" });

    if (error) {
      console.error("Inventory Sync Error:", error);
      return res.status(500).json({ error: error.message });
    }

    res.json({ status: "success", message: "Master Inventory synced", data });
  });

  /**
   * Reservation Engine
   */
  app.post("/api/reservations", async (req, res) => {
    const { date, time, party_size, customer_name, customer_phone, location } = req.body;

    if (!date || !time || !party_size || !location) {
      return res.status(400).json({ error: "Missing required reservation fields" });
    }

    try {
      const { data: capacity, error: capError } = await supabase
        .from("current_capacity")
        .select("*")
        .eq("location", location)
        .eq("date", date)
        .eq("time", time)
        .single();

      if (capError && capError.code !== "PGRST116") throw capError;

      const maxCapacity = capacity?.max_capacity || 50;
      const currentOccupancy = capacity?.current_occupancy || 0;

      if (currentOccupancy + parseInt(party_size) > maxCapacity) {
        return res.status(400).json({ error: "Capacity exceeded" });
      }

      const { data: reservation, error: resError } = await supabase
        .from("reservations")
        .insert([{ date, time, party_size, customer_name, customer_phone, location, status: "confirmed" }])
        .select()
        .single();

      if (resError) throw resError;

      await supabase
        .from("current_capacity")
        .upsert({
          location, date, time,
          current_occupancy: currentOccupancy + parseInt(party_size),
          max_capacity: maxCapacity
        }, { onConflict: "location,date,time" });

      // WhatsApp notification logic (Tinytalk)
      const tinytalkApiKey = process.env.TINYTALK_API_KEY;
      const managerPhone = process.env.MANAGER_WHATSAPP_NUMBER;
      
      if (tinytalkApiKey && managerPhone) {
        try {
          await axios.post("https://api.tinytalk.ai/v1/messages", {
            to: managerPhone,
            message: `New Reservation at ${location}!\nName: ${customer_name}\nDate: ${date}\nTime: ${time}`,
          }, {
            headers: { "Authorization": `Bearer ${tinytalkApiKey}` }
          });
        } catch (msgError) {
          console.error("WhatsApp notification failed:", msgError);
        }
      }

      res.json({ status: "confirmed", reservation });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BioNatural Server running on http://localhost:${PORT}`);
  });
}

startServer();
