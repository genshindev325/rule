// components/utils/notification.tsx

import React, { useEffect, useState  } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Trigger onClose after the fade-out transition
    }, 2500);
    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white text-sm z-50 flex items-center justify-between transition-transform duration-300 ease-in-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} 
      w-5/9 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl`}
      style={{ transition: 'opacity 0.3s ease, transform 0.3s ease' }} // Smooth transition
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Notification;
