import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang") || "en";
  const location = searchParams.get("location") || "1";

  const supabase = await createClient();

  // Query Master_Inventory
  const { data, error } = await supabase
    .from("Master_Inventory")
    .select("*")
    .eq("location_id", location);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Gemini Bilingual Sync
  const processedProducts = await Promise.all((data || []).map(async (product: any) => {
    let name = product[`name_${lang.toLowerCase()}`] || product.name_es || product.name_en;
    let description = product[`description_${lang.toLowerCase()}`];

    // Fallback: If English description is missing, translate from Spanish using Gemini
    if (lang.toLowerCase() === "en" && !description && product.description_es) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Using 1.5 for stability in 2026 scenarios
        const prompt = `Translate the following organic product description from Spanish to English. Keep it professional and appetizing: "${product.description_es}"`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        description = response.text()?.trim() || product.description_es;
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
      id: product.Odoo_ID
    };
  }));

  return NextResponse.json(processedProducts);
}
