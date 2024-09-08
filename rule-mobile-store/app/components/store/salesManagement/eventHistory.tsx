// components/store/salesManagement/eventHistory.tsx

'use client';

import React from 'react';
import { formatDateTime } from '@/app/utils/datetime';
import { formatNumber } from '@/app/utils/formatNumber';

interface EventProps {
  name: string;
  date: string;
  earnings: number;
  // coverImage: string;
}

interface EventHistoryProps {
  events: EventProps[]
}

const EventHistory: React.FC<EventHistoryProps> = ({ events }) => {
   // will be modified...
  const coverImages = [
    '/image/img_1.png',
    '/image/img_2.png',
    '/image/img_3.png',
  ]
  const textMd = 'text-md sm:text-lg font-bold';
  const textSm = 'text-sm sm:text-md font-semibold';
  const textXs = 'text-xs sm:text-sm';

  return (
    <div className='min-h-screen min-w-full flex flex-col space-y-2 bg-gray-100'>
      {events.map((event, index) => (
        <div key={index} className="flex flex-row space-x-2 bg-white rounded-lg p-2 sm:p-4">
          <img src={coverImages[index]} alt={`event-profile`} className="w-24 sm:w-28" />
          <div className='flex flex-col'>
            <h2 className={`${textSm} mb-1`}>{event.name}</h2>
            <h2 className={`${textXs} mb-1`}>{formatDateTime(event.date)}</h2>
            <div className={`${textMd} mt-auto`}>{formatNumber(event.earnings)} 円</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventHistory;
