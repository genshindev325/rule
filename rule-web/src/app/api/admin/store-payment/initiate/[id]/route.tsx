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
    // Find the store payment by ID
    const storePayment = await StorePayment.findById(params.id);
    console.log(params.id)

    // If storePayment not found, return 404
    if (!storePayment) {
      console.log("AAA")
      return NextResponse.json({ success: false, message: 'Store payment not found' }, { status: 404 });
    }

    // Check if the 'status' field exists and is either 'paid' or 'unpaid'
    if (!storePayment.status) {
      // If 'status' does not exist, initialize it as '未払い' (unpaid)
      storePayment.status = '未払い';
      await storePayment.save();
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
