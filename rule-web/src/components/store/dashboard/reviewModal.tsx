// components/store/dashboard/ReviewModal.tsx

'use client';

import React, { useEffect, useRef } from 'react';
import { FaStar } from 'react-icons/fa';
import { formatDateTime } from '@/utils/datetime';

interface ReviewModalProps {
  isOpen: boolean;
  reviews: RecentReview[];
  onClose: () => void;
  onSelectReview: (review: RecentReview) => void;
}

interface RecentReview {
  _id: string,
  createdAt: string,
  createdBy: {
    email: string;
    nickname: string;
    avatar: string
  },
  storeReviewText: string,
  conclusion: string,
  storeRating: number,
  eventName: string,
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, reviews, onClose, onSelectReview }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-gray-800">
      <div ref={modalRef} className="bg-white p-4 rounded shadow-md w-full max-w-lg max-h-[700px] overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">レビュー</h3>
        <ul>
          {reviews.map((review, index) => (
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
              {review.eventName && <h2 className='text-sm text-gray-800 underline underline-offset-2'>イベント名: {review.eventName}</h2>}
              <p>{review.storeReviewText}</p>
              <div className='text-sm text-gray-500 mt-4'>{review.conclusion}</div>
            <div className="text-base text-gray-400 mt-4 mb-10 cursor-pointer">
              <span onClick={() => onSelectReview(review)} className='underline underline-offset-2'>
                返事する
              </span>
            </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReviewModal;
