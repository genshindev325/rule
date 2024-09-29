// app/store/chat/page.tsx

'use client';

import React, { useState } from 'react';

import AuthWrapper from '@/components/auth/authWrapper';
import Navbar from '@/components/store/navbar';
import ChatList from '@/components/store/chat/chatList';
import ChatMessages from '@/components/store/chat/chatMessages';
import ChatInput from '@/components/store/chat/chatInput';

interface Message {
  text: string;
  timestamp: string;
  sender: 'user' | 'store'; // Store or User will be the message sender
}

interface Chat {
  name: string;
  date: string;
  lastMessage: string;
  avatar: string;
  messages: Message[]; // Include messages in the chat
}

const initialChats: Chat[] = [
  {
    name: '仕事',
    date: '2023/09/16',
    lastMessage: 'ありがとうございました！',
    avatar: '/image/minion.png',
    messages: [
      { text: 'この度はありがとうございました!', timestamp: '2023/9/16 14:32', sender: 'user' },
      { text: 'ご来場ありがとうございました!', timestamp: '2023/9/16 14:52', sender: 'store' },
      { text: '改めて感謝申し上げます!', timestamp: '2023/9/16 14:53', sender: 'store' },
    ]
  },
  {
    name: '会議',
    date: '2023/09/15',
    lastMessage: 'お時間をいただきありがとうございました！',
    avatar: '/image/minion.png',
    messages: [
      { text: 'お時間をいただきありがとうございました!', timestamp: '2023/9/15 14:32', sender: 'user' }
    ]
  }
];

const ChatPage: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  const sendMessage = (newMessage: string) => {
    if (selectedChat && newMessage.trim()) {
      // Update the messages for the selected chat
      const updatedMessages: Message[] = [
        ...selectedChat.messages,
        {
          text: newMessage,
          timestamp: new Date().toLocaleString(),
          sender: 'store',
        },
      ];

      // Create the updated chat object with new message and last message
      const updatedChat: Chat = {
        ...selectedChat,
        lastMessage: newMessage,
        messages: updatedMessages,
        date: new Date().toLocaleDateString('ja-JP'),
      };

      // Update the chats state to reflect the new message
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.name === selectedChat.name ? updatedChat : chat
        )
      );

      // Update the selected chat state
      setSelectedChat(updatedChat);
    }
  };

  return (
    <AuthWrapper allowedRoles={['store']}>
      <div className="h-screen min-w-full flex bg-gray-100 text-gray-800">
        <div className="w-20">
          <Navbar />
        </div>
        <ChatList chats={chats} selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
        <div className="flex flex-col w-full h-full">
          <div className="flex flex-row items-center p-4 border-gray-300 border-b-2 border-solid">
            <img
              src={selectedChat?.avatar || '/image/minion.png'}
              alt={selectedChat?.name || 'Chat Avatar'}
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <div className="text-lg font-bold">{selectedChat?.name}</div>
            </div>
          </div>
          <div className="flex flex-row h-full">
            <div className="flex flex-col w-2/3">
              <ChatMessages messages={selectedChat?.messages || []} />
              <ChatInput sendMessage={sendMessage} />
            </div>
            <div className="flex flex-col w-1/3 border-gray-300 border-l-2 border-solid"></div>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default ChatPage;
