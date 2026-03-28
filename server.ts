import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { bilingualEngine } from "./src/services/bilingualEngine.ts";
import { middlewareService } from "./src/services/middlewareService.ts";
import { productService } from "./src/services/productService.ts";
import { Language } from "./src/services/localizationService.ts";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "BioNatural Growth Engine" });
  });

  // Growth Engine: Products Endpoint
  app.get("/api/products", async (req, res) => {
    const lang = (req.query.lang as Language) || "en";
    try {
      const products = await productService.getProducts(lang);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Growth Engine: Instagram Simulation Endpoint
  app.post("/api/automation/instagram", async (req, res) => {
    const { keyword } = req.body;
    if (!keyword) return res.status(400).json({ error: "Keyword required" });

    try {
      const product = await productService.getProductByKeyword(keyword);
      if (product) {
        res.json({
          reply: `Thanks for your interest! Here is the link: ${product.direct_url}`,
          productName: product.name.en,
          url: product.direct_url
        });
      } else {
        res.json({ reply: "Sorry, we couldn't find a match for that keyword." });
      }
    } catch (error) {
      res.status(500).json({ error: "Automation failed" });
    }
  });

  // Bilingual Search Endpoint
  app.get("/api/search", async (req, res) => {
    const { query, lang = "en" } = req.query;
    if (!query) return res.status(400).json({ error: "Query is required" });

    try {
      const results = await bilingualEngine.search(query as string, lang as string);
      res.json(results);
    } catch (error) {
      console.error("Search error:", error);
      res.status(500).json({ error: "Search failed" });
    }
  });

  // Order Routing Endpoint (Middleware for Odoo, Rappi, Mercado Libre)
  app.post("/api/orders/route", async (req, res) => {
    const orderData = req.body;
    try {
      const routedOrder = await middlewareService.processAndRouteOrder(orderData);
      res.json(routedOrder);
    } catch (error) {
      console.error("Routing error:", error);
      res.status(500).json({ error: "Order routing failed" });
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
