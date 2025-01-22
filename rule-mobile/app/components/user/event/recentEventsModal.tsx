// /app/components/user/event/recentEvents.tsx

'use client'

import React, { useEffect, useRef } from 'react';
import { IonRouterLink } from '@ionic/react';
import EventCard from './eventCard';

interface EventProps {
  _id: string;
  eventName: string;
  category: string;
  coverImage: string;
  description: string;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  maleFee: number;
  maleTotal: number;
  males: number;
  femaleFee: number;
  femaleTotal: number;
  females: number;
  store: {
    storeLat: number;
    storeLng: number;
    storeName: string;
    storeImages: string[];
    cookingGenre: string;
    foodGenre: string;
    storeGenre: string;
    address: string;
    access: string[];
    description: string;
    status: string;
  };
  status: string;
  createdAt: string;
}

interface RecentEventsProps {
  isOpen: boolean;
  onClose: () => void;
  recentEvents: EventProps[];
}

const RecentEventsModal: React.FC<RecentEventsProps> = ({ recentEvents, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const textMd = 'text-base sm:text-lg';

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-start pt-20 sm:pt-24 bg-black bg-opacity-50 z-20">
      <div ref={modalRef} className="flex flex-col space-y-4 bg-white text-gray-800 p-4 rounded-2xl shadow-md w-[90vw] min-h-[75vh] max-w-2xl mx-4 sm:mx-8">
        {recentEvents &&
          <div className='flex flex-row justify-center text-base font-bold text-gray-700'>
            今後のイベント
          </div>
        }
        {recentEvents && recentEvents.map((event, index) => (
          <div key={index}>
            <IonRouterLink routerLink={`/event/eventDetail?event=${encodeURIComponent(JSON.stringify(event))}`} className='text-black'>
              <EventCard {...event} />
            </IonRouterLink>
          </div>
        ))}
        {/* see more button */}
        {recentEvents.length > 5 &&
          <div className='py-4 sm:py-8 mx-auto'>
            <button type='submit' className={`w-52 py-1 rounded-full bg-[#e5e5e5] font-bold ${textMd}`}>もっと見る</button>
          </div>
        }
        {recentEvents.length === 0 &&
          <div className='flex flex-row items-center justify-center w-full min-h-[80vh]'>
            <h2 className='text-sm font-semibold text-gray-700'>
              一致するイベントが見つかりません。
            </h2>
          </div>
        }
      </div>
    </div>
  )
}

export default RecentEventsModal;