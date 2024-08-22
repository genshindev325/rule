// components/store/dashboard/upcomingEvents.tsx

'use client';

import React from 'react';

interface UpcomingEvent {
  name: string | "Town dating, matchmaking, drinking party events",
  date: string | "September 20, 2023 17:00",
  maleTotal: number | 20,
  males: number | 15,
  femaleTotal: number | 20,
  females: number | 12,
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
          {events.map((event, index) => (
            <tr key={index}>
              <td>{event.name}</td>
              <td>{event.date}</td>
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
