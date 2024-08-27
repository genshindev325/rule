import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import Store from '@/models/storeModel';

export async function GET(req: NextRequest) {
    //await dbConnect();

    try {
        // Process a GET request
        const lastMonthSales = 333234;
        const thisMonthSales = 23456;
        const scheduledEvents = 3;
        const unreachedCases =1;
        const reviews = 12;
        const reviewResponseRate = 80;
        
        return NextResponse.json({
            lastMonthSales: lastMonthSales,
            thisMonthSales: thisMonthSales,
            scheduledEvents: scheduledEvents,
            unreachedCases: unreachedCases,
            reviews: reviews,
            reviewResponseRate: reviewResponseRate
            }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}