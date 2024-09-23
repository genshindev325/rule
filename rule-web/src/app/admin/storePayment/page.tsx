// app/admin/settlementSummary/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import AuthWrapper from '@/components/auth/authWrapper';
import Navbar from '@/components/admin/navbar';
import { formatDate } from '@/utils/formatDate';
import { formatNumber } from '@/utils/formatNumber';
import PayConfirmationModal from '@/components/utils/payConfirmModal';

interface StorePayment {
  _id: string;
  storeId: string;
  storeName: string;
  paymentDate: string;
  paymentAmount: number;
  status: string;
  createdAt: Date;
}

interface StorePaymentsProps {
  storePayments: StorePayment[],
}

const StorePayment: React.FC<StorePaymentsProps> = ({ storePayments: initialStorePayments }) => {
  const [loading, setLoading] = useState(true);
  const [storePayments, setStorePayments] = useState<StorePayment[]>(initialStorePayments);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [selectedStoreName, setSelectedStoreName] = useState('');
  const [selectedPayAmount, setSelectedPayAmount] = useState(0);
  const [isPayConfirmModalVisible, setPayConfirmModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch store management data
        const response = await fetch('/api/admin/storePayment');
        if (response.status === 200) {
          const result = await response.json();
          console.log(result);
          setStorePayments(result.data);
        } else {
          console.log('Failed to fetch store management data');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className='w-screen h-screen flex items-center justify-center text-3xl font-bold'>読み込み中...</div>;

  // pay store logic
  const handlePay = (rowId: string, storeName: string, payAmount: number) => {
    setSelectedRowId(rowId);
    setSelectedStoreName(storeName);
    setSelectedPayAmount(payAmount);
    setPayConfirmModalVisible(true);
  }

  const handleConfirmPay = async () => {
    if (selectedRowId !== null) {
      const response = await fetch(`/api/admin/storePayment/${selectedRowId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedRowId }),
      });
      if (response.status === 200) {
        const result = await response.json();
        console.log(result.message);
        setCurrentPage(1);
      } else {
        console.log(response.status);
        console.log('Payment failed.');
      }
      setSelectedRowId(null);
    }
    setPayConfirmModalVisible(false);
  }

  const handleCancel = () => {
    setPayConfirmModalVisible(false);
  };
  // pay store logic end

  const filteredStores = storePayments.filter(store =>
    store.storeName && store.storeName.toLowerCase().includes(searchTerm.toLowerCase())
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
    <AuthWrapper allowedRoles={['admin']}>
      <div className="min-h-screen w-full flex bg-gray-100 text-gray-800">
        <div className='w-20'>
          <Navbar />
        </div>
        <div className='w-full p-10 pb-16'>
          <div className="w-full mb-4 flex justify-start gap-8 bg-white shadow-md rounded-md p-4">
            <input
              type="text"
              placeholder="検索..."
              className="border p-2 rounded focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="border border-width-0 py-2 px-6 rounded-lg text-white text-lg bg-green-700 hover:bg-green-800 focus:outline-none duration-300">
              検索
            </button>
            <div className="flex ml-auto items-center space-x-2">
              <span>1ページあたりの項目数:</span>
              <input type="number" value={itemsPerPage} onChange={handleItemsPerPageChange}
                className="w-10 p-2 bg-gray-100 text-center rounded no-spinner focus:outline-none" min="1" max={totalPages} />
            </div>
          </div>
          <div className='p-6 bg-white shadow-md rounded-md g-4'>
            <table className='w-full'>
              <thead>
                <tr>
                  <th className='text-left'>店名</th>
                  <th className='text-left px-4'>決済ステータス</th>
                  <th className='text-left px-4'>決済日</th>
                  <th className='text-left px-4'>金額(円)</th>
                  <th className='text-left px-4'>アクション</th>
                </tr>
              </thead>
              <tbody>
                {paginatedStores.map((storePayment) => (
                  <tr key={storePayment._id}>
                    <td className='py-2 text-left'>{storePayment.storeName}</td>
                    <td className={`py-2 px-4 text-left ${storePayment.status === '未払い' ? 'text-red-500' : ''}`}>
                      {storePayment.status}
                    </td>
                    <td className='py-2 px-4 text-left'>{formatDate(storePayment.paymentDate)}</td>
                    <td className='py-2 px-4 text-left'>{formatNumber(storePayment.paymentAmount)}</td>
                    <td className='py-2 px-4 text-left'>
                      {storePayment.status === '未払い' &&
                        <button className='text-red-600 text-sm sm:text-md' onClick={() => handlePay(storePayment._id, storePayment.storeName, storePayment.paymentAmount)}>
                          入金
                        </button>
                      }
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
          <PayConfirmationModal isVisible={isPayConfirmModalVisible} storeName={selectedStoreName} payAmount={selectedPayAmount} onConfirm={handleConfirmPay} onCancel={handleCancel} />
        </div>
      </div>
    </AuthWrapper>
  )
}

export default StorePayment;