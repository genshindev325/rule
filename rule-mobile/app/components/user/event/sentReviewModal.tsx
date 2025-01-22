// /app/components/user/event/sentReviewModal.tsx

'use client'

import React, { useEffect, useRef } from 'react';

interface ISentReviewModal {
  isOpen: boolean;
  onClose: () => void;
}

const SentReviewModal: React.FC<ISentReviewModal> = ({ isOpen, onClose }) => {
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
      <div ref={modalRef} className="relative flex flex-col items-center justify-center space-y-4 bg-white text-gray-800 p-8 rounded-2xl rounded-tr-none w-[75vw] min-h-[40vh] max-w-2xl mx-4 sm:mx-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-1 -right-1 w-6 h-6 flex items-center justify-center rounded-full bg-gray-400 hover:bg-red-400 text-white font-semibold transition duration-300"
          aria-label="Close"
        >
          ✕
        </button>
        <h2 className='text-sm text-blue-600 font-semibold'>レビューありがとうございました</h2>
      </div>
    </div>
  )
}

export default SentReviewModal;