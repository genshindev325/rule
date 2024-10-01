import { NextRequest, NextResponse } from 'next/server';

import dbConnect from '@/lib/mongoose';
import EventParticipate from '@/models/eventParticipateModel';
import Event from '@/models/eventModel';
import ReviewStore from '@/models/reviewStoreModel';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, message: 'No token provided' }, { status: 401 });
  }
  await dbConnect();
  const body = await req.json();
  const { storeId } = body;

  try {
    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfThisMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    // Step 1: Find all events created by the store
    const storeEvents = await Event.find({ store: storeId });

    if (!storeEvents || storeEvents.length === 0) {
      return NextResponse.json({ success: true, lastMonthSales: 0, thisMonthSales: 0, scheduledEvents: 0, unreachedCases: 0, reviews: 0, reviewResponseRate: 0 }, { status: 200 });
    }

    const eventIds = storeEvents.map(event => event._id);

    // Step 2: Query for last month's sales based on the events created by the store
    const lastMonthSalesData = await EventParticipate.aggregate([
      {
        $match: {
          eventId: { $in: eventIds },
          createdAt: { $gte: startOfLastMonth, $lt: startOfThisMonth },
        },
      },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: { $subtract: ['$totalPrice', '$fee'] } },
        },
      },
    ]);

    const lastMonthSales = lastMonthSalesData.length > 0 ? lastMonthSalesData[0].totalEarnings : 0;

    // Step 3: Query for this month's sales based on the events created by the store
    const thisMonthSalesData = await EventParticipate.aggregate([
      {
        $match: {
          eventId: { $in: eventIds },
          createdAt: { $gte: startOfThisMonth, $lt: endOfThisMonth },
        },
      },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: { $subtract: ['$totalPrice', '$fee'] } },
        },
      },
    ]);

    const thisMonthSales = thisMonthSalesData.length > 0 ? thisMonthSalesData[0].totalEarnings : 0;

    // Step 4: Calculate scheduled events (eventDate > now)
    const scheduledEvents = storeEvents.filter(event => event.eventDate > now).length;

    // Step 5: Calculate unreached cases (eventDate < now and males < maleTotal or females < femaleTotal)
    const unreachedCases = storeEvents.filter(event => event.eventDate < now && (event.males < event.maleTotal || event.females < event.femaleTotal)).length;

    // Step 6: Get reviews for the store and calculate reviewResponseRate
    const reviews = await ReviewStore.find({ storeId });

    const totalReviews = reviews.length;
    const respondedReviews = reviews.filter(review => review.storeReplyText).length;

    const reviewResponseRate = totalReviews > 0 ? (respondedReviews / totalReviews) * 100 : 0;

    // Step 7: Return the calculated data
    return NextResponse.json(
      {
        lastMonthSales,
        thisMonthSales,
        scheduledEvents,
        unreachedCases,
        reviews: totalReviews,
        reviewResponseRate,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
