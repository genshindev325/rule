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
    <div className="min-h-screen min-w-full flex bg-gray-100">
      <div className="w-20">
        <Navbar />
      </div>
      <ChatList />
      <div className="flex flex-col flex-1">
        <ChatMessages />
        <ChatInput sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default ChatPage;
