// components/utils/SaveConfirmationModal.tsx

import React, { useRef, useEffect } from 'react';

interface ISaveConfirmationModal {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const SaveConfirmModal: React.FC<ISaveConfirmationModal> = ({ isVisible, onConfirm, onCancel }) => {
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
        <h3 className="text-lg font-bold mb-4">保存を確認</h3>
        <p>ユーザーのステータスを保存しますか?</p>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2 duration-300"
            onClick={onConfirm}
          >
            保存
          </button>
          <button
            className="bg-gray-400 hover:bg-gray-600 text-white px-4 py-2 rounded duration-300"
            onClick={onCancel}
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveConfirmModal;
