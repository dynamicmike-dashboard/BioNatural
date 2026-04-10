import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ 
    status: "ok", 
    service: "BioNatural Universal App v2 (Next.js 16/2026 Edition)",
    offline_support: "enabled",
    pwa: "ready"
  });
}
