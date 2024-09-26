import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import Event from '@/models/eventModel';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, message: 'No token provided' }, { status: 401 });
  }
  await dbConnect();

    const body = await req.json();
    const { store, startDate, endDate } = body;
    const start = new Date(startDate as string);
    const end = new Date(endDate as string);
    const storeId = store;
    let totalSales = 0;
  try {
    const query = Event.find();
    query.where("eventDate").gte(start.getTime());
    query.where("eventDate").lte(end.getTime());
    query.where("store").equals(storeId);
    const events = await query.exec();
    events.forEach((e) => {
      if (e.totalEarnings > 0) {
        totalSales += e.totalEarnings;
      }
    })

    return NextResponse.json({
      events: events, totalSales: totalSales
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}