// components/store/dashboard/upcomingEvents.tsx

'use client';

import React from 'react';

import { formatDateTime } from '@/utils/datetime';

interface UpcomingEvent {
  eventName: string | "---",
  eventDate: string | "---",
  maleTotal: number,
  males: number,
  femaleTotal: number,
  females: number,
  store: {
    _id: string,
    storeName: string
  },
}

interface UpcomingEvents {
  events: UpcomingEvent[]
}

const UpcomingEvents: React.FC<UpcomingEvents> = ({ events }) => {
  return (
    <div className="p-10 bg-white shadow-md rounded-md g-4 text-gray-800">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">イベント名</th>
            <th className="text-left">開催日時</th>
            <th className="text-left">男性</th>
            <th className="text-left">女性</th>
          </tr>
        </thead>
        <tbody>
          {events?.map((event, index) => (
            <tr key={index}>
              <td>{event.eventName}</td>
              <td>{formatDateTime(event.eventDate)}</td>
              <td>{event.males}/{event.maleTotal}</td>
              <td>{event.females}/{event.femaleTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpcomingEvents;
