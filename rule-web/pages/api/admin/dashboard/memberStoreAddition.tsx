import type { NextApiRequest, NextApiResponse } from 'next'
 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Process a POST request
    const storeName = req.body.storeName;
    const storeGenre = req.body.storeGenre;
    const foodGenre = req.body.foodGenre;
    const cuisine = req.body.cuisine;
    const address = req.body.address;
    const access1 = req.body.access1;
    const access2 = req.body.access2;
    const description = req.body.description;
    if (storeName !== '' && storeGenre !== '' && foodGenre !== '' && cuisine !== '') {
      res.status(200).json({ message: "Add memberStore success" });
    } else {
      res.status(400).json({ message: "Add memberStore failed" });
    }
  } else {
    // Handle any other HTTP method
  }
}