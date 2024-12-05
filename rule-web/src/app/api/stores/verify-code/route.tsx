import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import VerificationCode from '@/models/verificationCodeModel';

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  const { email, code } = body;

  if (!email || !code) {
    return NextResponse.json({success: false, message: 'メールアドレスとコードが必要です'}, {status: 400});
  }

  try {
    // Find the code in MongoDB
    const verificationRecord = await VerificationCode.findOne({ email });
    if (!verificationRecord) {
      return NextResponse.json({ success: false, message: 'コードが見つかりません' }, { status: 400 });
    }

    // Check expiration
    if (verificationRecord.expiresAt < new Date()) {
      return NextResponse.json({ success: false, message: '認証コードの有効期限が切れています' }, { status: 400 });
    }

    // Validate the code
    if (verificationRecord.code !== code) {
      return NextResponse.json({ success: false, message: '認証コードが無効です' }, { status: 400 });
    }

    // Code is valid
    return NextResponse.json({ success: true, message: 'コードは正常に検証されました' }, { status: 200 });
  } catch(error) {
    console.error('Redis Error:', error);
    return NextResponse.json(
      { success: false, message: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
