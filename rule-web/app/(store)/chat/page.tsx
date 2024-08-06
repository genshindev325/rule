// app/(store)/chat/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
import Navbar from '@/components/navbar';

// const socket = io('http://localhost:3001');

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  // useEffect(() => {
  //   socket.on('message', (message: string) => {
  //     setMessages((prevMessages) => [...prevMessages, message]);
  //   });

  //   return () => {
  //     socket.off('message');
  //   };
  // }, []);

  const sendMessage = () => {
    if (input.trim()) {
      // socket.emit('message', input);
      setInput('');
    }
  };

  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1 flex flex-col p-4">
        <div className="flex-1 overflow-y-auto mb-4">
          {messages.map((msg, idx) => (
            <div key={idx} className="mb-2">
              {msg}
            </div>
          ))}
        </div>
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="ml-4 p-2 bg-blue-500 text-white rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
