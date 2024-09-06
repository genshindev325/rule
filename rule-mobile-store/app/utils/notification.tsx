// components/utils/notification.tsx

import React, { useEffect } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    // Automatically close the notification after 4 seconds
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
      type === 'success' ? 'bg-green-500 text-white w-56' : 'bg-red-500 text-white w-80' }`}
    />
  );
};

export default Notification;
