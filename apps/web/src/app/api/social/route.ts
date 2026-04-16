import { NextResponse } from 'next/server';

const TEABLE_API_TOKEN = process.env.TEABLE_API_TOKEN || 'teable_acchP4Hm8Z4MJCQkmrR_YlbPxji2yRC+bOIV8Wr5Rn+l+oevsoy26OxI6HKd43U=';
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

// Optional POST for updating status (Approve/Reject)
export async function POST(request: Request) {
  try {
    const { recordId, status } = await request.json();
    
    // We update the record status to "Approved"
    const res = await fetch(`https://app.teable.ai/api/table/${CALENDAR_TABLE_ID}/record/${recordId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${TEABLE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        record: {
          fields: {
            "Status": status
          }
        }
      })
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Update Failed' }, { status: res.status });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
