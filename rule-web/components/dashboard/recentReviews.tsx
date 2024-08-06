// components/dashboard/recentReviews.tsx

'use client';

import React from 'react';
import { FaStar } from 'react-icons/fa';

interface RecentReviewsProps {
  onSeeMore: () => void;
}

const reviews = [
  {
    user: 'Hashimoto Banana',
    date: '昨日',
    content: 'It was a lot of fun! I\'d love to participate again if I have the opportunity.',
    conclusion: 'The food was also delicious.',
    rating: 5
  },
  {
    user: 'Hashimoto Banana',
    date: '昨日',
    content: 'It was a lot of fun! I\'d love to participate again if I have the opportunity.',
    conclusion: 'The food was also delicious.',
    rating: 4
  },
  {
    user: 'Hashimoto Banana',
    date: '昨日',
    content: 'It was a lot of fun! I\'d love to participate again if I have the opportunity.',
    conclusion: 'The food was also delicious.',
    rating: 5
  },
  // Add more reviews as needed
];

const RecentReviews: React.FC<RecentReviewsProps> = ({ onSeeMore }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h3 className="text-lg font-semibold mb-4">Recent Reviews</h3>
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
            <div className="text-md text-gray-400 mt-4 mb-10 cursor-pointer">reply</div>
          </li>
        ))}
        <div className='text-center mt-8 mb-2'>
          <button id="seeMore" className='p-2 border-none rounded-lg bg-white hover:bg-gray-300' onClick={onSeeMore}>
            See more
          </button>
        </div>
      </ul>
    </div>
  );
};

export default RecentReviews;
