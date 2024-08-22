import type { NextApiRequest, NextApiResponse } from 'next'
 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Process a GET request
    const totalSales = 12323;
    const events = [
      {
        name: 'drinking party event',
        date: 'September 16, 2023 17:00',
        earnings: '12356'
      },
      {
        name: "Married people's Party",
        date: 'September 12, 2023 16:00',
        earnings: '23589'
      },
      {
        name: 'drinking party event',
        date: 'August 20, 2023 17:00',
        earnings: '8535'
      },
      {
        name: '[20s only]Love party Solo and first-time participants are also welcome',
        date: 'August 15, 2023 18:00',
        earnings: '9389'
      },
      // Add more events as needed
    ];
    
    res.status(200).json({ totalSales:totalSales, events: events });
  } else {
    // Handle any other HTTP method
  }
}