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
    const image = req.body.image;
    const description = req.body.description;
    if (storeName !== "") {
      res.status(200).json({ message: "Success" });
    } else {
      res.status(400).json({ message: "Failed" });
    }
  } else {
    // Handle any other HTTP method
  }
}