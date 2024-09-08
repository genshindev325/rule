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
    <div className={`fixed top-12 right-2 p-2 rounded-lg shadow-lg z-50 text-white text-sm ${
      type === 'success' ? 'bg-green-500 w-60' : 'bg-red-500 w-80' }`}
    >
      {message}
    </div>
  );
};

export default Notification;
