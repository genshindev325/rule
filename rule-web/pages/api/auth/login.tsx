import type { NextApiRequest, NextApiResponse } from 'next'
 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Process a POST request
    const email = req.body.email;
    const password = req.body.password;
    if (email == "smartdev850@outlook.com" && password == "123123") {
      res.status(200).json({ message: "Login success" });
    } else {
      res.status(400).json({ message: "Login failed" });
    }
  } else {
    // Handle any other HTTP method
  }
}