import React, { useEffect, useRef } from 'react';
import { formatDateTime } from '@/utils/datetime';

interface Message {
  message: string;
  createdAt: string;
  relationship: 'a-s-r' | 'a-s-s' | 's-u-r' | 's-u-s';
  eventName: string;
}

const ChatMessages: React.FC<{ messages: Message[] }> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    console.log(JSON.stringify(messages))
  }, [messages]);

  return (
    <div className="flex-1 bg-gray-100 text-gray-800 h-screen overflow-hidden">
      <div className="flex flex-col space-y-2 p-4 h-full overflow-y-auto">
        {/* conversations */}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              message.relationship === 'a-s-r' || message.relationship === 's-u-s'
                ? 'items-end'
                : 'items-start'
            }`}
          >
            {(message.eventName && message.eventName !== '' && message.relationship === 's-u-r') &&
              <div className="text-xs text-gray-800 py-2 underline underline-offset-2 text-left">
                イベント名: {message.eventName}
              </div>
            }
            <div
              className={`${
                message.relationship === 'a-s-r' || message.relationship === 's-u-s'
                  ? 'bg-blue-500 text-white self-end'
                  : 'bg-gray-300 self-start'
              } py-2 px-4 max-w-80 sm:max-w-88 md:max-w-96 rounded-2xl ${
                message.relationship === 'a-s-r' || message.relationship === 's-u-s'
                  ? 'rounded-br-none'
                  : 'rounded-bl-none'
              } break-words overflow-hidden`}
            >
              {message.message}
            </div>
            <div
              className={`text-sm text-gray-600 ${
                message.relationship === 'a-s-r' || message.relationship === 's-u-s'
                  ? 'text-right'
                  : 'text-left'
              }`}
            >
              {formatDateTime(message.createdAt)}
            </div>
          </div>
        ))}
        {/* A dummy div to scroll to */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessages;
