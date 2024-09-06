// components/store/dashboard/recentReviews.tsx

'use client';

import React from 'react';
import { FaStar } from 'react-icons/fa';
import { formatDateTime } from '@/utils/datetime';

interface RecentReview {
  createdAt: string,
  createdBy: {
    email: string;
    nickname: string;
    avatar: string;
  },
  storeReviewText: string,
  conclusion: string,
  storeRating: number,
}

interface RecentReviewsProps {
  onSeeMore: () => void;
  onSelectReview: (review: RecentReview) => void;
  reviews: RecentReview[]
}

const RecentReviews: React.FC<RecentReviewsProps> = ({ onSeeMore, reviews, onSelectReview }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md min-w-80">
      <h3 className="text-lg font-semibold mb-4">最近のレビュー</h3>
      <ul>
        {reviews ? reviews.map((review, index) => (
          <li key={index} className="mb-4">
            <div className="flex items-center mb-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full">
                  <img src={review.createdBy.avatar} className='rounded-full w-10 h-10' />
                </div>
              <div className="ml-2">
                <div className="font-semibold">{review.createdBy.nickname}</div>
              </div>
            </div>
            <div className="flex items-center mb-2">
              <div className='w-1/4 flex flex-row'>
                {Array.from({ length: review.storeRating }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
              </div>
              <div className="text-sm text-gray-500 ml-4">{formatDateTime(review.createdAt)}</div>
            </div>
            <p>{review.storeReviewText}</p>
            <div className='text-sm text-gray-500 mt-4'>{review.conclusion}</div>
            <div className="text-md text-gray-400 mt-4 mb-10 cursor-pointer">
              <span onClick={() => onSelectReview(review)}>
                返事する
              </span>
            </div>
          </li>
        )) : <p className='text-center py-10'>まだレビューはありません。</p>}
        <div className='text-center mt-8 mb-2'>
          {reviews &&
          <button id="seeMore" className='p-2 border-none rounded-lg bg-white hover:bg-gray-300' onClick={onSeeMore}>
            もっと見る
          </button>}
        </div>
      </ul>
    </div>
  );
};

export default RecentReviews;
