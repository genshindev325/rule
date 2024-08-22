import { type NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import User from '@/models/userModel';

export async function GET(request: NextRequest) {
  // const users = [
  //   { userID: '1111-2222-3333-44441', userName: 'Taro Yamamoto', createdAt: 'September 20, 2023 17:00' },
  //   { userID: '1111-2222-3333-44442', userName: 'Taro Sato', createdAt: 'October 12, 2023 16:00' },
  //   { userID: '1111-2222-3333-44443', userName: 'Taro Iwasaki', createdAt: 'October 20, 2023 17:00' },
  //   { userID: '1111-2222-3333-44444', userName: 'Taro Omae', createdAt: 'December 15, 2023 18:00' },
  //   { userID: '1111-2222-3333-44445', userName: 'Hanako', createdAt: 'September 20, 2023 17:00' },
  //   { userID: '1111-2222-3333-44446', userName: 'Hanako', createdAt: 'October 12, 2023 16:00' },
  //   { userID: '1111-2222-3333-44447', userName: 'Hanako', createdAt: 'October 20, 2023 17:00' },
  //   { userID: '1111-2222-3333-44448', userName: 'Taro Omae', createdAt: 'December 15, 2023 18:00' },
  //   { userID: '1111-2222-3333-44449', userName: 'Taro Yamamoto', createdAt: 'September 20, 2023 17:00' },
  //   { userID: '1111-2222-3333-44451', userName: 'Taro Sato', createdAt: 'October 12, 2023 16:00' },
  //   { userID: '1111-2222-3333-44452', userName: 'Taro Iwasaki', createdAt: 'October 20, 2023 17:00' },
  //   { userID: '1111-2222-3333-44453', userName: 'Taro Omae', createdAt: 'December 15, 2023 18:00' },
  //   { userID: '1111-2222-3333-44454', userName: 'Taro Yamamoto', createdAt: 'September 20, 2023 17:00' },
  //   { userID: '1111-2222-3333-44455', userName: 'Taro Sato', createdAt: 'October 12, 2023 16:00' },
  //   { userID: '1111-2222-3333-44456', userName: 'Taro Iwasaki', createdAt: 'October 20, 2023 17:00' },
  //   { userID: '1111-2222-3333-44457', userName: 'Taro Omae', createdAt: 'December 15, 2023 18:00' },
  //   { userID: '1111-2222-3333-44458', userName: 'Taro Yamamoto', createdAt: 'September 20, 2023 17:00' },
  //   { userID: '1111-2222-3333-44459', userName: 'Taro Sato', createdAt: 'October 12, 2023 16:00' },
  //   { userID: '1111-2222-3333-44461', userName: 'Taro Iwasaki', createdAt: 'October 20, 2023 17:00' },
  //   { userID: '1111-2222-3333-44462', userName: 'Taro Omae', createdAt: 'December 15, 2023 18:00' },
  //   { userID: '1111-2222-3333-44463', userName: 'Taro Yamamoto', createdAt: 'September 20, 2023 17:00' },
  //   { userID: '1111-2222-3333-44464', userName: 'Taro Sato', createdAt: 'October 12, 2023 16:00' },
  //   { userID: '1111-2222-3333-44465', userName: 'Taro Iwasaki', createdAt: 'October 20, 2023 17:00' },
  //   { userID: '1111-2222-3333-44466', userName: 'Taro Omae', createdAt: 'December 15, 2023 18:00' },
  // ];
  const users = await User.find({});
  return NextResponse.json({ success: true, data: users }, { status: 200 });
}

export async function POST(req: NextRequest) {
  await dbConnect();
  
  const body = await req.json();
  const { email, password } = body;

  try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return NextResponse.json({ success: false, message: 'User already exists' }, { status: 400 });
      }
      const user = await User.create(body);
      return NextResponse.json({ success: true, data: user, jwt: 'jwt' }, { status: 201 });
  } catch (error) {
      return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
