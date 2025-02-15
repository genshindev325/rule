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

  try {
    const query = Event.find();

    query.where("store").equals(body.store);

    query.where("eventDate").gte(new Date().getTime());

    if (body.location) {
      query.populate({
        path: 'store',
        match: { address: body.location },
        select: 'address'
      });
    }

    if (body.limit) {
      query.limit(body.limit);
    }

    const events = await query.exec();
    return NextResponse.json({ success: true, data: events }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
