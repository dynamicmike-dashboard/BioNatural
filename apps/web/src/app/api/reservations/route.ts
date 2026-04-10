import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const { date, time, party_size, customer_name, customer_phone, location } = await request.json();

    if (!date || !time || !party_size || !location) {
      return NextResponse.json({ error: "Missing required reservation fields" }, { status: 400 });
    }

    const supabase = await createClient();

    // Check capacity
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
      return NextResponse.json({ error: "Capacity exceeded" }, { status: 400 });
    }

    // Insert reservation
    const { data: reservation, error: resError } = await supabase
      .from("reservations")
      .insert([{ date, time, party_size, customer_name, customer_phone, location, status: "confirmed" }])
      .select()
      .single();

    if (resError) throw resError;

    // Update capacity
    await supabase
      .from("current_capacity")
      .upsert({
        location, date, time,
        current_occupancy: currentOccupancy + parseInt(party_size),
        max_capacity: maxCapacity
      }, { onConflict: "location,date,time" });

    // WhatsApp notification via TinyTalk
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

    return NextResponse.json({ status: "confirmed", reservation });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
