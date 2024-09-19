import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Earning from "@/models/earningModal";

export async function GET({ params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const earning = await Earning.findById(params.id);
    if (!earning) {
      return NextResponse.json({ success: false, message: 'Earning not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: earning }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const { title, content } = await req.json();

  try {
    const earning = await Earning.findByIdAndUpdate(params.id, { title, content }, { new: true, runValidators: true });
    if (!earning) {
      return NextResponse.json({ success: false, message: 'Earning not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: earning }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

export async function DELETE({ params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const earning = await Earning.findByIdAndDelete(params.id);
    if (!earning) {
      return NextResponse.json({ success: false, message: 'Earning not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}