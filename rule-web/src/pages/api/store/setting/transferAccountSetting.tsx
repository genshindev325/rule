import type { NextApiRequest, NextApiResponse } from 'next'
 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Process a POST request
    const bankName = req.body.bankName;
    const branchName = req.body.branchName;
    const accountNumber = req.body.accountNumber;
    const accountHolder = req.body.accountHolder;
    if (bankName !== '' && branchName !== '' && accountNumber !== '' && accountHolder !== '') {
      res.status(200).json({ message: "Transfer account setting success" });
    } else {
      res.status(400).json({ message: "Transfer account setting failed" });
    }
  } else {
    // Handle any other HTTP method
  }
}