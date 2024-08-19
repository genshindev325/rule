// components/admin/dashboard/memberStoreList.tsx

'use client';

import React, { useState } from 'react';

const users = [
  { id: '1111-2222-3333-43441', monthRate: '5000', storename: 'Taro Yamamoto', registeredDate: 'September 20, 2023 17:00' },
  { id: '1111-2222-3333-43442', monthRate: '5000', storename: 'Taro Sato', registeredDate: 'October 12, 2023 16:00' },
  { id: '1111-2222-3333-43443', monthRate: '5000', storename: 'Taro Iwasaki', registeredDate: 'October 20, 2023 17:00' },
  { id: '1111-2222-3333-43444', monthRate: '5000', storename: 'Taro Omae', registeredDate: 'December 15, 2023 18:00' },
  { id: '1111-2222-3333-43445', monthRate: '5000', storename: 'Hanako', registeredDate: 'September 20, 2023 17:00' },
  { id: '1111-2222-3333-43446', monthRate: '5000', storename: 'Hanako', registeredDate: 'October 12, 2023 16:00' },
  { id: '1111-2222-3333-43447', monthRate: '5000', storename: 'Hanako', registeredDate: 'October 20, 2023 17:00' },
  { id: '1111-2222-3333-43448', monthRate: '5000', storename: 'Taro Omae', registeredDate: 'December 15, 2023 18:00' },
  { id: '1111-2222-3333-43449', monthRate: '5000', storename: 'Taro Yamamoto', registeredDate: 'September 20, 2023 17:00' },
  { id: '1111-2222-3333-43451', monthRate: '5000', storename: 'Taro Sato', registeredDate: 'October 12, 2023 16:00' },
  { id: '1111-2222-3333-43452', monthRate: '5000', storename: 'Taro Iwasaki', registeredDate: 'October 20, 2023 17:00' },
  { id: '1111-2222-3333-43453', monthRate: '5000', storename: 'Taro Omae', registeredDate: 'December 15, 2023 18:00' },
  { id: '1111-2222-3333-43454', monthRate: '5000', storename: 'Taro Yamamoto', registeredDate: 'September 20, 2023 17:00' },
  { id: '1111-2222-3333-43455', monthRate: '5000', storename: 'Taro Sato', registeredDate: 'October 12, 2023 16:00' },
  { id: '1111-2222-3333-43456', monthRate: '5000', storename: 'Taro Iwasaki', registeredDate: 'October 20, 2023 17:00' },
  { id: '1111-2222-3333-43457', monthRate: '5000', storename: 'Taro Omae', registeredDate: 'December 15, 2023 18:00' },
  { id: '1111-2222-3333-43458', monthRate: '5000', storename: 'Taro Yamamoto', registeredDate: 'September 20, 2023 17:00' },
  { id: '1111-2222-3333-43459', monthRate: '5000', storename: 'Taro Sato', registeredDate: 'October 12, 2023 16:00' },
  { id: '1111-2222-3333-43461', monthRate: '5000', storename: 'Taro Iwasaki', registeredDate: 'October 20, 2023 17:00' },
  { id: '1111-2222-3333-43462', monthRate: '5000', storename: 'Taro Omae', registeredDate: 'December 15, 2023 18:00' },
  { id: '1111-2222-3333-43463', monthRate: '5000', storename: 'Taro Yamamoto', registeredDate: 'September 20, 2023 17:00' },
  { id: '1111-2222-3333-43464', monthRate: '5000', storename: 'Taro Sato', registeredDate: 'October 12, 2023 16:00' },
  { id: '1111-2222-3333-43465', monthRate: '5000', storename: 'Taro Iwasaki', registeredDate: 'October 20, 2023 17:00' },
  { id: '1111-2222-3333-43466', monthRate: '5000', storename: 'Taro Omae', registeredDate: 'December 15, 2023 18:00' },
  // Add more users if needed 
];

const itemsPerPage = 4;

const MemberStoreList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user =>
    user.storename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.includes(searchTerm)
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
              <th className='text-left px-4'>店名</th>
              <th className='text-left px-4'>月額料金</th>
              <th className='text-left px-4'>登録日時</th>
              <th className='text-left px-4'>アクション</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id}>
                <td className="py-2 text-left">{user.id}</td>
                <td className="py-2 px-4 text-left">{user.storename}</td>
                <td className="py-2 px-4 text-left">{user.monthRate}</td>
                <td className="py-2 px-4 text-left">{user.registeredDate}</td>
                <td className="py-2 px-4 text-left">
                  <div className="flex space-x-2 justify-start">
                    <button className="text-blue-600">設定</button>
                    <button className="text-red-600">削除</button>
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
    </div>
  );
};

export default MemberStoreList;
