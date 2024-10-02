import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Notification from "@/models/notificationModel";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, message: 'No token provided' }, { status: 401 });
  }

  await dbConnect();
  try {
    // Fetch notifications only for 'admin' and include both 'unread' and 'read' statuses
    const notifications = await Notification.find({ show: 'admin', status: 'unread' }).exec();
    return NextResponse.json({ success: true, data: notifications }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, message: 'No token provided' }, { status: 401 });
  }

  await dbConnect();

  try {
    const { notificationIds } = await req.json(); // List of notification IDs to mark as read

    // Update the status of the specified notifications to 'read'
    await Notification.updateMany(
      { _id: { $in: notificationIds }, show: 'admin', status: 'unread' }, // Match unread notifications for admin
      { $set: { status: 'read' } }
    );

    return NextResponse.json({ success: true, message: 'Notifications marked as read' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}