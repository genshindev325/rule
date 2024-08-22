// components/admin/dashboard/userList.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import DeleteConfirmationModal from '@/components/utils/deleteConfirmModal';

interface User {
  userID: string,
  userName: string,
  registeredDate: string,
}

interface UserListProps {
  users: User[]
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [isDeleteConfirmModalVisible, setDeleteConfirmModalVisible] = useState(false);

  // Delete user logic
  const handleDelete = (rowId: string) => {
    setSelectedRowId(rowId);
    setDeleteConfirmModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedRowId !== null) {
      const response = await fetch(`/api/users/${selectedRowId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.status === 200) {
        const result = await response.json();
        console.log(result.message);
        router.push('/admin/dashboard');
      } else {
        console.log(response.status);
        console.log("Delete user failed.");
      }
      setSelectedRowId(null);
    }
    setDeleteConfirmModalVisible(false);
  };

  const handleCancel = () => {
    setDeleteConfirmModalVisible(false);
  };

  // Edit user logic
  const handleEdit = (rowId: string) => {
    // Implement your edit logic here, such as opening a modal to edit the row
    console.log(rowId);
  };

  const filteredUsers = users.filter(user =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userID.includes(searchTerm)
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

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

  const formatDateTime = ( dt: string ) => {
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const curDateTime = new Date(dt);
    const y = curDateTime.getFullYear();
    const m = months[curDateTime.getMonth()];
    const d = curDateTime.getDate();
    const mm = curDateTime.getMinutes();
    const hh = curDateTime.getHours();
    return `${m} ${d}, ${y} ${hh}:${mm}`;
  }

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
      <div className="p-6 bg-white shadow-md rounded-md g-4">
        <table className="w-full">
          <thead>
            <tr>
              <th className='text-left'>ID</th>
              <th className='text-left px-4'>ユーザー名</th>
              <th className='text-left px-4'>登録日時</th>
              <th className='text-left px-4'>アクション</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user._id}>
                <td className="py-2 text-left">{user.userID}</td>
                <td className="py-2 px-4 text-left">{user.userName}</td>
                <td className="py-2 px-4 text-left">{formatDateTime(user.createdAt)}</td>
                <td className="py-2 px-4 text-left">
                  <div className="flex space-x-2 justify-start">
                    <button className="text-blue-600">設定</button>
                    <button className="text-red-600" onClick={() => handleDelete(user._id)}>削除</button>
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
    </div>
  );
};

export default UserList;
