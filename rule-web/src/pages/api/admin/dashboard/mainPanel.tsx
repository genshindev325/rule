import type { NextApiRequest, NextApiResponse } from 'next'
 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const lastMonthSales = 12345;
    const thisMonthSales = 234567;
    
    res.status(200).json({ lastMonthSales: lastMonthSales, thisMonthSales: thisMonthSales });
  } else {
    // Handle any other HTTP method
  }
}