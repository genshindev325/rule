import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import Store from '@/models/storeModel';

export async function GET(req: NextRequest) {
    //await dbConnect();
    try {
        const totalSales = 12345;
        const events = [
            {
                name: '街コン・合コン・飲み会イベント',
                date: '2023-09-20T17:00:00.000+00:00',
                earnings: '12356'
            },
            {
                name: "梅田で一番集まる！既婚者合コン",
                date: '2023-10-12T16:00:00.000+00:00',
                earnings: '23589'
            },
            {
                name: '街コン・合コン・飲み会イベント',
                date: '2023-10-20T17:00:00.000+00:00',
                earnings: '8535'
            },
            {
                name: '[20代限定]恋活パーティー★一人参加・初参...',
                date: '2023-12-15T18:00:00.000+00:00',
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