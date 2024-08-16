import type { NextApiRequest, NextApiResponse } from 'next'
 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Process a POST request
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    res.status(200).json({ message: "Signup success" });
  } else {
    // Handle any other HTTP method
  }
}