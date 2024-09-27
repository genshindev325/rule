import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import EventParticipate from '@/models/eventParticipateModel';
import Event from '@/models/eventModel';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, message: 'No token provided' }, { status: 401 });
  }
  await dbConnect();

  const body = await req.json();
  const userId = body.userId;
  const eventId = body.eventId;
  const gender = body.gender;
  console.log("userId: " + userId);
  console.log("eventId: " + eventId);
  console.log("gender: " + gender);
  try {
    const alreadyParticipate = await EventParticipate.findOne({userId, eventId});
    console.log("alreadyParticipate: " + JSON.stringify(alreadyParticipate));
    if (alreadyParticipate) {
      return NextResponse.json({ success: false, message: 'このイベントにはすでに参加しています' }, { status: 404 });
    } else {
      console.log("AAAA")
      if (gender === 'male') {
        const males = await Event.find(eventId).select('males');
        const maleTotal = await Event.find(eventId).select('maleTotal');
        console.log("males: " + males)
        console.log("maleTotal: " + maleTotal)
        if (males < maleTotal) {
          console.log("mmmOK")
          return NextResponse.json({ success: true, }, { status: 200 });
        } else {
          console.log("mmmbad")
          return NextResponse.json({ success: false, message: '男性人数超過' }, { status: 404 });
        }
      } else if (gender === 'female') {
        console.log("CCC");
        const females = await Event.find(eventId).select('females');
        const femaleTotal = await Event.find(eventId).select('femaleTotal');
        if (females < femaleTotal) {
          console.log("fffOK")
          return NextResponse.json({ success: true, }, { status: 200 });
        } else {
          console.log("fffbad")
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
