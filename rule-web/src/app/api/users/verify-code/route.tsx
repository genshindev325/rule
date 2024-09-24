import { NextApiRequest, NextApiResponse } from 'next';
import { verificationCodes } from '../verificationCodes';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ message: 'Email and code are required' });
  }

  const savedCode = verificationCodes[email];

  if (!savedCode || savedCode.expiresAt < Date.now()) {
    return res.status(400).json({ message: 'Verification code expired' });
  }

  if (savedCode.code !== code) {
    return res.status(400).json({ message: 'Invalid verification code' });
  }

  // Verification successful
  res.status(200).json({ message: 'Code verified successfully' });
}
