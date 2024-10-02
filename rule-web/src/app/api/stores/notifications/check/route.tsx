import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Notification from "@/models/notificationModel";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, message: 'No token provided' }, { status: 401 });
  }

  await dbConnect();
  try {
    const { storeId } = await req.json();
    // Fetch notifications only for 'admin' and include both 'unread' and 'read' statuses
    const notifications = await Notification.find({ show: storeId, status: 'unread' }).exec();
    return NextResponse.json({ success: true, data: notifications }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}