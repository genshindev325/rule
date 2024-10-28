import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import StorePayment from "@/models/storePaymentModel";

interface StoreSale {
  storeName: string,
  sales: number,
  salesForecast: number,
  totalDepositedAmount: number
}

const storeSales = [
  {
    storeName: '居酒屋こいち',
    sales: 13245,
    salesForecast: 15543,
    totalDepositedAmount: 13245
  },
  {
    storeName: '居酒屋こいち-izakaya',
    sales: 8769,
    salesForecast: 9862,
    totalDepositedAmount: 8769
  }
]

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, message: 'No token provided' }, { status: 401 });
  }

  await dbConnect();
  try {
    let query = StorePayment.find()
    const storePayments = await query.exec();
    return NextResponse.json({ success: true, storeSales: storeSales }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}