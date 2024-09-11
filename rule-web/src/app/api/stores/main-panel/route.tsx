import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import Review from '@/models/reviewStoreModel';
import Event from '@/models/eventModel';

export async function POST(req: NextRequest) {
    await dbConnect();
    const body = await req.json();
    const {
        storeId
    } =  body;

    try {
        const lastMonthSales = 333234;
        const thisMonthSales = 23456;
        
        const countOfReviews = await Review.countDocuments({storeId: storeId});
        const countOfReplies = await Review.countDocuments({storeId: storeId, storeReplyText:{$exists: true}});

        const reviewReplyRate = countOfReplies / countOfReplies * 100;

        const countOfUnreachedEvents = await Event.countDocuments({
            store: storeId,
            $or: [{
                $expr: { $lt: ["$males", "$maleTotal"] } 
            },{
                $expr: { $lt: ["$females", "$femaleTotal"] }
            }]});
        
        const countOfScheduledEvents = await Event.countDocuments({store: storeId, eventDate: { $gte: new Date().getTime() }});

        return NextResponse.json({
            lastMonthSales: lastMonthSales,
            thisMonthSales: thisMonthSales,
            scheduledEvents: countOfScheduledEvents,
            unreachedCases: countOfUnreachedEvents,
            reviews: countOfReviews,
            reviewResponseRate: reviewReplyRate
            }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}