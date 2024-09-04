// utils/notification.tsx

import React, { useEffect } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    // Automatically close the notification after 3 seconds
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500 text-white w-56' : 'bg-red-500 text-white w-80'
      }`}
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="text-white font-bold">
          &times;
        </button>
      </div>
    </div>
  );
};

export default Notification;
