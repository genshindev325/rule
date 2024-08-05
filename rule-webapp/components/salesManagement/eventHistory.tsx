'use client';

import React from 'react';

const events = [
  {
    name: 'drinking party event',
    date: 'September 16, 2023 17:00',
    earnings: '12356'
  },
  {
    name: "Married people's Party",
    date: 'September 12, 2023 16:00',
    earnings: '23589'
  },
  {
    name: 'drinking party event',
    date: 'August 20, 2023 17:00',
    earnings: '8535'
  },
  {
    name: '[20s only]Love party Solo and first-time participants are also welcome',
    date: 'August 15, 2023 18:00',
    earnings: '9389'
  },
  // Add more events as needed
];

const EventHistory = () => {
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
