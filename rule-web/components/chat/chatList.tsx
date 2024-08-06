// components/chat/chatList.tsx

import React, { useState } from 'react';

interface Chat {
  name: string;
  date: string;
  lastMessage: string;
  avatar: string;
}

const chats: Chat[] = [
  {
    name: 'Taro Sato',
    date: '2023/09/16',
    lastMessage: 'Thank you again!',
    avatar: '/image/minion.png'
  },
  {
    name: 'Hana',
    date: '2023/09/15',
    lastMessage: 'Thank you for your time!',
    avatar: '/image/minion.png'
  },
]

const ChatList: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  const handleChatClick = (chat: Chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className="w-1/3 py-4 bg-gray-100 border-gray-300 border-r-2 border-solid">
      <h2 className="text-2xl font-bold mb-4 ml-6">Inquiry</h2>
      <input
        type="text"
        className="w-auto p-2 m-2 rounded bg-gray-200 focus:outline-none"
        placeholder="search"
      />
      {/* chat list */}
      <ul>
        {chats.map((chat, index) => (
          <li
            key={index}
            onClick={() => handleChatClick(chat)}
            className={`p-3 flex items-center cursor-pointer hover:bg-gray-400 ${
              selectedChat === chat ? 'bg-gray-300' : 'bg-gray-100'
            }`}
          >
            <div className='flex flex-row gap-2'>
              <img src={chat.avatar} className={`rounded-full border-blue-500 mt-2 ${
                selectedChat === chat ? 'w-11 h-11 border-2' : 'w-10 h-10 border-0'}`} />
              <div className='flex flex-col gap-2'>
                <div className='flex flex-row gap-4'>
                  <div>{chat.name}</div>
                  <div className="text-sm text-gray-500">{chat.date}</div>
                </div>
                <div>{chat.lastMessage}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {/* chat messages */}
    </div>
  );
};

export default ChatList;
