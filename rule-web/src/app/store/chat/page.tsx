'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AuthWrapper from '@/components/auth/authWrapper';
import Navbar from '@/components/store/navbar';
import ChatList from '@/components/store/chat/chatList';
import ChatMessages from '@/components/store/chat/chatMessages';
import ChatInput from '@/components/store/chat/chatInput';
import { RootState } from '@/store/store';
import { formatDateTime } from '@/utils/datetime';

interface Message {
  message: string;
  createdAt: string;
  relationship: 'a-s-r' | 'a-s-s' | 's-u-r' | 's-u-s';
}

interface Chat {
  id: string;
  name: string;
  date: string;
  lastMessage: string;
  avatar: string;
  messages: Message[]; // Include messages in the chat
}

const ChatPage: React.FC = () => {
  const storeProfile = useSelector((state: RootState) => state.auth.profile);
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [storeId, setStoreId] = useState('');

  useEffect(() => {
    if (storeProfile) {
      setStoreId(storeProfile._id);
    } else {
      console.log('No user profile available.');
    }

    const fetchChats = async () => {
      try {
        const response = await fetch('/api/chats/store', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({storeId: storeProfile?._id}),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch chats');
        }
        const data = await response.json();

        const chatsWithMessages = data.chats.map((chat: any) => ({
          ...chat,
          messages: chat.messages || [],
        }));

        const allChats = [
          ...chatsWithMessages
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
  }, [storeProfile]);

  const sendMessage = async (newMessage: string) => {
    if (selectedChat && newMessage.trim()) {
      let relationship = '';
      let requester = '';
      let responsor = '';
      if (selectedChat.id === '123456789012345678901234') {
        relationship = 'a-s-r';
        requester = storeId;
        responsor = selectedChat.id;
      } else {
        relationship = 's-u-s';
        requester = selectedChat.id;
        responsor = storeId;
      }
      const messageData = {
        requester: requester,
        responsor: responsor,
        message: newMessage,
        relationship: relationship,
      };

      try {
        const response = await fetch('/api/chats/store', {
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
        if (selectedChat.id === '123456789012345678901234') {
          updatedMessages = [
            ...selectedChat.messages,
            {
              message: newMessage,
              createdAt: new Date().toISOString(),
              relationship: 'a-s-r',
            },
          ];
        } else {
          updatedMessages = [
            ...selectedChat.messages,
            {
              message: newMessage,
              createdAt: new Date().toISOString(),
              relationship: 's-u-s',
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
    <AuthWrapper allowedRoles={['store']}>
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
