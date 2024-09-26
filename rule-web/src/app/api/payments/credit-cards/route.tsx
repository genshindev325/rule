import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import Store from '@/models/storeModel';
import User from '@/models/userModel';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, message: 'No token provided' }, { status: 401 });
  }
  await dbConnect();

  const body = await req.json();
  const {
    holderId,
    holderRole,
  } = body;

  try {
    if (holderRole === "user") {
      const existingUser = await User.findById(holderId);
      if (existingUser) {
        const creditCard = existingUser.creditCard;
        if (creditCard) {
          return NextResponse.json({
            success: true,
            data: {
              creditCard: creditCard,
            },
            message: ""
          }, { status: 200 });
        } else {
          return NextResponse.json({
            success: false,
            message: "User didn't register card."
          }, { status: 404 });
        }
      } else {
        return NextResponse.json({
          success: false,
          message: "Invalid user"
        }, { status: 404 });
      }
    }
    if (holderRole === "store") {
      const existingStore = await Store.findById(holderId);
      if (existingStore) {
        const creditCard = existingStore.creditCard;
        if (creditCard) {
          return NextResponse.json({
            success: true,
            data: {
              creditCard: creditCard,
            },
            message: ""
          }, { status: 200 });
        } else {
          return NextResponse.json({
            success: false,
            message: "Store didn't register card."
          }, { status: 404 });
        }
      } else {
        return NextResponse.json({
          success: false,
          message: "Invalid store"
        }, { status: 404 });
      }
    }

  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  await dbConnect();

  const body = await req.json();
  const {
    holderId,
    holderRole,
  } = body;

  try {
    if (holderRole === "user") {
      const existingUser = await User.findById(holderId);
      if (existingUser) {
        const creditCard = await User.findByIdAndUpdate(holderId, { creditCard: '' });
        if (creditCard) {
          return NextResponse.json({
            success: true,
            message: ""
          }, { status: 200 });
        } else {
          return NextResponse.json({
            success: false,
            message: "User didn't register card."
          }, { status: 404 });
        }
      } else {
        return NextResponse.json({
          success: false,
          message: "Invalid user"
        }, { status: 404 });
      }
    }
    if (holderRole === "store") {
      const existingStore = await Store.findById(holderId);
      if (existingStore) {
        const creditCard = await Store.findByIdAndUpdate(holderId, { creditCard: '' });
        if (creditCard) {
          return NextResponse.json({
            success: true,
            message: ""
          }, { status: 200 });
        } else {
          return NextResponse.json({
            success: false,
            data: creditCard,
            message: "User didn't register card."
          }, { status: 404 });
        }
      } else {
        return NextResponse.json({
          success: false,
          message: "Invalid store"
        }, { status: 404 });
      }
    }

  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}