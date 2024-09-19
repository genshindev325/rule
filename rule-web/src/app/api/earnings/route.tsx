import { NextRequest, NextResponse } from "next/server";

import dbConnect from "@/lib/mongoose";
import Earning from "@/models/earningModal";

export async function GET() {
  await dbConnect();
  try {
    const earnings = await Earning.find();
    return NextResponse.json({ success: true, data: earnings }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  try {
    const earning = await Earning.create(body);
    return NextResponse.json({ success: true, data: earning }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}