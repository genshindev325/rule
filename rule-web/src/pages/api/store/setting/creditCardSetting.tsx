import type { NextApiRequest, NextApiResponse } from 'next'
 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Process a POST request
    const cardNumber = req.body.cardNumber;
    const cardHolderNumber = req.body.cardHolderNumber;
    const dateOfExpiry = req.body.dateOfExpiry;
    const securityCode = req.body.securityCode;
    if (cardNumber !== '' && cardHolderNumber !== '' && dateOfExpiry !== '' && securityCode !== '') {
      res.status(200).json({ message: "Login success" });
    } else {
      res.status(400).json({ message: "Login failed" });
    }
  } else {
    // Handle any other HTTP method
  }
}