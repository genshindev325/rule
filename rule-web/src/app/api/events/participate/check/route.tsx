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
  try {
    const alreadyParticipate = await EventParticipate.findOne({userId, eventId});
    if (alreadyParticipate) {
      return NextResponse.json({ success: false, message: 'このイベントにはすでに参加しています' }, { status: 404 });
    } else {
      if (gender === 'male') {
        const event = await Event.findById(eventId);
        if (event === null) {
          return NextResponse.json({ success: false, message: 'イベントが存在しません' }, { status: 404 });
        }
        const males = event.males;
        const maleTotal = event.maleTotal;
        if (males < maleTotal) {
          return NextResponse.json({ success: true, }, { status: 200 });
        } else {
          return NextResponse.json({ success: false, message: '男性人数超過' }, { status: 404 });
        }
      } else if (gender === 'female') {
        const event = await Event.findById(eventId);
        if (event === null) {
          return NextResponse.json({ success: false, message: 'イベントが存在しません' }, { status: 404 });
        }
        const females = event.females;
        const femaleTotal = event.femaleTotal;
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
