// components/dashboard/ReviewModal.tsx

'use client';

import React, { useEffect, useRef } from 'react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: string) => void;
}

const reviews = [
  {
    user: 'Hashimoto Banana',
    date: '昨日',
    content: 'It was a lot of fun! I\'d love to participate again if I have the opportunity.',
    conclusion: 'The food was also delicious.',
    rating: 5
  },
  {
    user: 'Hashimoto Banana',
    date: '昨日',
    content: 'It was a lot of fun! I\'d love to participate again if I have the opportunity.',
    conclusion: 'The food was also delicious.',
    rating: 4
  },
  {
    user: 'Hashimoto Banana',
    date: '昨日',
    content: 'It was a lot of fun! I\'d love to participate again if I have the opportunity.',
    conclusion: 'The food was also delicious.',
    rating: 5
  },
  // Add more reviews as needed
];

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [review, setReview] = React.useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(review);
    setReview('');
    onClose();
  };

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
        <h2 className="text-2xl mb-4">Write a Review</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full border rounded p-2 mb-4"
            rows={5}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
          <div className="flex justify-end space-x-2">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
