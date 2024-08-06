// app/(store)/chat/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
import Navbar from '@/components/navbar';
import ChatList from '@/components/chat/chatList';
import ChatMessages from '@/components/chat/chatMessages';
import ChatInput from '@/components/chat/chatInput';

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
    <div className="h-screen min-w-full flex bg-gray-100">
      <div className="w-20">
        <Navbar />
      </div>
      <ChatList />
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-row items-center p-4 border-gray-300 border-b-2 border-solid">
          <img
            src="/image/minion.png"
            alt="Taro Sato"
            className="w-10 h-10 rounded-full mr-4"
          />
          <div>
            <div className='text-lg'>Taro Sato</div>
          </div>
        </div>
        <div className='flex flex-row h-full'>
          <div className='flex flex-col w-2/3'>
            <ChatMessages />
            <ChatInput sendMessage={sendMessage} />
          </div>
          <div className='flex flex-col w-1/3 border-gray-300 border-l-2 border-solid'>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
