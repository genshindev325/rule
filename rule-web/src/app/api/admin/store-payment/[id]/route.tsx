import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import StorePayment from '@/models/storePaymentModel';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, message: 'No token provided' }, { status: 401 });
  }

  await dbConnect();
  try {
    const storePayment = await StorePayment.findByIdAndUpdate(params.id, { status: '支払った' });
    if (!storePayment) {
      return NextResponse.json({ success: false, message: 'Store payment not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: true, error }, { status: 500 })
  }
}