// components/store/dashboard/upcomingEvents.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { formatDateTime } from '@/utils/datetime';
import { RootState } from '@/store/store';
import DeleteConfirmationModal from '@/components/utils/deleteConfirmModal';
import EventSettingModal from '@/components/store/events/EventSettingModal';

interface UpcomingEvent {
  _id: number,
  eventName: string,
  eventDate: string,
  maleTotal: string | null,
  males: number,
  femaleTotal: string | null,
  females: number,
  store: {
    _id: string,
    storeName: string
  },
}

interface UpcomingEvents {
  events: UpcomingEvent[]
}

const UpcomingEvents: React.FC<UpcomingEvents> = ({ events: initialUpcomingEvents }) => {
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>(initialUpcomingEvents);
  const [selectedRowId, setSelectedRowId] = useState<number>(0);
  const [isEventSettingModal, setIsEventSettingModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteConfirmModalVisible, setDeleteConfirmModalVisible] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();
  
  // Delete user logic
  const handleDelete = (rowId: number) => {
    setSelectedRowId(rowId);
    setDeleteConfirmModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (!token) {
      router.push('/auth/signin');
      } else {
      if (selectedRowId !== null) {
        const response = await fetch(`/api/events/${selectedRowId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
          },
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
        setSelectedRowId(0);
      }
    }
    setDeleteConfirmModalVisible(false);
  };

  const handleCancel = () => {
    setDeleteConfirmModalVisible(false);
  };

  // Edit event logic
  const handleEdit = (rowId: number) => {
    setSelectedRowId(rowId);
    setIsEventSettingModal(true);
  };

  const handleEventChange = (eventID: number, newEventName: string, newEventDate: string, newMaleTotal: string | null, newFemaleTotal: string | null) => {
    setUpcomingEvents(prevEvents => prevEvents.map(event =>
      event._id === eventID ?
        {
          ...event,
          eventName: newEventName,
          eventDate: newEventDate,
          maleTotal: newMaleTotal,
          femaleTotal: newFemaleTotal
        }
      : event
    ))
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
              <th className="text-left">イベント名</th>
              <th className="text-left">開催日時</th>
              <th className="text-left">男性</th>
              <th className="text-left">女性</th>
              <th className='text-center px-4'>アクション</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEvents?.map((event, index) => (
              <tr key={index}>
                <td>{event.eventName}</td>
                <td>{formatDateTime(event.eventDate)}</td>
                <td>{event.males}/{event.maleTotal}</td>
                <td>{event.females}/{event.femaleTotal}</td>
                <td className="py-2 px-4 text-center">
                  <div className="flex space-x-2 justify-center">
                    <button className="text-blue-600" onClick={() => handleEdit(event._id)}>設定</button>
                    <button className="text-red-600" onClick={() => handleDelete(event._id)}>削除</button>
                  </div>
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
      <EventSettingModal isVisible={isEventSettingModal} eventID={selectedRowId} onCancel={() => setIsEventSettingModal(false)} onEventChange={handleEventChange} />
    </div>
  );
};

export default UpcomingEvents;
