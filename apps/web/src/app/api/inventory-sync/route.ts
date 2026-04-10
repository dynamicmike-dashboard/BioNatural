import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const products = await request.json();
    const supabase = await createClient();

    // Safe upsert on Odoo_ID
    const { data, error } = await supabase
      .from("Master_Inventory")
      .upsert(Array.isArray(products) ? products : [products], { onConflict: "Odoo_ID" });

    if (error) {
      console.error("Inventory Sync Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ status: "success", message: "Master Inventory synced", data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
