import type { NextApiRequest, NextApiResponse } from 'next'
 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Process a POST request
    const eventName = req.body.eventName;
    const category = req.body.category;
    const description = req.body.description;
    const schedule = req.body.schedule;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const maleTotal = req.body.maleTotal;
    const femaleTotal = req.body.femaleTotal;
    const maleFee = req.body.maleFee;
    const femaleFee = req.body.femaleFee;
    if (eventName !== '' && category !== '' && description !== '' && schedule !== '') {
      res.status(200).json({ message: "Create event success" });
    } else {
      res.status(400).json({ message: "Create event failed" });
    }
  } else {
    // Handle any other HTTP method
  }
}