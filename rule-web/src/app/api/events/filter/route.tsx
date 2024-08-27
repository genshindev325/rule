import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import Event from '@/models/eventModel';

export async function POST(req: NextRequest) {
    await dbConnect();

    const body = await req.json();
    try {
        const query = Event.find();
        if(body.upcoming){
            query.where("eventDate").gte(Date());
        } else if(body.openAt) {
            query.where("eventDate").equals(body.openAt);
        } else if(body.past){
            query.where("eventDate").lt(Date());
        }
        
        if(body.category) {
            query.where("category").equals(body.category);
        }

        if(body.location) {
            query.populate({
                path: 'store',
                match: { address: body.location },
                select: 'address'
            });
        }

        if(body.storeGenre) {
            query.populate({
                path: 'store',
                match: { storeGenre: body.storeGenre },
                select: 'storeName'
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
