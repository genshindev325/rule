import type { NextApiRequest, NextApiResponse } from 'next'
 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Process a GET request
    const sales = 12345;
    const salesTotal = 16325;
    const salesData = [30, 40, 45, 50, 49, 60, 70];
    
    res.status(200).json({ sales: sales, salesTotal: salesTotal, salesData: salesData });
  } else {
    // Handle any other HTTP method
  }
}