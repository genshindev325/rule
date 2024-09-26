import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import EventParticipate from '@/models/eventParticipateModel';
import Event from '@/models/eventModel';

export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json();
  const userId = body.userId;
  const eventId = body.eventId;
  const gender = body.gender;
  try {
    const alreadyParticipate = await EventParticipate.findOne({userId, eventId});
    if (alreadyParticipate) {
      return NextResponse.json({ success: false, message: 'すでに参加中' }, { status: 404 });
    } else {
      if (gender === 'male') {
        const males = await Event.find(eventId).select('males');
        const maleTotal = await Event.find(eventId).select('maleTotal');
        if (males < maleTotal) {
          return NextResponse.json({ success: true, }, { status: 200 });
        } else {
          return NextResponse.json({ success: false, message: '男性人数超過' }, { status: 404 });
        }
      } else if (gender === 'female') {
        const females = await Event.find(eventId).select('females');
        const femaleTotal = await Event.find(eventId).select('femaleTotal');
        if (females < femaleTotal) {
          return NextResponse.json({ success: true, }, { status: 200 });
        } else {
          return NextResponse.json({ success: false, message: '女性人数超過' }, { status: 404 });
        }
      } else {        
        return NextResponse.json({ success: false, message: 'リクエストには性別情報が含まれていません。' }, { status: 404 });
      }
    }
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
