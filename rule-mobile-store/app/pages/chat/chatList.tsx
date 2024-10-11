// app/pages/chat/chatList.tsx

'use client';

import React, {useState, useEffect} from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonMenuButton, IonTitle, useIonRouter } from '@ionic/react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store/store';
import { SERVER_URL } from '@/app/config';
import { formatDateTime } from '@/app/utils/datetime';
import SideMenu from '@/app/components/store/IonMenu';
import { setChat } from '@/app/store/features/chat/ChatSlice';
import AuthWrapper from '@/app/components/auth/authWrapper';

interface Message {
  message: string;
  createdAt: string;
  relationship: 'a-s-r' | 'a-s-s' | 's-u-r' | 's-u-s';
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
  const [searchTerm, setSearchTerm] = useState('');
  const storeProfile = useSelector((state: RootState) => state.auth.profile);
  const [chats, setChats] = useState<ChatList[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatList | null>(null);
  const [storeId, setStoreId] = useState('');
  const router = useIonRouter();
  const dispatch = useDispatch();

  // Function to handle search input
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Filter chats based on search input
  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (storeProfile) {
      setStoreId(storeProfile._id);
    } else {
      console.log('No use profile available.');
    }

    const fetchChats = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/api/chats/store`, {
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

  const handleChatSelected = (chat: ChatList) => {
    setSelectedChat(chat);
    dispatch(setChat(chat));
    router.push('/chatMessages');
  }

  return (
    <AuthWrapper allowedRoles={['store']}>
      <SideMenu />
      <IonPage id='main-content'>
        <IonHeader>
            <IonToolbar>
              <IonMenuButton slot="start" /> {/* This button opens the SideMenu */}
              <IonTitle className='text-center font-semibold mr-12 text-gray-800'>お問い合わせ</IonTitle> {/* Default title */}
            </IonToolbar>
          </IonHeader>
        <IonContent fullscreen>
          <div className='min-h-screen min-w-full flex flex-col bg-white ion-padding text-gray-800'>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              className="w-auto px-2 py-1 m-2 rounded bg-gray-200 focus:outline-none text-lg"
              placeholder="検索"
            />
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
                      src={chat.avatar || '/image/minion.png'} // Default avatar path
                      alt={chat.name}
                      className={`rounded-full border-blue-500 ${
                        selectedChat?.id === chat.id ? 'w-11 object-contain border-2' : 'w-10 object-contain border-0'
                      }`}
                    />
                    <div className='flex flex-col w-full gap-1'>
                      <div className='flex flex-row justify-between w-full'>
                        <div className='text-sm font-semibold'>{chat.name}</div>
                        <div className="text-xs sm:text-sm pr-4 text-right text-gray-600">{chat.date}</div>
                      </div>
                      <div className="text-sm text-gray-800">{chat.lastMessage.length > 30 ? `${chat.lastMessage.slice(0, 30)}...` : chat.lastMessage}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </IonContent>
      </IonPage>
    </AuthWrapper>
  );
}

export default ChatList;