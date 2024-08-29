// components/admin/events/upcomingEvents.tsx

'use client';

import React, { useState } from 'react';

import DropdownMenu from '@/components/utils/dropdownMenu';
import DeleteConfirmationModal from '@/components/utils/deleteConfirmModal';
import { formatDateTime } from '@/utils/datetime';

interface UpcomingEvent {
  _id: number,
  eventName: string | "---",
  eventDate: string | "---",
  maleTotal: number,
  males: number,
  femaleTotal: number,
  females: number
}

interface UpcomingEvents {
  upcomingEvents: UpcomingEvent[]
}

const UpcomingEvents: React.FC<UpcomingEvents> = ({ upcomingEvents: initialUpcomingEvents }) => {
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>(initialUpcomingEvents);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [isDeleteConfirmModalVisible, setDeleteConfirmModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState('');

  // Delete event logic
  const handleDelete = (rowId: number) => {
    setSelectedRowId(rowId);
    setDeleteConfirmModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedRowId !== null) {
      const response = await fetch(`/api/events/${selectedRowId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.status === 200) {
        const result = await response.json();
        console.log(result.message);
        // Filter out the deleted event from the state
        setUpcomingEvents(prevEvents => prevEvents.filter(event => event._id !== selectedRowId));

        // Optionally, reset to the first page if the last item on the current page is deleted
        if ((currentPage - 1) * itemsPerPage >= upcomingEvents.length - 1) {
          setCurrentPage(prev => Math.max(prev - 1, 1));
        }
      } else {
        console.log(response.status);
        console.log("Delete event failed.");
      }
      setSelectedRowId(null);
    }
    setDeleteConfirmModalVisible(false);
  };

  const handleCancel = () => {
    setDeleteConfirmModalVisible(false);
  };

  // Edit event logic
  const handleEdit = (id: number) => {
    // Implement your edit logic here, such as opening a modal to edit the row
    console.log(id);
  };

  const filteredUpcomingEvents = upcomingEvents.filter(event =>
    event.eventName && event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
    // || event.storeID.includes(searchTerm)
  );

  const paginatedEvents = filteredUpcomingEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUpcomingEvents.length / itemsPerPage);

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
    <div className="p-0">
    <div className="w-full mb-4 flex justify-start gap-8 bg-white shadow-md rounded-md p-4">
      <input
        type="text"
        placeholder="検索..."
        className="border p-2 rounded focus:outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="border border-width-0 py-2 px-6 rounded-lg text-white text-lg bg-green-700 hover:bg-green-800 focus:outline-none">
        検索
      </button>
      <div className="flex ml-auto items-center space-x-2">
        <span>1ページあたりの項目数:</span>
        <input type="number" value={itemsPerPage} onChange={handleItemsPerPageChange}
          className="w-10 p-2 bg-gray-100 text-center rounded no-spinner focus:outline-none" min="1" max={totalPages} />
      </div>
    </div>
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
            {paginatedEvents.map((event, index) => (
              <tr key={index}>
                {/* Hidden ID column */}
                <td className="hidden">{event._id}</td>
                <td>{event.eventName}</td>
                <td>{formatDateTime(event.eventDate)}</td>
                <td>{event.males}/{event.maleTotal}</td>
                <td>{event.females}/{event.femaleTotal}</td>
                <td className='text-center'>
                  <DropdownMenu onDelete={() => handleDelete(event._id)} onEdit={() => handleEdit(event._id)} />
                </td>
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
      <DeleteConfirmationModal isVisible={isDeleteConfirmModalVisible} onConfirm={handleConfirmDelete} onCancel={handleCancel} />
    </div>
  );
};

export default UpcomingEvents;
