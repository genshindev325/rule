import type { NextApiRequest, NextApiResponse } from 'next'
 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Process a POST request
    const userEmail = req.body.email;
    const userName = 'userName';
    const password = req.body.password;
    const token = 'user_token';
    if (userEmail == "smartdev850@outlook.com" && password == "123123") {
      // store role
      res.status(200).json({
        message: "Login success",
        userEmail: userEmail,
        userName: userName,
        userRole: 'store',
        token: token
      });
    } else if (userEmail == "admin@cloud.com" && password == "123123") {
      // admin role
      res.status(200).json({
        message: "Login success",
        userEmail: userEmail,
        userName: userName,
        userRole: 'admin',
        token: token
      });
    } else {
      res.status(400).json({ message: "Login failed" });
    }
  } else {
    // Handle any other HTTP method
  }
}