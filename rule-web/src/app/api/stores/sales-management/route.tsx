import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import Store from '@/models/storeModel';

export async function GET(req: NextRequest) {
    //await dbConnect();
    try {
        const totalSales = 12323;
        const events = [
            {
                name: 'drinking party event',
                date: 'September 16, 2023 17:00',
                earnings: '12356'
            },
            {
                name: "Married people's Party",
                date: 'September 12, 2023 16:00',
                earnings: '23589'
            },
            {
                name: 'drinking party event',
                date: 'August 20, 2023 17:00',
                earnings: '8535'
            },
            {
                name: '[20s only]Love party Solo and first-time participants are also welcome',
                date: 'August 15, 2023 18:00',
                earnings: '9389'
            },
        // Add more events as needed
        ];
        
        return NextResponse.json({
            totalSales:totalSales,
            events: events
            }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}