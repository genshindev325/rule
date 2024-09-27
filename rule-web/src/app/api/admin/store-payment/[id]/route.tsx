import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import StorePayment from '@/models/storePaymentModel';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const body = await req.json();
  const storeName = body.storeName;

  try {
    const storePayment = await StorePayment.findByIdAndUpdate(params.id, { storeName });
    if (!storePayment) {
      return NextResponse.json({ success: false, message: 'Store payment not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: true, error }, { status: 500 })
  }
}