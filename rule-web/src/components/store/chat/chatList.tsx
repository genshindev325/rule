import React, { useState } from 'react';

interface Message {
  message: string;
  createdAt: string;
  relationship: 'a-s-r' | 'a-s-s' | 's-u-r' | 's-u-s';
}

interface Chat {
  id: string; // Unique ID for the chat
  name: string; // Name of the contact
  date: string; // Last message date
  lastMessage: string; // Preview of the last message
  avatar: string; // Avatar URL
  messages: Message[];
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

  // Filter chats based on search input
  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      {/* Chat List */}
      <ul>
        {filteredChats.map((chat) => (
          <li
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            className={`p-3 duration-500 flex items-center cursor-pointer hover:bg-gray-400 ${
              selectedChat?.id === chat.id ? 'bg-gray-300' : 'bg-gray-100'
            }`}
          >
            <div className='flex flex-row gap-2'>
              <img
                src={chat.avatar || '/path/to/default/avatar.png'} // Default avatar path
                alt={chat.name}
                className={`rounded-full border-blue-500 mt-2 ${
                  selectedChat?.id === chat.id ? 'w-11 h-11 border-2' : 'w-10 h-10 border-0'
                }`}
              />
              <div className='flex flex-col gap-1'>
                <div className='flex flex-row justify-between w-full'>
                  <div className='font-semibold'>{chat.name}</div>
                  <div className="text-sm text-gray-600">{chat.date}</div>
                </div>
                <div className="text-sm text-gray-800">{chat.lastMessage.length > 50 ? `${chat.lastMessage.slice(0, 50)}...` : chat.lastMessage}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
