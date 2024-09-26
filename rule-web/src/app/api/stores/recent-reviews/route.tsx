import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import Store from '@/models/storeModel';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, message: 'No token provided' }, { status: 401 });
  }
  //await dbConnect();
  try {
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

    return NextResponse.json({
      recentReviews: recentReviews
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}