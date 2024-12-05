import { type NextRequest, NextResponse } from 'next/server'
import Notification from '@/models/notificationModel';
import dbConnect from '@/lib/mongoose';
import User from '@/models/userModel';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, message: 'No token provided' }, { status: 401 });
  }
  const users = await User.find({});
  return NextResponse.json({ success: true, data: users }, { status: 200 });
}

export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json();
  const { email, userID } = body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ success: false, message: 'ユーザーのメールアドレスは既に存在します。' }, { status: 400 });
    }

    const existingUserID = await User.findOne({ userID });
    if (existingUserID) {
      return NextResponse.json({ success: false, message: 'ユーザーIDはすでに存在します。' }, { status: 400 });
    }
    const user = await User.create(body);

    // Create a notification for the new registration
    await Notification.create({
      entityId: user._id,
      entityName: email,
      role: 'User',
      message: '新規ユーザーが登録されました。',
      show: 'admin',
      status: 'unread'
    });

    return NextResponse.json({
      success: true,
      data: {
        email: email,
        role: "user",
        profile: user,
        token: 'jwt',
      },
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
