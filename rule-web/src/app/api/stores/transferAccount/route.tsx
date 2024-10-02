import { NextRequest, NextResponse } from 'next/server'

// will be checked.

import dbConnect from '@/lib/mongoose';
import Store from '@/models/storeModel';

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
      return NextResponse.json({ success: false, message: 'Store already exists' }, { status: 400 });
    }
    
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}