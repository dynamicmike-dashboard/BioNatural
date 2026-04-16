import { NextResponse } from 'next/server';

const TEABLE_API_TOKEN = process.env.TEABLE_API_TOKEN;
const CALENDAR_TABLE_ID = 'tblUz4P5EgMygtQlBL8';

export async function GET() {
  try {
    const res = await fetch(`https://app.teable.ai/api/table/${CALENDAR_TABLE_ID}/record?take=30`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TEABLE_API_TOKEN}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json({ error: 'Failed to fetch from Teable', details: errorText }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({ records: data.records });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST for updating record data (Status, Captions)
export async function POST(request: Request) {
  try {
    const { recordId, status, caption_en, caption_es } = await request.json();
    
    // Construct the update payload based on what's provided
    const fields: any = {};
    if (status) fields["Status"] = status;
    if (caption_en !== undefined) fields["Caption_EN"] = caption_en;
    if (caption_es !== undefined) fields["Caption_ES"] = caption_es;

    const res = await fetch(`https://app.teable.ai/api/table/${CALENDAR_TABLE_ID}/record/${recordId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${TEABLE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        record: {
          fields
        }
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json({ error: 'Update Failed', details: errorText }, { status: res.status });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
