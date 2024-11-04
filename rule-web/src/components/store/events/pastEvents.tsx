// components/admin/events/pastEvents.tsx

'use client';

import React from 'react';

import { formatDateTime } from '@/utils/datetime';

interface PastEvent {
  eventName: string | "---",
  eventDate: string | "---",
  maleTotal: number,
  males: number,
  maleFee: number,
  femaleTotal: number,
  females: number,
  femaleFee: number,
  earnings: number,
  store: {
    _id: string,
    storeName: string
  },
}

interface PastEvents {
  pastEvents: PastEvent[]
}

const PastEvents: React.FC<PastEvents> = ({ pastEvents }) => {
  return (
    <div className="p-10 bg-white shadow-md rounded-md g-4 text-gray-800">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left w-1/4">イベント名</th>
            <th className="text-left w-1/4">店舗名</th>
            <th className="text-left w-1/4">開催日時</th>
            <th className="text-left w-1/8">男性</th>
            <th className="text-left w-1/8">女性</th>
            <th className="text-left">売上(円)</th>
          </tr>
        </thead>
        <tbody>
          {pastEvents.map((event, index) => (
            <tr key={index}>
              <td className='w-1/4'>{event.eventName}</td>
              <td className='w-1/4'>{event.store.storeName}</td>
              <td className='w-1/4'>{formatDateTime(event.eventDate)}</td>
              <td className='w-1/8'>{event.males}/{event.maleTotal}</td>
              <td className='w-1/8'>{event.females}/{event.femaleTotal}</td>
              <td className='text-left'>{(event.males * event.maleFee + event.females * event.femaleFee) * 0.05}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PastEvents;
