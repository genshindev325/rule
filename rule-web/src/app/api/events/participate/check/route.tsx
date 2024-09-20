import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import EventParticipate from '@/models/eventParticipateModel';

export async function POST(req: NextRequest) {
  await dbConnect();
  console.log("SDFSDFSDF")

  const body = await req.json();
  try {
    const alreadyParticipate = await EventParticipate.findOne(body);
    if (alreadyParticipate) {
      return NextResponse.json({ success: false, message: 'Already participated' }, { status: 404 });
    }

    return NextResponse.json({ success: true, }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
