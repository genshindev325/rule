// components/admin/events/upcomingEvents.tsx

'use client';

import React from 'react';
import DropdownMenu from '@/components/utils/dropdownMenu';

interface UpcomingEvent {
  id: number,
  eventName: string,
  date: string,
  maleTotal: number,
  males: number,
  femaleTotal: number,
  females: number
}

interface UpcomingEvents {
  upcomingEvents: UpcomingEvent[]
}

const UpcomingEvents: React.FC<UpcomingEvents> = ({ upcomingEvents }) => {

  const handleDelete = (id: number) => {
    // Remove the row with the given ID from the state
    console.log(id);
  };

  const handleEdit = (id: number) => {
    // Implement your edit logic here, such as opening a modal to edit the row
    console.log(id);
  };  

  return (
    <div className="p-10 bg-white shadow-md rounded-md g-4">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">イベント名</th>
            <th className="text-left">開催日時</th>
            <th className="text-left">男性</th>
            <th className="text-left">女性</th>
            <th className="text-center">アクション</th>
          </tr>
        </thead>
        <tbody>
          {upcomingEvents.map((event, index) => (
            <tr key={index}>
              {/* Hidden ID column */}
              <td className="hidden">{event.id}</td>
              <td>{event.eventName}</td>
              <td>{event.date}</td>
              <td>{event.males}/{event.maleTotal}</td>
              <td>{event.females}/{event.femaleTotal}</td>
              <td className='text-center'>
                <DropdownMenu onDelete={() => handleDelete(event.id)} onEdit={() => handleEdit(event.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpcomingEvents;
