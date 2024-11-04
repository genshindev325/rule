'use client';

import React, { useState, useEffect } from 'react';
import AuthWrapper from '@/components/auth/authWrapper';
import Navbar from '@/components/admin/navbar';
import ChatList from '@/components/admin/chat/chatList';
import ChatMessages from '@/components/admin/chat/chatMessages';
import ChatInput from '@/components/admin/chat/chatInput';
import { formatDateTime } from '@/utils/datetime';

interface Message {
  message: string;
  createdAt: string;
  relationship: 'a-s-r' | 'a-s-s' | 'a-u-r' | 'a-u-s';
}

interface Chat {
  id: string;
  name: string;
  date: string;
  lastMessage: string;
  avatar: string;
  relationship: string;
  messages: Message[]; // Include messages in the chat
}

const ChatPage: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch('/api/chats/admin');
        if (!response.ok) {
          throw new Error('Failed to fetch chats');
        }
        const data = await response.json();

        const chatsWithMessages = data.chats.map((chat: any) => ({
          ...chat,
          messages: chat.messages || [],
        }));

        const allChats = [
          ...chatsWithMessages,
          // ...initialChats,
        ].filter(
          (chat, index, self) =>
            index === self.findIndex(c => c.id === chat.id) // Avoid duplicates
        );

        setChats(allChats);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, []);

  const sendMessage = async (newMessage: string) => {
    if (selectedChat && newMessage.trim()) {
      const messageData = {
        requester: selectedChat.id,
        message: newMessage,
      };

      try {
        const response = await fetch('/api/chats/admin', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(messageData),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        let updatedMessages: Message[] = [];
        if (selectedChat.relationship === 'a-s') {
          updatedMessages = [
            ...selectedChat.messages,
            {
              message: newMessage,
              createdAt: new Date().toISOString(),
              relationship: 'a-s-s',
            },
          ];
        } else {
          updatedMessages = [
            ...selectedChat.messages,
            {
              message: newMessage,
              createdAt: new Date().toISOString(),
              relationship: 'a-u-s',
            },
          ];
        }

        const updatedChat: Chat = {
          ...selectedChat,
          lastMessage: newMessage,
          messages: updatedMessages,
          date: new Date().toISOString(),
        };

        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === selectedChat.id ? updatedChat : chat
          )
        );

        setSelectedChat(updatedChat);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <AuthWrapper allowedRoles={['admin']}>
      <div className="h-screen min-w-full flex bg-gray-100 text-gray-800">
        <div className="w-20">
          <Navbar />
        </div>
        <ChatList chats={chats} selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
        <div className="flex flex-col w-full h-full">
          {selectedChat && ( // Make sure selectedChat exists before rendering its details
            <div className='max-h-screen'>
              <div className="flex flex-row items-center p-4 border-gray-300 border-b-2 border-solid">
                <img
                  src={selectedChat.avatar || '/image/minion.png'}
                  alt={selectedChat.name || 'Chat Avatar'}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <div className="text-lg font-bold">{selectedChat.name}</div>
                </div>
              </div>
              <div className="flex flex-row h-[calc(100vh-5rem)]">
                <div className="flex flex-col w-full">
                  <ChatMessages messages={selectedChat.messages} />
                  <ChatInput sendMessage={sendMessage} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthWrapper>
  );
};

export default ChatPage;
