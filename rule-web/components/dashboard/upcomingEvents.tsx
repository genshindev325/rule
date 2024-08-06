'use client';

import React from 'react';

const events = [
  {
    name: 'Town dating, matchmaking, drinking party events',
    date: 'September 20, 2023 17:00',
    male: '15/20 people',
    female: '12/20 people'
  },
  {
    name: 'Town dating, matchmaking, drinking party events',
    date: 'September 20, 2023 17:00',
    male: '15/20 people',
    female: '12/20 people'
  },
  {
    name: 'Town dating, matchmaking, drinking party events',
    date: 'September 20, 2023 17:00',
    male: '15/20 people',
    female: '12/20 people'
  },
  // Add more events as needed
];

const UpcomingEvents = () => {
  return (
    <div className="p-10 bg-white shadow-md rounded-md g-4">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Event Name</th>
            <th className="text-left">Date and Time</th>
            <th className="text-left">Male</th>
            <th className="text-left">Female</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td>{event.name}</td>
              <td>{event.date}</td>
              <td>{event.male}</td>
              <td>{event.female}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpcomingEvents;
