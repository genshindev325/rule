// components/store/salesManagement/eventHistory.tsx

'use client';

import React from 'react';
import { formatDateTime } from '@/utils/datetime';
import { formatNumber } from '@/utils/formatNumber';

interface EventProps {
  eventName: string;
  eventDate: string;
  storeEarnings: number;
}

interface EventHistoryProps {
  events: EventProps[]
}

const EventHistory: React.FC<EventHistoryProps> = ({ events }) => {
  return (
    <div className="p-10 bg-white shadow-md rounded-md w-full text-gray-800">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="text-left">イベント名</th>
            <th className="text-left">日時</th>
            <th className="text-left">売上</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td>{event.eventName}</td>
              <td>{formatDateTime(event.eventDate)}</td>
              <td>{formatNumber(event.storeEarnings)} 円</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventHistory;
