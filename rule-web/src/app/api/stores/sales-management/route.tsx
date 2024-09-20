import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import Event from '@/models/eventModel';
import EventParticipate from '@/models/eventParticipateModel';

export async function POST(req: NextRequest) {
  await dbConnect();

    const body = await req.json();
    const { store, startDate, endDate } = body;
    const start = new Date(startDate as string);
    const end = new Date(endDate as string);
    const storeId = store;
  try {
    const query = Event.find();
    query.where("eventDate").gte(start.getTime());
    query.where("eventDate").lte(end.getTime());
    query.where("store").equals(storeId);
    const events = await query.exec();
    events.map(async (e) => {
      const query = EventParticipate.find();
      query.where("eventId").equals(e._id);
      const participate = await query.exec();
      if (participate) console.log(`${e._id}-totalPrice: ` + participate[0].totalPrice);
    })

    return NextResponse.json({
      events: events
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}