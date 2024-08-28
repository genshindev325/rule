import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import storeReview from '@/models/reviewStoreModel';

export async function POST(req: NextRequest) {
    await dbConnect();

    const body = await req.json();
    try {
        const query = storeReview.find();
        if(body.storeId){
            console.log(body.storeId)
            query.where("storeId").equals(body.storeId);
            query.populate({
                path: 'createdBy',
                select: 'nickname email'
            })
        }

        const reviews = await query.exec();
        return NextResponse.json({ success: true, data: reviews }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}
