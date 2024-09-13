// components/store/chat/chatMessages.tsx

import React from 'react';

const ChatMessages: React.FC = () => {
  return (
    <div className="flex-1 bg-gray-100 text-gray-800">
      <div className="flex flex-col space-y-2 p-4">
        {/* conversations */}
        <div className="self-start bg-gray-300 py-2 pl-4 pr-36 rounded-2xl rounded-bl-none">
          この度はありがとうございました!
        </div>
        <div className='text-md'>
          2023/9/16 14:32
        </div>
        <div className="self-end bg-blue-500 text-white py-2 pr-4 pl-36 rounded-2xl rounded-br-none">
          ご来場ありがとうございました!
        </div>
        <div className='text-md text-right'>
          2023/9/16 14:52
        </div>
        <div className="self-end bg-blue-500 text-white py-2 pr-4 pl-36 rounded-2xl rounded-br-none">
          改めて感謝申し上げます!
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
