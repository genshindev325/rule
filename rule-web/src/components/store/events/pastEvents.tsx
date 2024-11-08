// components/admin/events/pastEvents.tsx

'use client';

import React, { useState, useEffect } from 'react';

import { formatDateTime } from '@/utils/datetime';

interface PastEvent {
  _id: number,
  eventName: string,
  eventDate: string,
  maleTotal: string | null,
  males: number,
  maleFee: number,
  femaleTotal: string | null,
  females: number,
  femaleFee: number,
  earnings: number,
  store: {
    _id: string,
    storeName: string
  },
}

interface PastEvents {
  pastEvents: PastEvent[]
}

const PastEvents: React.FC<PastEvents> = ({ pastEvents }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const filteredPastEvents = pastEvents.filter(event =>
    event.eventName && event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedEvents = filteredPastEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredPastEvents.length / itemsPerPage);

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pageNumber = parseInt(e.target.value, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const items = parseInt(e.target.value, 10);
    if (!isNaN(items) && items >= 1) {
      setItemsPerPage(items);
      setCurrentPage(1); // Reset to first page
    }
  };

  return (
    <div className='p-0 text-gray-800'>
      <div className="w-full mb-4 flex justify-start gap-8 bg-white shadow-md rounded-md p-4">
        <input
          type="text"
          placeholder="検索..."
          className="border p-2 rounded focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex ml-auto items-center space-x-2">
          <span>1ページあたりの項目数:</span>
          <input type="number" value={itemsPerPage} onChange={handleItemsPerPageChange}
            className="w-10 p-2 bg-gray-100 text-center rounded no-spinner focus:outline-none" min="1" max={totalPages} />
        </div>
      </div>
      <div className="p-10 bg-white shadow-md rounded-md g-4 text-gray-800">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left w-1/4">イベント名</th>
              <th className="text-left w-1/4">店舗名</th>
              <th className="text-left w-1/4">開催日時</th>
              <th className="text-left w-1/8">男性</th>
              <th className="text-left w-1/8">女性</th>
              <th className="text-left">売上(円)</th>
            </tr>
          </thead>
          <tbody>
            {pastEvents.map((event, index) => (
              <tr key={index}>
                <td className='w-1/4'>{event.eventName}</td>
                <td className='w-1/4'>{event.store.storeName}</td>
                <td className='w-1/4'>{formatDateTime(event.eventDate)}</td>
                <td className='w-1/8'>{event.males}/{event.maleTotal}</td>
                <td className='w-1/8'>{event.females}/{event.femaleTotal}</td>
                <td className='text-left'>{(event.males * event.maleFee + event.females * event.femaleFee) * 0.05}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-start items-center">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border-none disabled:opacity-50"
        >
          &lt;&lt;
        </button>
          <input type="number" value={currentPage} onChange={handlePageInputChange}
            className="w-10 p-1 border items-center text-center no-spinner rounded focus:outline-none" min="1" max={totalPages} />
          <span>&nbsp;/&nbsp;{totalPages}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border-none disabled:opacity-50"
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default PastEvents;
