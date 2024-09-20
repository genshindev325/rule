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
  earnings: number
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
            <th className="text-left">イベント名</th>
            <th className="text-left">開催日時</th>
            <th className="text-left">男性</th>
            <th className="text-left">女性</th>
            <th className="text-left">売上</th>
          </tr>
        </thead>
        <tbody>
          {pastEvents.map((event, index) => (
            <tr key={index}>
              <td>{event.eventName}</td>
              <td>{formatDateTime(event.eventDate)}</td>
              <td>{event.males}/{event.maleTotal}</td>
              <td>{event.females}/{event.femaleTotal}</td>
              <td>{(event.males * event.maleFee + event.females * event.femaleFee) * 0.05} (円)</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PastEvents;
