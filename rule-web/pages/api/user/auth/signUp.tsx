import type { NextApiRequest, NextApiResponse } from 'next'
 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Process a POST request
    const userID = req.body.userID;
    const gender = req.body.gender;
    const email = req.body.email;
    const name = req.body.name;
    const birthday = req.body.birthday; // 2000-12-12
    const image = req.body.image;
    const password = req.body.password;
    res.status(200).json({ message: "Signup success" });
  } else {
    // Handle any other HTTP method
  }
}