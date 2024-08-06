// components/dashboard/recentReviews.tsx

'use client';

import React from 'react';
import { FaStar } from 'react-icons/fa';

interface RecentReviewsProps {
  onSeeMore: () => void;
}

const reviews = [
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

const RecentReviews: React.FC<RecentReviewsProps> = ({ onSeeMore }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h3 className="text-lg font-semibold mb-4">最近のレビュー</h3>
      <ul>
        {reviews.map((review, index) => (
          <li key={index} className="mb-4">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div className="ml-2">
                <div className="font-semibold">{review.user}</div>
              </div>
            </div>
            <div className="flex items-center mb-2">
              {Array.from({ length: review.rating }).map((_, i) => (
                <FaStar key={i} className="text-yellow-500" />
              ))}
              <div className="text-sm text-gray-500 ml-4">{review.date}</div>
            </div>
            <p>{review.content}</p>
            <div className='text-sm text-gray-500 mt-4'>{review.conclusion}</div>
            <div className="text-md text-gray-400 mt-4 mb-10 cursor-pointer">返事</div>
          </li>
        ))}
        <div className='text-center mt-8 mb-2'>
          <button id="seeMore" className='p-2 border-none rounded-lg bg-white hover:bg-gray-300' onClick={onSeeMore}>
            続きを見る
          </button>
        </div>
      </ul>
    </div>
  );
};

export default RecentReviews;
