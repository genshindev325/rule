import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Store from '@/models/storeModel';

export async function POST(req: NextRequest) {
  await dbConnect();

  const { email, newPassword } = await req.json();

  try {
    // Find store by email
    const store = await Store.findOne({ email });

    // Check if the store exists and if the provided password matches the stored password
    if (store) {
      // Update the store with the new password
      const updatedStore = await Store.findOneAndUpdate(
        { email: email },
        { password: newPassword },
        { new: true, runValidators: true }
      );

      if (!updatedStore) {
        return NextResponse.json({ success: false, message: 'Store not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, message: 'Store updated' }, { status: 200 });
    }

    // If password does not match
    return NextResponse.json({
      message: "Store email does not match.",
      success: false,
    }, { status: 401 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
