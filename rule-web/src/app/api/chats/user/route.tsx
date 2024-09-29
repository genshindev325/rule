import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import ChatMessage from '@/models/chatMessageModel';

export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json();
  const {
    userId,
    storeId,
  } = body;
  try {
    const query = ChatMessage.find();

    query.where("requester").equals(userId);
    query.where("responsor").equals(storeId);

    const messages = await query.exec();
    return NextResponse.json({ success: true, data: messages }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
