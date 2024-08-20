import type { NextApiRequest, NextApiResponse } from 'next';
 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Process a POST request    
    
    res.status(200).json({ message: 'Delete event success.' });
  } else {
    // Handle any other HTTP method
  }
}