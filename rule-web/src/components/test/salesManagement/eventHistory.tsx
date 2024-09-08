// components/store/salesManagement/eventHistory.tsx

'use client';

import React from 'react';

interface EventProps {
  name: string,
  date: string,
  earnings: number
}

interface EventHistoryProps {
  events: EventProps[]
}

const EventHistory: React.FC<EventHistoryProps> = ({ events }) => {
  return (
    <div className="p-10 bg-white shadow-md rounded-md w-full">
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
              <td>{event.name}</td>
              <td>{event.date}</td>
              <td>{event.earnings} 円</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventHistory;
