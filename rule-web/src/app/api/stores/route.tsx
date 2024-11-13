import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import Store from '@/models/storeModel';
import StorePayment from '@/models/storePaymentModel';
import Notification from '@/models/notificationModel';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, message: 'No token provided' }, { status: 401 });
  }
  await dbConnect();

  try {
    const stores = await Store.find({});
    return NextResponse.json({ success: true, data: stores }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json();
  const { email } = body;

  try {
    const existingStore = await Store.findOne({ email });
    if (existingStore) {
      return NextResponse.json({ success: false, message: 'ストアのメールは既に存在します。' }, { status: 400 });
    }

    if(email === 'admin@cloud.com') {
      return NextResponse.json({ success: false, message: '管理者アカウントを作成できません。別のユーザーのメール アドレスを使用してください。' }, { status: 400 });
    }

    const store = await Store.create(body);
    const createStorePayment = await StorePayment.create({
      store: store._id,
    });

    // Create a notification for the new registration
    await Notification.create({
      entityId: store._id,
      entityName: email,
      role: 'Store',
      message: '新しい店舗が登録されました。',
      show: 'admin',
      status: 'unread'
    });

    return NextResponse.json({
      success: true,
      data: {
        email: email,
        role: "store",
        profile: store,
        token: "jwt",
      },
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}