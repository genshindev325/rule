// components/chat/chatMessages.tsx

import React from 'react';

const ChatMessages: React.FC = () => {
  return (
    <div className="flex-1 bg-white">
      <div className="flex items-center p-4 mb-4 border-gray-300 border-b-2 border-solid">
        <img
          src="/image/minion.png"
          alt="Taro Sato"
          className="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <div className='text-lg'>Taro Sato</div>
        </div>
      </div>
      <div className="flex flex-col space-y-2 p-4">
        <div className="self-start bg-gray-200 p-2 rounded">
          Thank you for this time!
        </div>
        <div className="self-end bg-blue-500 text-white p-2 rounded">
          Thank you for visiting us!
        </div>
        <div className="self-end bg-blue-500 text-white p-2 rounded">
          Thank you again!
        </div>
        {/* Add more messages as needed */}
      </div>
    </div>
  );
};

export default ChatMessages;
