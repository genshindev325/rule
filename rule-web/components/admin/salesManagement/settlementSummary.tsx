// components/admin/salesManagement/settlementSummary.tsx

'use client';

import React, { useState } from 'react';

const stores = [
  { storename: 'isazakaza', eargings: '12356', salesForecast: '15356', totalDepositedAmount: '12356' },
  { storename: 'tarantoiy', eargings: '23589', salesForecast: '24623', totalDepositedAmount: '23589' },
  { storename: 'kolaramoy', eargings: '8535', salesForecast: '18236', totalDepositedAmount: '8535' },
  { storename: 'homogenny', eargings: '9389', salesForecast: '29491', totalDepositedAmount: '9389' },
  { storename: 'buluramar', eargings: '14765', salesForecast: '17856', totalDepositedAmount: '19999' },
  { storename: 'clearitym', eargings: '2356', salesForecast: '12256', totalDepositedAmount: '23476' },
  { storename: 'isazakaza', eargings: '12356', salesForecast: '15356', totalDepositedAmount: '12356' },
  { storename: 'tarantoiy', eargings: '23589', salesForecast: '24623', totalDepositedAmount: '23589' },
  { storename: 'kolaramoy', eargings: '8535', salesForecast: '18236', totalDepositedAmount: '8535' },
  { storename: 'homogenny', eargings: '9389', salesForecast: '29491', totalDepositedAmount: '9389' },
  { storename: 'buluramar', eargings: '14765', salesForecast: '17856', totalDepositedAmount: '19999' },
  { storename: 'clearitym', eargings: '2356', salesForecast: '12256', totalDepositedAmount: '23476' },
  { storename: 'isazakaza', eargings: '12356', salesForecast: '15356', totalDepositedAmount: '12356' },
  { storename: 'tarantoiy', eargings: '23589', salesForecast: '24623', totalDepositedAmount: '23589' },
  { storename: 'kolaramoy', eargings: '8535', salesForecast: '18236', totalDepositedAmount: '8535' },
  { storename: 'homogenny', eargings: '9389', salesForecast: '29491', totalDepositedAmount: '9389' },
  { storename: 'buluramar', eargings: '14765', salesForecast: '17856', totalDepositedAmount: '19999' },
  { storename: 'clearitym', eargings: '2356', salesForecast: '12256', totalDepositedAmount: '23476' },
  { storename: 'isazakaza', eargings: '12356', salesForecast: '15356', totalDepositedAmount: '12356' },
  { storename: 'tarantoiy', eargings: '23589', salesForecast: '24623', totalDepositedAmount: '23589' },
  { storename: 'kolaramoy', eargings: '8535', salesForecast: '18236', totalDepositedAmount: '8535' },
  { storename: 'homogenny', eargings: '9389', salesForecast: '29491', totalDepositedAmount: '9389' },
  { storename: 'buluramar', eargings: '14765', salesForecast: '17856', totalDepositedAmount: '19999' },
  { storename: 'clearitym', eargings: '2356', salesForecast: '12256', totalDepositedAmount: '23476' },
  { storename: 'isazakaza', eargings: '12356', salesForecast: '15356', totalDepositedAmount: '12356' },
  { storename: 'tarantoiy', eargings: '23589', salesForecast: '24623', totalDepositedAmount: '23589' },
  { storename: 'kolaramoy', eargings: '8535', salesForecast: '18236', totalDepositedAmount: '8535' },
  { storename: 'homogenny', eargings: '9389', salesForecast: '29491', totalDepositedAmount: '9389' },
  { storename: 'buluramar', eargings: '14765', salesForecast: '17856', totalDepositedAmount: '19999' },
  { storename: 'clearitym', eargings: '2356', salesForecast: '12256', totalDepositedAmount: '23476' },
  // Add more users if needed
];

const itemsPerPage = 4;

const StoreList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStores = stores.filter(store =>
    store.storename.toLowerCase().includes(searchTerm.toLowerCase())
    //  || store.id.includes(searchTerm)
  );

  const paginatedStores = filteredStores.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredStores.length / itemsPerPage);

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
              <th className='text-left'>店名</th>
              <th className='text-left px-4'>売上</th>
              <th className='text-left px-4'>売上見込</th>
              <th className='text-left px-4'>総合入金済金額</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStores.map((store) => (
              <tr key={store.storename}>
                <td className="py-2 text-left">{store.storename}</td>
                <td className="py-2 px-4 text-left">{store.eargings}</td>
                <td className="py-2 px-4 text-left">{store.salesForecast}</td>
                <td className="py-2 px-4 text-left">{store.totalDepositedAmount}</td>
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

export default StoreList;
