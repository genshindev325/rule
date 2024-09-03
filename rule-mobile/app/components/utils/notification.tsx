// components/utils/notification.tsx

import React from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500 text-white w-48' : 'bg-red-500 text-white w-80'
      }`}
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        {/* <button onClick={onClose} className="text-white font-bold">
          &times;
        </button> */}
      </div>
    </div>
  );
};

export default Notification;
