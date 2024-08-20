import type { NextApiRequest, NextApiResponse } from 'next';
 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Process a POST request
    const userID = req.body.selectedRowId;
    
    res.status(200).json({ message: 'Edit user success.' });
  } else {
    // Handle any other HTTP method
  }
}