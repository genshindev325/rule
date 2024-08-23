import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import Event from '@/models/eventModel';

export async function POST(req: NextRequest) {
    await dbConnect();

    const body = await req.json();
        
    try {
        const query = Event.find();

        query.where("store").equals(body.store);

        if(body.location) {
            query.populate({
                path: 'store',
                match: { address: body.location },
                select: 'address'
            });
        }

        if(body.limit){
            query.limit(body.limit);
        }

        const events = await query.exec();
        return NextResponse.json({ success: true, data: events }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}
