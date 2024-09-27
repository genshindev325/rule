import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import EventParticipate from '@/models/eventParticipateModel';
import Event from '@/models/eventModel';
import User from '@/models/userModel';
import StorePayment from '@/models/storePaymentModel';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, message: 'No token provided' }, { status: 401 });
  }
  await dbConnect();

  const body = await req.json();
  const {
    userId,
    eventId,
    totalPrice,
    fee,
    paymentDate,
    // storeId,
    storeName,
  } = body;
  const storeIncome = totalPrice - fee * 2;

  try {
    const alreadyParticipate = await EventParticipate.findOne(body);
    if (alreadyParticipate) {
      return NextResponse.json({ success: false, message: 'Already participated' }, { status: 400 });
    }
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid user" }, { status: 404 });
    }

    const event = await Event.findById(eventId);
    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid event" }, { status: 404 });
    }

    if (user?.gender === "male") {
      const updatedEvent = await Event.findByIdAndUpdate(eventId, { $inc: { males: 1, totalEarnings: totalPrice } });
      if (!updatedEvent) {
        return NextResponse.json({ success: false, message: "Invalid store" }, { status: 404 });
      }
    } else if (user?.gender === "female") {
      const updatedEvent = await Event.findByIdAndUpdate(eventId, { $inc: { females: 1, totalEarnings: totalPrice } });
      if (!updatedEvent) {
        return NextResponse.json({ success: false, message: "Invalid store" }, { status: 404 });
      }
    }

    const eventParticipate = await EventParticipate.create(body);
    if (!eventParticipate)
      return NextResponse.json({ success: false, message: "Failed to participate" }, { status: 400 });

    const storeId = event?.store;
    const storePayment = await StorePayment.findOne({ store: storeId, paymentDate: paymentDate });
    if(storePayment){
      const updateStorePayment = await StorePayment.findOneAndUpdate(
        {
          store: storeId,
          paymentDate: paymentDate
        },
        {
          $inc: {
            paymentAmount: storeIncome
          }
        },
        { new: true }
      );
      console.log("result: " + updateStorePayment);
    } else {
      const newStorePayment = await StorePayment.create({
        store: storeId,
        storeName: storeName,
        paymentDate: paymentDate,
        paymentAmount: storeIncome,
      });
      console.log("result: " + newStorePayment);
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
