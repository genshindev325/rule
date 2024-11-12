// components/store/dashboard/recentReviews.tsx

'use client';

import React from 'react';
import { FaStar } from 'react-icons/fa';
import { formatDateTime } from '@/app/utils/datetime';

interface RecentReview {
  _id: string,
  createdAt: string,
  createdBy: {
    email: string;
    nickname: string;
    avatar: string;
  },
  storeReviewText: string,
  conclusion: string,
  storeRating: number,
  eventName: string,
}

interface RecentReviewsProps {
  onSeeMore: () => void;
  onSelectReview: (review: RecentReview) => void;
  reviews: RecentReview[]
}

const RecentReviews: React.FC<RecentReviewsProps> = ({ onSeeMore, reviews, onSelectReview }) => {
  const displayedReviews = reviews.slice(0, 3);
  
  return (
    <div className="bg-transparent min-w-80 text-gray-800">
      <ul>
        {displayedReviews.length > 0 ? displayedReviews.map((review, index) => (
          <li key={index} className="bg-white p-2 sm:p-4 rounded-md mb-4">
            <div className="flex items-center mb-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full">
                  <img src={review.createdBy.avatar} className='rounded-full w-10 h-10' />
                </div>
              <div className="ml-2">
                <div className="text-font-semibold">{review.createdBy.nickname}</div>
              </div>
            </div>
            <div className="flex items-center mb-2">
              <div className='w-1/4 flex flex-row'>
                {Array.from({ length: review.storeRating }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
              </div>
              <div className="text-sm text-gray-800 ml-4">{formatDateTime(review.createdAt)}</div>
              {review.eventName && <h2 className='text-sm text-gray-800 underline underline-offset-2'>イベント名: {review.eventName}</h2>}
            </div>
            <div className='text-sm text-gray-800 mt-4'>{review.storeReviewText}</div>
            {review.conclusion && <div className='text-sm text-gray-500 mt-4'>{review.conclusion}</div>}
            <div className="text-sm text-gray-800 mt-4 cursor-pointer">
              <span onClick={() => onSelectReview(review)} className='underline underline-offset-2'>
                返事する
              </span>
            </div>
          </li>
        )) : <p className='text-center text-xs py-10'>まだレビューはありません。</p>}
        <div className='text-center mb-2'>
          {reviews.length > 3 &&
          <span className='underline underline-offset-2 text-sm text-gray-800' onClick={onSeeMore}>
            もっと見る
          </span>}
        </div>
      </ul>
    </div>
  );
};

export default RecentReviews;
