import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import storeReview from '@/models/reviewStoreModel';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, message: 'No token provided' }, { status: 401 });
  }
  await dbConnect();

  const body = await req.json();
  try {
    const query = storeReview.find();
    if (body.storeId) {
      query.where("storeId").equals(body.storeId);
      query.populate({
        path: 'createdBy',
        select: 'nickname email avatar'
      })
    }

    const reviews = await query.exec();
    return NextResponse.json({ success: true, data: reviews }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
