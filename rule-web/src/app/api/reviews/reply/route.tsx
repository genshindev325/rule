import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import Review from '@/models/reviewStoreModel';

export async function POST(req: NextRequest) {
    await dbConnect();
    
    const body = await req.json();
    const {
        reviewId,
        replyText
    } = body;

    try {
        const review = await Review.findByIdAndUpdate(reviewId, {storeReplyText: replyText});
        return NextResponse.json({ success: true, data: review }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}
