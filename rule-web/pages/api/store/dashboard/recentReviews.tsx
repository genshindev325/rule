import type { NextApiRequest, NextApiResponse } from 'next'
 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Process a GET request
    const recentReviews = [
      {
        user: '橋本バナナ',
        date: '昨日',
        content: 'とても楽しかったです！機会があればまた参加したいです。',
        conclusion: '食事も美味しかったです。',
        rating: 5
      },
      {
        user: '橋本バナナ',
        date: '昨日',
        content: 'とても楽しかったです！機会があればまた参加したいです。',
        conclusion: '食事も美味しかったです。',
        rating: 4
      },
      {
        user: '橋本バナナ',
        date: '昨日',
        content: 'とても楽しかったです！機会があればまた参加したいです。',
        conclusion: '食事も美味しかったです。',
        rating: 5
      },
      // Add more reviews as needed
    ];
    
    res.status(200).json({ recentReviews: recentReviews });
  } else {
    // Handle any other HTTP method
  }
}