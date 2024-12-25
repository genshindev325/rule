// components/utils/PayConfirmationModal.tsx

import React, { useRef, useEffect } from 'react';

interface PayConfirmationModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  totalPrice: number;
}

const PayConfirmationModal: React.FC<PayConfirmationModalProps> = ({ isVisible, onConfirm, onCancel, totalPrice }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const textMd = 'text-base sm:text-lg md:text-xl';
  const textSm = 'text-sm sm:text-base md:text-lg';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onCancel();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onCancel]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div ref={modalRef} className="bg-white text-gray-800 p-4 rounded shadow-lg mx-8">
        <h3 className={`${textMd} font-bold mb-4`}>お支払いの確認</h3>
        <p className={textSm}>あなたのカードから {totalPrice}円を振り込みます。よろしいですか？</p>
        <div className="mt-4 flex justify-end">
          <button
            className={`${textSm} bg-red-500 text-white px-4 py-2 rounded mr-2 duration-300`}
            onClick={onConfirm}
          >
            確認
          </button>
          <button
            className={`${textSm} bg-gray-500 text-white px-4 py-2 rounded duration-300`}
            onClick={onCancel}
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayConfirmationModal;
