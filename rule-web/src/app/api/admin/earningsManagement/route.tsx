import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import EventParticipate from '@/models/eventParticipateModel';
import Event from '@/models/eventModel';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, message: 'No token provided' }, { status: 401 });
  }

  await dbConnect();

  try {
    const now = new Date();
    const year = now.getFullYear();

    // Step 1: Calculate salesData (monthly sales for the current year)
    const salesData = await EventParticipate.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { month: { $month: '$createdAt' } },
          monthlySales: { $sum: { $multiply: ['$fee', 2] } },
        },
      },
      { $sort: { '_id.month': 1 } },
    ]);

    // Fill missing months with 0 sales
    const fullSalesData = Array(12).fill(0);
    salesData.forEach((entry) => {
      fullSalesData[entry._id.month - 1] = entry.monthlySales;
    });

    // Step 2: Calculate eventsData (monthly average events per day for each month)
    const eventsData = await Event.aggregate([
      {
        $match: {
          eventDate: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { month: { $month: '$eventDate' } },
          totalEvents: { $sum: 1 },
        },
      },
      { $sort: { '_id.month': 1 } },
    ]);

    // Calculate average events per day for each month
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // Days in each month of a year
    if (year % 4 === 0) daysInMonth[1] = 29; // Leap year check

    const fullEventsData = Array(12).fill(0);
    eventsData.forEach((entry) => {
      fullEventsData[entry._id.month - 1] = entry.totalEvents / daysInMonth[entry._id.month - 1];
    });

    // Step 3: Calculate salesTotal (all EventParticipate fees * 2)
    const totalSalesData = await EventParticipate.aggregate([
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: { $multiply: ['$fee', 2] } },
        },
      },
    ]);
    const salesTotal = totalSalesData.length > 0 ? totalSalesData[0].totalEarnings : 0;

    // Step 4: Calculate salesExp (maleFee * maleTotal + femaleFee * femaleTotal) * 2
    const salesExpData = await Event.aggregate([
      {
        $group: {
          _id: null,
          totalEarnings: {
            $sum: {
              $multiply: [
                {
                  $add: [
                    { $multiply: ['$maleFee', '$maleTotal'] },
                    { $multiply: ['$femaleFee', '$femaleTotal'] },
                  ],
                },
                2,
              ],
            },
          },
        },
      },
    ]);

    const salesExp = salesExpData.length > 0 ? salesExpData[0].totalEarnings : 0;

    // Step 5: Return the calculated data
    return NextResponse.json(
      {
        salesTotal,
        salesExp,
        salesData: fullSalesData, // Real sales data for the current year
        eventsData: fullEventsData, // Real average events per day for the current year
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
