import { NextRequest, NextResponse } from 'next/server'

import nodemailer from 'nodemailer';
import dbConnect from '@/lib/mongoose';
import User from '@/models/userModel';

export async function POST(req: NextRequest) {
  await dbConnect();
  
  const body = await req.json();
  const { email } = body;

  try {
    const existingUser = await User.findOne({ email });
    console.log("11")
    if (!existingUser) {
        return NextResponse.json({ success: false, message: 'ユーザーが見つかりません。' }, { status: 400 });
    }
    console.log("000")

    // Send email (this is a simplified example)
    const transporter = nodemailer.createTransport({
      service: 'dentel.practice.3@outlook.com', // e.g., 'gmail'
      auth: {
        user: 'dentel.practice.3@outlook.com',
        pass: 'Hpccloud21',
      },
    });
    console.log("1111")

    const resetUrl = `http://localhost:3001/auth/passwordReset`;

    const mailOptions = {
      from: 'dentel.practice.3@outlook.com',
      to: email,
      subject: 'パスワードリセットの確認',
      text: `パスワードリセットのために以下のリンクをクリックしてください: ${resetUrl}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("2222")

    return NextResponse.json({ success: true, message: '確認メールが送信されました。' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'サーバーエラーが発生しました。' }, { status: 500 });
  }
}