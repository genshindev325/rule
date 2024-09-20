import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import Event from '@/models/eventModel';
import EventParticipate from '@/models/eventParticipateModel';

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    const { store, startDate, endDate } = body;
    const start = new Date(startDate as string);
    const end = new Date(endDate as string);
    const storeId = store;
  
    const events = await Event.aggregate([
      {
        $match: {
          store: storeId,  // Filter by storeId
          eventStartTime: { $gte: start },  // Filter by start time
          eventEndTime: { $lte: end }       // Filter by end time
        }
      },
      {
        $lookup: {
          from: 'eventparticipates',  // Match the name of the EventParticipate collection
          localField: '_id',
          foreignField: 'eventId',
          as: 'participants'
        }
      },
      {
        $addFields: {
          storeEarnings: { $sum: '$participants.totalPrice' }  // Calculate the total earnings
        }
      },
      {
        $project: {
          eventName: 1,
          eventDate: 1,
          storeEarnings: 1
        }
      }
    ]);
    console.log("events: " + events[0]);

    return NextResponse.json({
      events: events
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}