// components/store/chat/chatList.tsx

import React from 'react';

interface Chat {
  name: string;
  date: string;
  lastMessage: string;
  avatar: string;
  messages: { text: string; timestamp: string; sender: 'user' | 'store' }[]; // Include messages in the chat
}

const ChatList: React.FC<{
  chats: Chat[];
  selectedChat: Chat | null;
  setSelectedChat: (chat: Chat) => void;
}> = ({ chats, selectedChat, setSelectedChat }) => {

  return (
    <div className="w-1/4 py-4 bg-gray-100 border-gray-300 border-r-2 border-solid text-gray-800">
      <h2 className="text-2xl font-bold mb-4 ml-6">お問い合わせ</h2>
      <input
        type="text"
        className="w-auto p-2 m-2 rounded bg-gray-200 focus:outline-none"
        placeholder="検索"
      />
      {/* Chat List */}
      <ul>
        {chats.map((chat, index) => (
          <li
            key={index}
            onClick={() => setSelectedChat(chat)}
            className={`p-3 flex items-center cursor-pointer hover:bg-gray-400 ${
              selectedChat?.name === chat.name ? 'bg-gray-300' : 'bg-gray-100'
            }`}
          >
            <div className='flex flex-row gap-2'>
              <img
                src={chat.avatar}
                alt={chat.name}
                className={`rounded-full border-blue-500 mt-2 ${
                  selectedChat?.name === chat.name ? 'w-11 h-11 border-2' : 'w-10 h-10 border-0'
                }`}
              />
              <div className='flex flex-col gap-2'>
                <div className='flex flex-row gap-4'>
                  <div className='font-semibold'>{chat.name}</div>
                  <div className="text-sm text-gray-800">{chat.date}</div>
                </div>
                <div>{chat.lastMessage}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
