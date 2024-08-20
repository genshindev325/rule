import React from 'react';

interface DeleteConfirmationProps {
  isVisible: boolean,
  onConfirm: () => void,
  onCancel: () => void
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationProps> = ({ isVisible, onConfirm, onCancel }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h3 className="text-lg font-bold mb-4">削除の確認</h3>
        <p>本当にこのアイテムを削除しますか？</p>
        <div className="mt-4 flex justify-end">
          <button 
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            onClick={onConfirm}
          >
            削除
          </button>
          <button 
            className="bg-gray-500 text-white px-4 py-2 rounded"
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