import React, { useState } from 'react';
import { formatDateTime } from '@/utils/datetime';

interface Message {
  message: string;
  createdAt: string;
  relationship: 'a-s-r' | 'a-s-s' | 's-u-r' | 's-u-s';
  eventName: string;
}

interface Chat {
  id: string; // Unique ID for the chat
  name: string; // Name of the contact
  date: string; // Last message date
  lastMessage: string; // Preview of the last message
  avatar: string; // Avatar URL
  messages: Message[];
  relationship: string;
}

const ChatList: React.FC<{
  chats: Chat[];
  selectedChat: Chat | null;
  setSelectedChat: (chat: Chat) => void;
}> = ({ chats, selectedChat, setSelectedChat }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle search input
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const adminContact = chats.filter(chat =>
    chat.id.includes('123456789012345678901234')
  );

  // Filter chats based on search input
  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) && !chat.id.includes('123456789012345678901234')
  );

  return (
    <div className="w-1/3 py-4 bg-gray-100 border-gray-300 border-r-2 border-solid text-gray-800">
      <h2 className="text-2xl font-bold mb-4 ml-6">お問い合わせ</h2>
      <div className='p-2'>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 rounded bg-gray-200 focus:outline-none"
          placeholder="検索"
        />
      </div>
      {adminContact.length > 0 &&
        <div className="flex items-center justify-center pt-2">
          <span className="w-40 text-center text-base font-semibold text-gray-400 border-b border-gray-300">管理者</span>
        </div>
      }
      {/* admin contact */}
      {adminContact.length > 0 &&
        <li
          key={adminContact[0].id}
          onClick={() => setSelectedChat(adminContact[0])}
          className={`p-3 duration-500 flex flex-col items-center cursor-pointer hover:bg-gray-400 ${
            selectedChat?.id === adminContact[0].id ? 'bg-gray-300' : 'bg-gray-100'
          }`}
        >
          <div className='flex flex-row w-full gap-2'>
            <img
              src={adminContact[0].avatar || '/path/to/default/avatar.png'} // Default avatar path
              alt={adminContact[0].name}
              className={`rounded-full border-blue-500 mt-2 ${
                selectedChat?.id === adminContact[0].id ? 'w-11 h-11 border-2' : 'w-10 h-10 border-0'
              }`}
            />
            <div className='flex flex-col w-full gap-1'>
              <div className='flex flex-row justify-between w-full'>
                <div className='text-sm font-semibold'>{adminContact[0].name}</div>
                {adminContact[0].date && <div className="text-xs sm:text-sm text-right text-gray-600">{formatDateTime(adminContact[0].date)}</div>}
              </div>
              <div className="text-sm text-gray-800">{adminContact[0].lastMessage.length > 20 ? `${adminContact[0].lastMessage.slice(0, 20)}...` : adminContact[0].lastMessage}</div>
            </div>
          </div>
        </li>
      }
      {chats.length > 1 &&
        <div className="flex items-center justify-center pt-2">
          <span className="w-40 text-center text-base font-semibold text-gray-400 border-b border-gray-300">ユーザー</span>
        </div>
      }
      {/* Chat List */}
      <ul>
        {filteredChats.map((chat) => (
          <li
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            className={`p-3 duration-500 flex flex-col items-center cursor-pointer hover:bg-gray-400 ${
              selectedChat?.id === chat.id ? 'bg-gray-300' : 'bg-gray-100'
            }`}
          >
            <div className='flex flex-row w-full gap-2'>
              <img
                src={chat.avatar || '/path/to/default/avatar.png'} // Default avatar path
                alt={chat.name}
                className={`rounded-full border-blue-500 mt-2 ${
                  selectedChat?.id === chat.id ? 'w-11 h-11 border-2' : 'w-10 h-10 border-0'
                }`}
              />
              <div className='flex flex-col w-full gap-1'>
                <div className='flex flex-row justify-between w-full'>
                  <div className='text-sm font-semibold'>{chat.name}</div>
                  {chat.date && <div className="text-xs sm:text-sm text-right text-gray-600">{formatDateTime(chat.date)}</div>}
                </div>
                <div className="text-sm text-gray-800">{chat.lastMessage.length > 20 ? `${chat.lastMessage.slice(0, 20)}...` : chat.lastMessage}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
