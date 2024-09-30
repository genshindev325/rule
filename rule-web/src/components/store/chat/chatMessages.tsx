// components/store/chat/chatMessages.tsx

import React from 'react';

interface Message {
  message: string;
  createdAt: string;
  sender: 'a-s-r' | 'a-s-s' | 's-u-r' | 's-u-s';
}

const ChatMessages: React.FC<{ messages: Message[] }> = ({ messages }) => {
  return (
    <div className="flex-1 bg-gray-100 text-gray-800">
      <div className="flex flex-col space-y-2 p-4">
        {/* conversations */}
        {messages.map((message, index) => (
          <div key={index} className={`flex flex-col ${message.sender === 'a-s-r' || 's-u-s' ? 'items-end' : 'items-start'}`}>
            <div
              className={`${
                message.sender === 'a-s-r' || 's-u-s'
                  ? 'bg-blue-500 text-white self-end'
                  : 'bg-gray-300 self-start'
              } py-2 px-4 rounded-2xl ${message.sender === 'a-s-r' || 's-u-s' ? 'rounded-br-none' : 'rounded-bl-none'}`}
            >
              {message.message}
            </div>
            <div className={`text-sm text-gray-600 ${message.sender === 'a-s-r' || 's-u-s' ? 'text-right' : 'text-left'}`}>
              {message.createdAt}
            </div>
          </div>
        ))}
        {/* Add more messages as needed */}
      </div>
    </div>
  );
};

export default ChatMessages;
