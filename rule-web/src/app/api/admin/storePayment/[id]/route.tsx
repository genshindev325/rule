import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Payment from '@/models/paymentModel';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const { title, content } = await req.json();
  console.log('title: ' + title);
  console.log('content: ' + content);

  try {
    const payment = await Payment.findByIdAndUpdate(params.id, { title, content }, { new: true, runValidators: true });
    if (!payment) {
      return NextResponse.json({ success: false, message: 'Payment not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: true, error }, { status: 500 })
  }
}