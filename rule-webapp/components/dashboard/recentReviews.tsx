'use client';

import React from 'react';
import { FaStar } from 'react-icons/fa';

const reviews = [
  {
    user: 'Hashimoto Banana',
    date: '昨日',
    content: 'It was a lot of fun! I\'d love to participate again if I have the opportunity. The food was also delicious.',
    rating: 5
  },
  {
    user: 'Hashimoto Banana',
    date: '昨日',
    content: 'It was a lot of fun! I\'d love to participate again if I have the opportunity. The food was also delicious.',
    rating: 4
  },
  // Add more reviews as needed
];

const RecentReviews = () => {
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
                <div className="text-sm text-gray-500">{review.date}</div>
              </div>
            </div>
            <div className="flex items-center mb-2">
              {Array.from({ length: review.rating }).map((_, i) => (
                <FaStar key={i} className="text-yellow-500" />
              ))}
            </div>
            <p>{review.content}</p>
            <div className="text-md text-gray-400 mt-10 cursor-pointer">reply</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentReviews;
