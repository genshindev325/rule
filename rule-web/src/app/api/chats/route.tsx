import { type NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import ChatMessage from '@/models/chatMessageModel';

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  const {
    sender,
    receiver,
    message,
  } = body;

  try {
      const chatMessage = await ChatMessage.create(body);
      return NextResponse.json({
        success: true,
        data: chatMessage
    }, { status: 201 });
  } catch (error) {
      return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
