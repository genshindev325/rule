// components/chat/chatMessages.tsx

import React from 'react';

const ChatMessages: React.FC = () => {
  return (
    <div className="flex-1 bg-gray-100">
      <div className="flex flex-col space-y-2 p-4">
        {/* conversations */}
        <div className="self-start bg-gray-300 py-2 pl-4 pr-36 rounded-2xl rounded-bl-none">
          Thank you for this time!
        </div>
        <div className='text-md'>
          2023/9/16 14:32
        </div>
        <div className="self-end bg-blue-500 text-white py-2 pr-4 pl-36 rounded-2xl rounded-br-none">
          Thank you for visiting us!
        </div>
        <div className='text-md text-right'>
          2023/9/16 14:52
        </div>
        <div className="self-end bg-blue-500 text-white py-2 pr-4 pl-36 rounded-2xl rounded-br-none">
          Thank you again!
        </div>
        <div className='text-md text-right'>
          2023/9/16 14:53
        </div>
        {/* Add more messages as needed */}
      </div>
    </div>
  );
};

export default ChatMessages;
