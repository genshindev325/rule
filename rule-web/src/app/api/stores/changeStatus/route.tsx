import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Store from '@/models/storeModel';

export async function POST(req: NextRequest) {
  await dbConnect();
  const { email, status } = await req.json();

  try {
    const store = await Store.findOne({ email });
    if (store) {
      const updatedStore = await Store.findOneAndUpdate(
        { email: email },
        { status: status },
        { new: true, runValidators: true }
      );

      if (!updatedStore) {
        return NextResponse.json({ success: false, message: 'Store not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, message: 'Store updated' }, { status: 200 });
    } else {
      return NextResponse.json({
        message: "Store not found",
        success: false,
      }, { status: 401 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
