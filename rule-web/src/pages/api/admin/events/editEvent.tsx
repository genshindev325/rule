import type { NextApiRequest, NextApiResponse } from 'next';
 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Process a POST request
    // const eventID = req.body.selectedRowId;
    
    res.status(200).json({ message: 'Edit event success.' });
  } else {
    // Handle any other HTTP method
  }
}