// components/store/dashboard/upcomingEvents.tsx

'use client';

import React from 'react';

import { formatDateTime } from '@/utils/datetime';

interface UpcomingEvent {
  eventName: string | "---",
  eventDate: string | "---",
  maleTotal: number | 0,
  males: number | 0,
  femaleTotal: number | 0,
  females: number | 0,
}

interface UpcomingEvents {
  events: UpcomingEvent[]
}

const UpcomingEvents: React.FC<UpcomingEvents> = ({ events }) => {
  return (
    <div className="p-10 bg-white shadow-md rounded-md g-4">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">イベント名</th>
            <th className="text-left">日時</th>
            <th className="text-left">男</th>
            <th className="text-left">女</th>
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
