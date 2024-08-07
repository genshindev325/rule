// components/admin/events/pastEvents.tsx

'use client';

import React from 'react';

const events = [
  {
    name: 'drinking party event',
    date: 'September 16, 2023 17:00',
    male: '15/20 people',
    female: '12/20 people',
    earnings: '12356'
  },
  {
    name: 'Town dating, matchmaking, drinking party events',
    date: 'September 20, 2023 17:00',
    male: '15/20 people',
    female: '12/20 people',
    earnings: '23589'
  },
  {
    name: 'Town dating, matchmaking, drinking party events',
    date: 'September 20, 2023 17:00',
    male: '15/20 people',
    female: '12/20 people',
    earnings: '8535'
  },
  // Add more events as needed
];

const PastEvents = () => {
  return (
    <div className="p-10 bg-white shadow-md rounded-md g-4">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">イベント名</th>
            <th className="text-left">日時</th>
            <th className="text-left">男</th>
            <th className="text-left">女</th>
            <th className="text-left">Earnings</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td>{event.name}</td>
              <td>{event.date}</td>
              <td>{event.male}</td>
              <td>{event.female}</td>
              <td>{event.earnings} (yen)</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PastEvents;
