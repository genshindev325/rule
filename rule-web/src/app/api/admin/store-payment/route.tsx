import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import StorePayment from "@/models/storePaymentModel";

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const query = StorePayment.find();
    query.populate({
      path: 'store',
      select: 'storeName'
    });
    const storePayments = await query.exec();
    // const storePayments = [
    //   { storeId: '1234-1324-1234-1212', storeName: '居酒屋こいち', status: '支払い済', paymentDate: '2024-09-26T00:00:00.000+00:00', paymentAmount: 12356 },
    //   { storeId: '1234-1324-1234-1323', storeName: '鳥貴族梅田店', status: '支払い済', paymentDate: '2024-09-26T00:00:00.000+00:00', paymentAmount: 23589 },
    //   { storeId: '1234-1324-1234-1423', storeName: '出汁のお料理青天井', status: '未払い', paymentDate: '2024-09-26T00:00:00.000+00:00', paymentAmount: 8535 },
    //   { storeId: '1234-1324-1234-1467', storeName: '居酒屋ひろみみ天満', status: '支払い済', paymentDate: '2024-09-26T00:00:00.000+00:00', paymentAmount: 9389 },
    // ];
    return NextResponse.json({ success: true, data: storePayments }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

