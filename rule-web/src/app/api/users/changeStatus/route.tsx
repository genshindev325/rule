import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/userModel';

export async function POST(req: NextRequest) {
  await dbConnect();
  const { email, status } = await req.json();

  try {
    const user = await User.findOne({ email });
    if (user) {
      const updatedUser = await User.findOneAndUpdate(
        { email: email },
        { status: status },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, message: 'User updated' }, { status: 200 });
    } else {
      return NextResponse.json({
        message: "User not found",
        success: false,
      }, { status: 401 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
