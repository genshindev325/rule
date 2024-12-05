import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import dbConnect from '@/lib/mongoose';
import Store from '@/models/storeModel';
import VerificationCode from '@/models/verificationCodeModel';

export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json();
  const { email } = body;

  try {
    const user = await Store.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, message: 'ユーザーが見つかりません。' }, { status: 400 });
    }

    const code = crypto.randomBytes(2).toString('hex');
    const expiresAt = Date.now() + 120000; // 2 minutes

    await VerificationCode.findOneAndUpdate(
      { email },
      { email, code, expiresAt },
      { upsert: true, new: true }
    );

    // Create transporter with SMTP settings
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // SMTP server
      port: 465, // Secure port
      secure: true, // Use SSL
      auth: {
        user: 'victorykres@gmail.com', // Your email
        pass: 'ovty mwfp otsl nqin', // App password from Gmail
      },
    });

    const mailOptions = {
      from: 'victorykres@gmail.com', // Sender address
      to: email, // Recipient address
      subject: 'パスワードリセットの確認', // Email subject
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
          <h2 style="color: #ff5722;">Rule-izakaya アプリ パスワードリセット</h2>
          <p>誰かがあなたのアカウントのパスワード リセット確認コードを取得しようとしていることを検出しました。</p>
          <p>このリクエストに心当たりがある場合は、以下の確認コードを入力して確認してください:</p>
          <div style="text-align: center; margin: 20px 0;">
            <span style="font-size: 24px; font-weight: bold; color: #04091a; background-color: #f2f7ff; padding: 10px 30px; text-align: center;">
              ${code}
            </span>
          </div>
          <p>確認コードは <strong style="color: #ff5722;">2 分間有効</strong> で、適用すると無効になります。</p>
          <p>リクエストに覚えがない場合は、このメールを無視してください。</p>
          <hr style="border: 1px solid #ddd; margin: 20px 0;">
          <div style="text-align: center;">
            <img src="https://res.cloudinary.com/dlfsowde1/image/upload/v1733401356/hh0qzcizlbmkbsbjsvd4.png" alt="App Logo" style="width: 150px; height: auto; margin: 20px 0;">
          </div>
          <p style="font-size: 12px; color: #888;">このメールは自動送信されています。返信しないでください。</p>
        </div>
      `,
    };
    

    try {
      await transporter.sendMail(mailOptions);
      console.log('Verification code sent:', code);

      return NextResponse.json({ success: true, message: '確認メールが送信されました。' }, { status: 200 });
    } catch (error) {
      console.error('Error sending email:', error);
      return NextResponse.json({ success: false, message: 'メール送信中にエラーが発生しました。' }, { status: 500 });
    }
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ success: false, message: 'サーバーエラーが発生しました。' }, { status: 500 });
  }
}
