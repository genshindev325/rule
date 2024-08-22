import type { NextApiRequest, NextApiResponse } from 'next'
 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Process a GET request
    const lastMonthSales = 333234;
    const thisMonthSales = 23456;
    const scheduledEvents = 3;
    const unreachedCases =1;
    const reviews = 12;
    const reviewResponseRate = 80;
    
    res.status(200).json({
      lastMonthSales: lastMonthSales,
      thisMonthSales: thisMonthSales,
      scheduledEvents: scheduledEvents,
      unreachedCases: unreachedCases,
      reviews: reviews,
      reviewResponseRate: reviewResponseRate
    });
  } else {
    // Handle any other HTTP method
  }
}