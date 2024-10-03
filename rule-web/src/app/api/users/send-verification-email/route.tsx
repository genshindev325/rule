import { NextRequest, NextResponse } from 'next/server'

import nodemailer from 'nodemailer';
import crypto from 'crypto';
import dbConnect from '@/lib/mongoose';
import User from '@/models/userModel';
import { verificationCodes } from '../verificationCodes';

export async function POST(req: NextRequest) {
  await dbConnect();
  
  const body = await req.json();
  const { email } = body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json({ success: false, message: 'ユーザーが見つかりません。' }, { status: 400 });
    }

    const code = crypto.randomBytes(2).toString('hex');
    const expiresAt = Date.now() + 120000; // 2 minute
    verificationCodes[email] = { code, expiresAt };
    // Send email (this is a simplified example)
    const transporter = nodemailer.createTransport({
      service: 'smartdev.dentel.1025@outlook.com',
      secure: false,
      auth: {
        user: 'smartdev.dentel.1025@outlook.com',
        pass: 'Hpccloud21',
      },
    });

    const mailOptions = {
      from: 'smartdev.dentel.1025@outlook.com',
      to: email,
      subject: 'パスワードリセットの確認',
      text: `確認コードは次のとおりです: ${code}`,
    };

    try {
      console.log("AASD")
      const result = await transporter.sendMail(mailOptions);
      console.log(result);
      return NextResponse.json({ success: true, message: '確認メールが送信されました。' }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, message: 'サーバーエラーが発生しました。' }, { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'サーバーエラーが発生しました。' }, { status: 500 });
  }
}