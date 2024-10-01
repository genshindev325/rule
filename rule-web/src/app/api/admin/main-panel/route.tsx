import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import EventParticipate from '@/models/eventParticipateModel';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, message: 'No token provided' }, { status: 401 });
  }

  await dbConnect();

  try {
    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfThisMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    // Query for last month's sales
    const lastMonthSalesData = await EventParticipate.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfLastMonth, $lt: startOfThisMonth },
        },
      },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: { $multiply: ['$fee', 2] } },
        },
      },
    ]);

    const lastMonthSales = lastMonthSalesData.length > 0 ? lastMonthSalesData[0].totalEarnings : 0;

    // Query for this month's sales
    const thisMonthSalesData = await EventParticipate.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfThisMonth, $lt: endOfThisMonth },
        },
      },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: { $multiply: ['$fee', 2] } },
        },
      },
    ]);

    const thisMonthSales = thisMonthSalesData.length > 0 ? thisMonthSalesData[0].totalEarnings : 0;

    // Return the calculated earnings
    return NextResponse.json(
      {
        lastMonthSales,
        thisMonthSales,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
