// app/pages/chat/chatList.tsx

'use client';

import React, {useState, useEffect} from 'react';
import { IonPage, IonContent, IonRouterLink, useIonRouter } from '@ionic/react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store/store';
import { SERVER_URL } from '@/app/config';
import AuthWrapper from '@/app/components/auth/authWrapper';
import { setChat } from '@/app/store/features/chat/ChatSlice';
import { formatDateTime } from '@/app/components/utils/datetime';

interface Message {
  message: string;
  createdAt: string;
  relationship: 'a-u-r' | 'a-u-s' | 's-u-r' | 's-u-s';
  eventName: string;
}

interface ChatList {
  id: string;
  name: string;
  date: string;
  lastMessage: string;
  avatar: string;
  messages: Message[];
}

const ChatList: React.FC = () => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const [searchTerm, setSearchTerm] = useState('');
  const userProfile = useSelector((state: RootState) => state.auth.profile);
  const [chats, setChats] = useState<ChatList[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatList | null>(null);
  const [userId, setUserId] = useState('');
  const router = useIonRouter();
  const dispatch = useDispatch();
  const POLLING_INTERVAL = 1000 * 60;

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

  useEffect(() => {
    if (userProfile) {
      setUserId(userProfile._id);
    } else {
      console.log('No use profile available.');
    }

    const fetchChats = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/api/chats/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({userId: userProfile?._id}),
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
    const intervalId = setInterval(fetchChats, POLLING_INTERVAL);
    return () => clearInterval(intervalId);
  }, [selectedChat]);

  const handleChatSelected = (chat: ChatList) => {
    setSelectedChat(chat);
    dispatch(setChat(chat));
    router.push('/chatMessages');
  }

  return (
    <IonPage>
      <IonContent>
        <AuthWrapper allowedRoles={['user']}>
          <div className='h-[calc(100vh-56px)] min-w-full flex flex-col bg-white text-gray-800 pb-4 sm:pb-6'>
            {/* Header */}
            <div className={`h-20 sm:h-24 w-full ${maleGradient} z-10`}>
              <div className='flex flex-row text-lg font-semibold text-center text-white pt-2 sm:pt-4 px-4 sm:px-6 md:px-8'>
                <button onClick={() => router.goBack()}>
                  <img src='/svg/arrow-left-white.svg' className='w-6 h-6' />
                </button>
                <h2 className='grow pr-6'>お問い合わせ</h2>
              </div>
              <div className='px-10 sm:px-12 mt-2'>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full py-2 px-4 rounded-lg bg-white focus:outline-none text-xs placeholder:text-center"
                  placeholder="検索"
                />
              </div>
            </div>
            {/* admin contact */}
            {adminContact.length > 0 &&
              <div className="flex items-center justify-center pt-2">
                <span className="w-40 text-center text-sm sm:text-base text-gray-400 border-b border-gray-300">管 理 者</span>
              </div>
            }
            {adminContact.length > 0 &&
              <li
                key={adminContact[0].id}
                onClick={() => handleChatSelected(adminContact[0])}
                className={`p-3 duration-500 flex flex-col items-center cursor-pointer hover:bg-gray-300 ${
                  selectedChat?.id === adminContact[0].id ? 'bg-gray-200' : 'bg-white'
                }`}
              >
                <div className='flex flex-row w-full gap-2'>
                  <img
                    src={adminContact[0].avatar || '/path/to/default/avatar.png'} // Default avatar path
                    alt={adminContact[0].name}
                    className={`rounded-full border-blue-500 ${
                      selectedChat?.id === adminContact[0].id ? 'w-11 h-11 border-2' : 'w-10 h-10 border-0'
                    }`}
                  />
                  <div className='flex flex-col w-full gap-1'>
                    <div className='flex flex-row justify-between w-full'>
                      <div className='text-sm font-semibold'>{adminContact[0].name}</div>
                      {adminContact[0].date && <div className="text-xs sm:text-sm text-right mr-4 text-gray-600">{formatDateTime(adminContact[0].date)}</div>}
                    </div>
                    <div className="text-sm text-gray-800">{adminContact[0].lastMessage.length > 20 ? `${adminContact[0].lastMessage.slice(0, 20)}...` : adminContact[0].lastMessage}</div>
                  </div>
                </div>
              </li>
            }
            {chats.length > 1 &&
              <div className="flex items-center justify-center pt-2">
                <span className="w-40 text-center text-sm sm:text-base text-gray-400 border-b border-gray-300">店&nbsp;&nbsp;舗</span>
              </div>
            }
            {/* Chat List */}
            <ul>
              {filteredChats.map((chat) => (
                <li
                  key={chat.id}
                  onClick={() => handleChatSelected(chat)}
                  className={`p-3 duration-500 flex items-center cursor-pointer hover:bg-gray-300 ${
                    selectedChat?.id === chat.id ? 'bg-gray-200' : 'bg-white'
                  }`}
                >
                  <div className='flex flex-row w-full gap-2'>
                    <img
                      src={chat.avatar || '/image/minion.png'}
                      alt={chat.name}
                      className={`rounded-full border-blue-500 ${
                        selectedChat?.id === chat.id ? 'w-11 h-11 border-2' : 'w-10 h-10 border-0'
                      }`}
                    />
                    <div className='flex flex-col w-full gap-1'>
                      <div className='flex flex-row justify-between w-full'>
                        <div className='text-sm font-semibold'>{chat.name}</div>
                        {chat.date && <div className="text-xs sm:text-sm text-right mr-4 text-gray-600">{formatDateTime(chat.date)}</div>}
                      </div>
                      <div className="text-sm text-gray-800">{chat.lastMessage.length > 20 ? `${chat.lastMessage.slice(0, 20)}...` : chat.lastMessage}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </AuthWrapper>
      </IonContent>
    </IonPage>
  );
}

export default ChatList;