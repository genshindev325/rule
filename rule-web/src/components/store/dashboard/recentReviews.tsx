// components/store/dashboard/recentReviews.tsx

'use client';

import React from 'react';
import { FaStar } from 'react-icons/fa';
import { formatDateTime } from '@/utils/datetime';

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
    <div className="p-4 bg-white shadow-md rounded-md min-w-80 text-gray-800">
      <h3 className="text-lg font-semibold mb-4">最近のレビュー</h3>
      <ul>
        {displayedReviews.length > 0 ? displayedReviews.map((review, index) => (
          <li key={index} className="mb-4">
            <div className="flex items-center mb-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full">
                  <img src={review.createdBy.avatar} className='rounded-full w-10 h-10' />
                </div>
              <div className="ml-2">
                <div className="font-semibold text-sm sm:text-base">{review.createdBy.nickname}</div>
              </div>
            </div>
            <div className="flex items-center mb-2">
              <div className='w-1/4 flex flex-row'>
                {Array.from({ length: review.storeRating }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
              </div>
              <div className="text-sm text-gray-950 ml-4">{formatDateTime(review.createdAt)}</div>
            </div>
            {review.eventName && <h2 className='text-sm text-gray-800 underline underline-offset-2'>イベント名: {review.eventName}</h2>}
            <p className='font-semibold text-sm sm:text-base'>{review.storeReviewText}</p>
            <div className='text-sm mt-4'>{review.conclusion}</div>
            <div className="text-base text-gray-800 mt-4 mb-10">
              <span onClick={() => onSelectReview(review)} className='cursor-pointer p-2 border-none rounded-lg bg-gray-100 hover:bg-gray-300 duration-300'>
                返事する
              </span>
            </div>
          </li>
        )) : <p className='text-center py-10'>まだレビューはありません。</p>}
        <div className='text-center mt-8 mb-2'>
          {reviews.length > 3 &&
          <button id="seeMore" className='underline underline-offset-2 font-semibold p-2 border-none rounded-lg bg-white hover:bg-gray-300 duration-300' onClick={onSeeMore}>
            もっと見る
          </button>}
        </div>
      </ul>
    </div>
  );
};

export default RecentReviews;
