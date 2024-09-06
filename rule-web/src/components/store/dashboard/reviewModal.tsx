// components/store/dashboard/ReviewModal.tsx

'use client';

import React, { useEffect, useRef } from 'react';
import { FaStar } from 'react-icons/fa';
import { formatDateTime } from '@/utils/datetime';

interface ReviewModalProps {
  isOpen: boolean;
  reviews: RecentReview[];
  onClose: () => void;
}

interface RecentReview {
  createdAt: string,
  createdBy: {
    email: string;
    nickname: string;
    avatar: string
  },
  storeReviewText: string,
  conclusion: string,
  storeRating: number,
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, reviews, onClose }) => {
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={modalRef} className="bg-white p-4 rounded shadow-md w-full max-w-lg">
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
              <p>{review.storeReviewText}</p>
              <div className='text-sm text-gray-500 mt-4'>{review.conclusion}</div>
              <div className="text-md text-gray-400 mt-4 mb-10 cursor-pointer">返事する</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReviewModal;
