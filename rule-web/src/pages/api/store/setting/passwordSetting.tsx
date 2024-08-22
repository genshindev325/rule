import type { NextApiRequest, NextApiResponse } from 'next'
 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Process a POST request
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;
    const newPasswordConfirm = req.body.newPasswordConfirm;
    if (currentPassword !== '' && newPassword === newPasswordConfirm) {
      res.status(200).json({ message: "Login success" });
    } else {
      res.status(400).json({ message: "Login failed" });
    }
  } else {
    // Handle any other HTTP method
  }
}