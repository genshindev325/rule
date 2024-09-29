// components/store/chat/chatMessages.tsx

import React from 'react';

interface Message {
  text: string;
  timestamp: string;
  sender: 'user' | 'store';
}

const ChatMessages: React.FC<{ messages: Message[] }> = ({ messages }) => {
  return (
    <div className="flex-1 bg-gray-100 text-gray-800">
      <div className="flex flex-col space-y-2 p-4">
        {/* conversations */}
        {messages.map((message, index) => (
          <div key={index} className={`flex flex-col ${message.sender === 'store' ? 'items-end' : 'items-start'}`}>
            <div
              className={`${
                message.sender === 'store'
                  ? 'bg-blue-500 text-white self-end'
                  : 'bg-gray-300 self-start'
              } py-2 px-4 rounded-2xl ${message.sender === 'store' ? 'rounded-br-none' : 'rounded-bl-none'}`}
            >
              {message.text}
            </div>
            <div className={`text-sm text-gray-600 ${message.sender === 'store' ? 'text-right' : 'text-left'}`}>
              {message.timestamp}
            </div>
          </div>
        ))}
        {/* Add more messages as needed */}
      </div>
    </div>
  );
};

export default ChatMessages;
