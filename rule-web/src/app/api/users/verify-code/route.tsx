import { NextRequest, NextResponse } from 'next/server';
import { verificationCodes } from '../verificationCodes';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, code } = body;

  if (!email || !code) {
    return NextResponse.json({success: false, message: 'Email and code are required'}, {status: 400});
  }

  const savedCode = verificationCodes[email];
  if (!savedCode || savedCode.expiresAt < Date.now()) {
    return NextResponse.json({success: false, message: 'Verification code expired', savedCode: savedCode, code: code}, {status: 400});
  }

  if (savedCode.code !== code) {
    return NextResponse.json({success: false, message: 'Invalid verification code'}, {status: 400});
  }

  // Verification successful
  return NextResponse.json({success: true, message: 'Code verified successfully'}, {status: 200});
}
