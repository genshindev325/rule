import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import StorePayment from "@/models/storePaymentModel";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, message: 'No token provided' }, { status: 401 });
  }

  await dbConnect();
  try {
    let query = StorePayment.find()
    const storePayments = await query.exec();
    return NextResponse.json({ success: true, data: storePayments }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

