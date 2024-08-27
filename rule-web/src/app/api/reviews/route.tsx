import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import Review from '@/models/reviewModel';

export async function GET(req: NextRequest) {
    await dbConnect();

    try {
        const reviews = await Review.find({});
        return NextResponse.json({ success: true, data: reviews }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    
    const body = await req.json();

    try {
        const review = await Review.create(body);
        return NextResponse.json({ success: true, data: review }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}
