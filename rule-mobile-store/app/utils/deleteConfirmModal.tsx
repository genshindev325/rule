// components/utils/DeleteConfirmationModal.tsx

import React, { useRef, useEffect } from 'react';

interface DeleteConfirmationModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isVisible, onConfirm, onCancel }) => {
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
        <h3 className="text-md font-bold mb-4">削除の確認</h3>
        <p>本当にこのアイテムを削除しますか？</p>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-red-500 text-white text-sm sm: text-md px-4 py-2 rounded mr-2 duration-300"
            onClick={onConfirm}
          >
            削除
          </button>
          <button
            className="bg-gray-500 text-white text-sm sm: text-md px-4 py-2 rounded duration-300"
            onClick={onCancel}
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
