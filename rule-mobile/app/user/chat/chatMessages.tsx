// app/pages/chat/chatMessages.tsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { IonPage, IonContent, IonRouterLink, useIonRouter } from '@ionic/react';
import { FaPaperPlane } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import AuthWrapper from '@/app/components/auth/authWrapper';
import { formatDateTime } from '@/app/components/utils/datetime';
import { SERVER_URL } from '@/app/config';

interface Message {
  message: string;
  createdAt: string;
  relationship: 'a-u-r' | 'a-u-s' | 's-u-r' | 's-u-s';
  eventName: string;
}

const ChatMessages: React.FC = () => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const [chatName, setChatName] = useState('')
  const router = useIonRouter();
  const selectedChat = useSelector((state: RootState) => state.chat.selectedChat);
  const userProfile = useSelector((state: RootState) => state.auth.profile);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const [userId, setUserId] = useState('');
  const [selectedChatId, setSelectedChatId] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const searchParams = useSearchParams();
  const [eventName, setEventName] = useState('')

  useEffect(() => {
    const storeName = searchParams.get('storeName');
    const storeId = searchParams.get('storeId');
    if (storeId && storeName) {
      setChatName(storeName);
      setMessages([]);
      setSelectedChatId(storeId);
      setEventName(searchParams.get('eventName') || '');
    } else if (selectedChat) {
      setChatName(selectedChat.name);
      setMessages(selectedChat.messages);
      setSelectedChatId(selectedChat.id);
      setEventName('')
    } else {
      console.log('there is no selected chat or store params.');
      router.push('/chatList');
      setEventName('')
    }

    if (userProfile) {
      setUserId(userProfile._id);
    } else {
      console.log('there is no user profile.')
      router.push('/chatList');
    }
    console.log("messsages: " + JSON.stringify(messages));
  }, [selectedChat])

  const sendMessage = async (newMessage: string) => {
    if (newMessage.trim()) {
      let relationship = selectedChatId === '123456789012345678901234' ? 'a-u-r' : 's-u-r';
      const messageData = {
        requester: userId,
        responsor: selectedChatId,
        message: newMessage,
        relationship: relationship,
        eventName: searchParams.get('eventName') || ''
      };
      console.log("sdsdf: " + JSON.stringify(messageData))

      let updatedMessages: Message[] = [];
      if (selectedChatId === '123456789012345678901234') {
        updatedMessages = [
          ...messages,
          {
            message: newMessage,
            createdAt: new Date().toISOString(),
            relationship: 'a-u-r',
            eventName: searchParams.get('eventName') || ''
          },
        ];
      } else {
        updatedMessages = [
          ...messages,
          {
            message: newMessage,
            createdAt: new Date().toISOString(),
            relationship: 's-u-r',
            eventName: searchParams.get('eventName') || ''
          },
        ];
      }

      setMessages(updatedMessages);

      try {
        const response = await fetch(`${SERVER_URL}/api/chats/user`, {
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
  }, [messages]);

  return (
    <IonPage>
      <IonContent>
        <AuthWrapper allowedRoles={['user']}>
          <div className='max-h-[calc(100vh-56px)] min-w-full flex flex-col bg-white text-gray-800 pb-4 sm:pb-6'>
            {/* Header */}
            <div className={`h-14 sm:h-16 md:h-20 w-full ${maleGradient} z-10`}>
              <div className='flex flex-row text-lg font-semibold text-center text-white pt-4 px-4'>
                <IonRouterLink routerLink={'/chatList'}>
                  <img src='/svg/arrow-left-white.svg' className='w-6 h-6' />
                </IonRouterLink>
                <h2 className='grow pr-4'>{chatName}</h2>
              </div>
            </div>
            <div className="flex flex-col space-y-2 p-4 h-[calc(100vh-8rem)] overflow-y-auto">
              {/* conversations */}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    message.relationship === 'a-u-r' || message.relationship === 's-u-r'
                      ? 'items-end'
                      : 'items-start'
                  }`}
                >
                  {(message.eventName && message.eventName !== '' && message.relationship === 's-u-r') &&
                    <div className="text-xs text-gray-800 py-2 underline underline-offset-2 text-left">
                      イベント名: {message.eventName}
                    </div>
                  }
                  <div
                    className={`${
                      message.relationship === 'a-u-r' || message.relationship === 's-u-r'
                        ? 'bg-blue-500 text-white self-end'
                        : 'bg-gray-300 self-start'
                    } py-2 px-4 max-w-72 sm:max-w-80 md:max-w-88 rounded-2xl ${
                      message.relationship === 'a-u-r' || message.relationship === 's-u-r'
                        ? 'rounded-br-none'
                        : 'rounded-bl-none'
                    } break-words overflow-hidden`}
                  >
                    {message.message}
                  </div>
                  <div
                    className={`text-sm text-gray-600 ${
                      message.relationship === 'a-u-r' || message.relationship === 's-u-r'
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
        </AuthWrapper>
      </IonContent>
    </IonPage>
  )
}

export default ChatMessages;