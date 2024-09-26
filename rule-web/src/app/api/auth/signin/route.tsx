import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongoose';
import User from '@/models/userModel';
import Store from '@/models/storeModel';

const JWT_SECRET = process.env.JWT_SECRET || '';

export async function POST(req: NextRequest) {
  await dbConnect();

  const { email, password } = await req.json();
  try {

    // Check if it is user
    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      const token = jwt.sign({
        email: user.email,
        role: 'user'
      }, JWT_SECRET, {expiresIn: '7d'});

      return NextResponse.json({
        message: "Sign in success",
        data: {
          email: user.email,
          role: 'user',
          profile: user,
          token: token,
        },
      }, { status: 200 });
    }

    // Check if it is store
    const store = await Store.findOne({ email });
    if (store && (await store.comparePassword(password))) {
      const token = jwt.sign({
        email: store.email,
        role: 'store'
      }, JWT_SECRET, {expiresIn: '7d'});
      
      return NextResponse.json({
        message: "Sign in success",
        data: {
          email: store.email,
          role: 'store',
          profile: store,
          token: token,
        },
      }, { status: 200 });
    }

    // Check if it is admin
    if (email == "admin@cloud.com" && password == "Password123!@#") {
      const token = jwt.sign({
        email: email,
        role: 'admin'
      }, JWT_SECRET);
      
      // admin role
      return NextResponse.json({
        message: "Sign in success",
        data: {
          email: email,
          role: 'admin',
          profile: {},
          token: token,
        },
      }, { status: 200 });
    }

    return NextResponse.json({
      message: "Invalid credentials",
      success: false,
    }, { status: 401 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}