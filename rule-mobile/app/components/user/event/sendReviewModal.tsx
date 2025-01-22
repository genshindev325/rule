// app/components/user/event/sendReviewModal.tsx

'use client'

import React, { useEffect, useRef } from 'react';
import StarRating from '@/app/components/utils/starRating';

interface ISendReviewModal {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSendReview: () => void;
  ratingStore: number;
  handleRateStoreChange: (newRate: number) => void;
  ratingEvent: number;
  handleRateEventChange: (newRate: number) => void;
  reviewStore: string;
  setReviewStore: (newReviewStore: string) => void;
}

const SendReviewModal: React.FC<ISendReviewModal> = ({
    isOpen,
    onClose,
    onConfirmSendReview,
    ratingStore,
    handleRateStoreChange,
    ratingEvent,
    handleRateEventChange,
    reviewStore,
    setReviewStore
  }) => {
  useEffect(() => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.setAttribute('inert', isOpen ? 'true' : 'false');
    }
    return () => {
      if (mainContent) mainContent.removeAttribute('inert');
    };
  }, [isOpen]);
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
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 z-50">
      <div ref={modalRef} className="relative flex flex-col items-center bg-white text-gray-800 p-8 rounded-2xl rounded-tr-none w-[75vw] min-h-[40vh] max-w-2xl mx-4 sm:mx-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-1 -right-1 w-6 h-6 flex items-center justify-center rounded-full bg-gray-400 hover:bg-red-400 text-white font-semibold transition duration-300"
          aria-label="Close"
        >
          ✕
        </button>
        <h1 className='text-[#71d0f8] text-lg font-bold mb-8'>レビュー</h1>
        <div className='flex flex-row w-full pb-2'>
          <h1 className='text-xs'>イベントの評価:</h1>
          <div className='ml-auto'>
            <StarRating rate={ratingEvent} onRateChange={handleRateEventChange} />
          </div>
        </div>
        <div className='flex flex-row w-full pb-2'>
          <h1 className='text-xs'>お店の評価:</h1>
          <div className='ml-auto'>
            <StarRating rate={ratingStore} onRateChange={handleRateStoreChange} />
          </div>
        </div>
        <textarea
          value={reviewStore}
          onChange={(e) => setReviewStore(e.target.value)}
          className="w-full my-6 p-2 bg-white rounded-md focus:outline-none border border-gray-800 text-xs placeholder:text-xs"
          placeholder="お店のレビューを書く"
          rows={6}
        />
        <button
          onClick={() => onConfirmSendReview()}
          className='w-full p-1 my-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]'
        >
          レビューを送る
        </button>
      </div>
    </div>
  )
}

export default SendReviewModal;