// components/store/dashboard/ReplyModal.tsx

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { formatDateTime } from '@/app/utils/datetime';

interface ReviewModalProps {
  isOpen: boolean;
  review: RecentReview;
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

const ReplyModal: React.FC<ReviewModalProps> = ({ isOpen, review, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [replyText, setReplyText] = useState('');

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

  const onSendReply = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-gray-800">
      <div ref={modalRef} className="bg-white p-4 m-4 rounded shadow-md w-full max-w-lg">
      <h3 className="text-lg font-semibold mb-4">レビュー</h3>
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 bg-gray-300 rounded-full">
            <img src={review.createdBy.avatar} className='rounded-full w-10 h-10' />
          </div>
          <div className="ml-2">
            <div className="font-semibold text-sm">{review.createdBy.nickname}</div>
          </div>
        </div>
        <div className="flex items-center mb-2">
          <div className='w-1/5 flex flex-row'>
            {Array.from({ length: review.storeRating }).map((_, i) => (
              <FaStar key={i} className="text-yellow-500" />
            ))}
          </div>
          <div className="text-sm text-gray-500 ml-4">{formatDateTime(review.createdAt)}</div>
        </div>
        <p>{review.storeReviewText}</p>
        <div className='text-sm text-gray-500 my-4'>{review.conclusion}</div>
        <div className='py-4 flex flex-col space-y-2'>
          <div className='text-sm text-left font-bold'>本文</div>
          <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} className="w-full mt-3 p-3 bg-gray-100 rounded-md focus:outline-none text-xs sm:text-sm"
            placeholder="本文" rows={6} />
        </div>
        <div className='flex flex-row justify-end space-x-4 mt-4 text-md font-semibold'>
          <button type='button' onClick={onClose} className='bg-gray-200 p-2 rounded-md border-none hover:bg-gray-300 hover:font-bold duration-300'>
            キャンセル
          </button>
          <button type='button' onClick={onSendReply} className='bg-blue-500 p-2 text-white rounded-md border-none hover:bg-blue-600 hover:font-bold duration-300'>
            返信する
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyModal;
