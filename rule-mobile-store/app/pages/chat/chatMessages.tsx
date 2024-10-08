// app/pages/chat/chatMessages.tsx

'use client';

import React, {useState, useEffect, useRef} from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonMenuButton, IonTitle, useIonRouter } from '@ionic/react';
import { FaPaperPlane } from 'react-icons/fa';
import SideMenu from '@/app/components/store/IonMenu';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { formatDateTime } from '@/app/utils/datetime';
import { SERVER_URL } from '@/app/config';
import AuthWrapper from '@/app/components/auth/authWrapper';

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

const ChatMessages: React.FC = () => {
  const [chatName, setChatName] = useState('')
  const router = useIonRouter();
  const selectedChat = useSelector((state: RootState) => state.chat.selectedChat);
  const storeProfile = useSelector((state: RootState) => state.auth.profile);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const [storeId, setStoreId] = useState('');
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (selectedChat) {
      setChatName(selectedChat.name);
      setMessages(selectedChat.messages);      
    } else {
      console.log('there is no selected chat.')
      router.push('/chatList');
    }
    if (storeProfile) {
      setStoreId(storeProfile._id);
    } else {
      console.log('there is no store profile.')
      router.push('/chatList');
    }
  }, [selectedChat])

  const sendMessage = async (newMessage: string) => {
    if (selectedChat && newMessage.trim()) {
      let relationship = selectedChat.id === '123456789012345678901234' ? 'a-s-r' : 's-u-s';
      const messageData = {
        requester: storeId,
        responsor: selectedChat.id,
        message: newMessage,
        relationship: relationship,
      };

      let updatedMessages: Message[] = [];
      if (selectedChat.id === '123456789012345678901234') {
        updatedMessages = [
          ...messages,
          {
            message: newMessage,
            createdAt: new Date().toISOString(),
            relationship: 'a-s-r',
          },
        ];
      } else {
        updatedMessages = [
          ...messages,
          {
            message: newMessage,
            createdAt: new Date().toISOString(),
            relationship: 's-u-s',
          },
        ];
      }

      setMessages(updatedMessages);

      try {
        const response = await fetch(`${SERVER_URL}/api/chats/store`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(messageData),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput(''); // Clear input after sending
      // Reset height to one line after sending
      if (textareaRef.current) {
        textareaRef.current.style.height = '2.5rem'; // Set to the height of a single line
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.altKey) {
        // Allow Alt + Enter for a new line
        e.preventDefault(); // Prevent the default action
        setInput((prev) => prev + '\n'); // Add a newline character
      } else {
        // Send message if Enter is pressed without Alt
        handleSend();
        e.preventDefault(); // Prevent adding a new line
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat?.messages]);

  return (
    <AuthWrapper allowedRoles={['store']}>
      <SideMenu />
      <IonPage id='main-content'>
        <IonHeader>
            <IonToolbar>
              <IonMenuButton slot="start" /> {/* This button opens the SideMenu */}
              <IonTitle className='text-center font-semibold text-xl mr-12'>{chatName}</IonTitle> {/* Default title */}
            </IonToolbar>
          </IonHeader>
        <IonContent fullscreen>
          <div className='max-h-screen min-w-full flex flex-col bg-white py-4 sm:py-6'>
            <div className="flex flex-col space-y-2 p-4 h-[calc(100vh-8rem)] overflow-y-auto">
              {/* conversations */}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    message.relationship === 'a-s-r' || message.relationship === 's-u-s'
                      ? 'items-end'
                      : 'items-start'
                  }`}
                >
                  <div
                    className={`${
                      message.relationship === 'a-s-r' || message.relationship === 's-u-s'
                        ? 'bg-blue-500 text-white self-end'
                        : 'bg-gray-300 self-start'
                    } py-2 px-4 max-w-72 sm:max-w-80 md:max-w-88 rounded-2xl ${
                      message.relationship === 'a-s-r' || message.relationship === 's-u-s'
                        ? 'rounded-br-none'
                        : 'rounded-bl-none'
                    } break-words overflow-hidden`}
                  >
                    {message.message}
                  </div>
                  <div
                    className={`text-sm text-gray-600 ${
                      message.relationship === 'a-s-r' || message.relationship === 's-u-s'
                        ? 'text-right'
                        : 'text-left'
                    }`}
                  >
                    {formatDateTime(message.createdAt)}
                  </div>
                </div>
              ))}
              {/* A dummy div to scroll to */}
              <div ref={messagesEndRef} />
            </div>
          </div>
          {/* input box */}
          <div className="absolute bottom-0 w-full flex items-center p-4 border-gray-300 bg-white border-t-2 border-solid text-gray-800">
            <textarea
              ref={textareaRef} // Reference for the textarea
              value={input}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="flex-1 p-2 rounded bg-gray-200 focus:outline-none resize-none text-sm overflow-hidden"
              placeholder="メッセージ"
              rows={1} // Set initial rows to 1 for a single line
              style={{ 
                height: `2.5em`,
                minHeight: '2.5em', // Set minimum height
                maxHeight: '5em' // Set maximum height to limit expansion
              }}
              onInput={(e) => {
                // Adjust height based on content
                e.currentTarget.style.height = 'auto'; // Reset height
                e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`; // Set to scroll height
              }}
            />
            <button
              onClick={handleSend}
              className="ml-4 p-2 bg-blue-500 text-white rounded"
            >
              <FaPaperPlane />
            </button>
          </div>
        </IonContent>
      </IonPage>
    </AuthWrapper>
  )
}

export default ChatMessages;