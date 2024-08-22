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
            <th className="text-left">Event Name</th>
            <th className="text-left">Date and Time</th>
            <th className="text-left">Earnings</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td>{event.name}</td>
              <td>{event.date}</td>
              <td>{event.earnings} yen</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventHistory;
