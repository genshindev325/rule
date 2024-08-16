// components/store/dashboard/ReviewModal.tsx

'use client';

import React, { useEffect, useRef } from 'react';
import { FaStar } from 'react-icons/fa';

interface ReviewModalProps {
  isOpen: boolean;
  reviews: RecentReview[];
  onClose: () => void;
}

interface RecentReview {
  user: string,
  date: string,
  content: string,
  conclusion: string,
  rating: number,
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, reviews, onClose }) => {
  const [review, setReview] = React.useState('');
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
              <div className="text-md text-gray-400 mt-4 mb-10 cursor-pointer">返事する</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReviewModal;
