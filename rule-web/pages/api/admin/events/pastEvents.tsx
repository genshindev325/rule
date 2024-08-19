import type { NextApiRequest, NextApiResponse } from 'next';
 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Process a GET request
    const pastEvents = [
      {
        eventName: 'Town dating, drinking party events',
        date: 'September 20, 2023 17:00',
        maleTotal: 20,
        males: 15,
        femaleTotal: 20,
        females: 12,
        earnings: '12356'
      },
      {
        eventName: 'Town dating, matchmaking, drinking party events',
        date: 'September 20, 2023 17:00',
        maleTotal: 6,
        males: 3,
        femaleTotal: 6,
        females: 3,
        earnings: '12356'
      },
      {
        eventName: 'matchmaking, drinking party events',
        date: 'September 20, 2023 17:00',
        maleTotal: 12,
        males: 4,
        femaleTotal: 12,
        females: 8,
        earnings: '12356'
      },
      // Add more events as needed
    ];
    
    res.status(200).json({ pastEvents: pastEvents });
  } else {
    // Handle any other HTTP method
  }
}