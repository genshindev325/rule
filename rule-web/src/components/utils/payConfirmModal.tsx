// components/utils/DeleteConfirmationModal.tsx

import React, { useRef, useEffect } from 'react';

interface PayConfirmationModalProps {
  isVisible: boolean;
  storeName: string;
  payAmount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

const PayConfirmationModal: React.FC<PayConfirmationModalProps> = ({ isVisible, storeName, payAmount, onConfirm, onCancel }) => {
  const modalRef = useRef<HTMLDivElement>(null);

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
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 text-gray-800">
      <div ref={modalRef} className="bg-white p-4 rounded shadow-lg">
        <h3 className="text-lg font-bold mb-4">削除の確認</h3>
        <p>{payAmount}円を<strong className='underline'>{storeName}</strong>に入金しましたか？</p>
        <div className="mt-4 flex justify-end text-sm sm:text-md font-semibold space-x-2">
          <button
            className="bg-gray-300 px-4 py-2 rounded duration-300"
            onClick={onCancel}
          >
            いいえ
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded mr-2 duration-300"
            onClick={onConfirm}
          >
            はい
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayConfirmationModal;
