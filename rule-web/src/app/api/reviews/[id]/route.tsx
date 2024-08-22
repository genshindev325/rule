import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Review from '@/models/eventModel';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const review = await Review.findById(params.id);
    if (!review) {
      return NextResponse.json({ success: false, message: 'Review not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: review }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const { title, content } = await req.json();

  try {
    const review = await Review.findByIdAndUpdate(params.id, { title, content }, { new: true, runValidators: true });
    if (!review) {
      return NextResponse.json({ success: false, message: 'Review not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: review }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const review = await Review.findByIdAndDelete(params.id);
    if (!review) {
      return NextResponse.json({ success: false, message: 'Review not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}
