import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import Review from '@/models/reviewStoreModel';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, message: 'No token provided' }, { status: 401 });
  }
  await dbConnect();

  const body = await req.json();
  const {
    reviewId,
    replyText
  } = body;

  try {
    const review = await Review.findByIdAndUpdate(reviewId, { storeReplyText: replyText });
    return NextResponse.json({ success: true, data: review }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
