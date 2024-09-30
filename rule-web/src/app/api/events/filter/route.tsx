import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import Event from '@/models/eventModel';
import EventParticipate from '@/models/eventParticipateModel';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, message: 'No token provided' }, { status: 401 });
  }
  await dbConnect();

  const body = await req.json();
  try {
    let query = Event.find();
    if (body.upcoming) {
      query.where("eventDate").gte(new Date().getTime());
      query = Event.find({
        eventDate: { $gt: new Date() },
      }).populate({
        path: 'store',
        select: 'storeLat storeLng storeName storeImages address access description status cookingGenre foodGenre storeGenre'
      })
    } else if (body.past) {
      // find past events user participated
      if (body.user) {
        // Find all event participations by the user
        const participatedEvents = await EventParticipate.find({
          userId: body.user,
        }).select('eventId');
        // Extract event IDs
        const eventIds = participatedEvents.map((participation) => participation.eventId);
        // Query Event model to find events in the past
        query = Event.find({
          _id: { $in: eventIds },
          eventDate: { $lt: new Date() },
        }).populate({
          path: 'store',
          select: 'rating address access description storeImages storeName'
        })
      } else {
        query.where("eventDate").lt(new Date().getTime());
        query.populate({
          path: 'store',
          select: 'rating address access description storeImages storeName'
        })
      }
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
