// app/admin/settlementSummary/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import AuthWrapper from '@/components/auth/authWrapper';
import Navbar from '@/components/admin/navbar';
import { formatDate } from '@/utils/formatDate';
import { formatNumber } from '@/utils/formatNumber';
import PayConfirmationModal from '@/components/utils/payConfirmModal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';

interface StorePayment {
  _id: string;
  storeId: string;
  storeName: string;
  paymentDate: string;
  paymentAmount: number;
  status: string;
  createdAt: Date;
}

const StorePaymentsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [storePayments, setStorePayments] = useState<StorePayment[]>([{
    _id: '12345',
    storeId: '67890',
    storeName: 'My Store',
    paymentDate: '2024-09-23',
    paymentAmount: 10000,
    status: '未払い',
    createdAt: new Date()
  }]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchStatus, setSearchStatus] = useState(''); // NEW STATE for payment status search
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [selectedStoreName, setSelectedStoreName] = useState('');
  const [selectedPayAmount, setSelectedPayAmount] = useState(0);
  const [isPayConfirmModalVisible, setPayConfirmModalVisible] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();

  // Fetch storePayments data on mount (if not passed from server-side)
  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
      } else {
      const fetchData = async () => {
        try {
          const response = await fetch('/api/admin/store-payment', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}`
            },
          });
          if (response.status === 200) {
            const result = await response.json();
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
    }
  }, []);

  if (loading) return <div className='w-screen h-screen flex items-center justify-center text-3xl font-bold'>読み込み中...</div>;

  // Handle payment action
  const handlePay = (rowId: string, storeName: string, payAmount: number) => {
    setSelectedRowId(rowId);
    setSelectedStoreName(storeName);
    setSelectedPayAmount(payAmount);
    setPayConfirmModalVisible(true);
  };

  const handleConfirmPay = async () => {
    if (selectedRowId !== null) {
      const response = await fetch(`/api/admin/store-payment/${selectedRowId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedRowId }),
      });
      if (response.status === 200) {
        const result = await response.json();
        setCurrentPage(1);
      } else {
        console.log('Payment failed.');
      }
      setSelectedRowId(null);
    }
    setPayConfirmModalVisible(false);
  };

  const handleCancel = () => {
    setPayConfirmModalVisible(false);
  };

  // Filtering based on both store name and payment status
  const filteredStores = storePayments.filter(store =>
    store.storeName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    store.status.toLowerCase().includes(searchStatus.toLowerCase())
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
          <div className="w-full mb-4 flex justify-start bg-white shadow-md rounded-md p-4">
            {/* Store name search input */}
            <div className='flex flex-col space-y-2'>
              <h2 className='text-sm md:text-md font-bold text-gray-700'>
                店名
              </h2>
              <input
                type="text"
                placeholder="選択してください"
                className="border p-2 rounded focus:outline-none bg-gray-100"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* Payment status search dropdown */}
            <div className='flex flex-col space-y-2 ml-4'>
              <h2 className='text-sm md:text-md font-bold text-gray-700'>
                決済ステータス
              </h2>
              <select
                className="border p-2 rounded focus:outline-none bg-gray-100"
                value={searchStatus} // Bind the select to searchStatus state
                onChange={(e) => setSearchStatus(e.target.value)} // Update the searchStatus state on option change
              >
                <option value=''>すべて</option>
                <option value='未払い'>未払い</option>
                <option value='支払い済'>支払い済</option>
              </select>
            </div>
            <div className="flex ml-auto items-center space-x-2">
              <span>1ページあたりの項目数:</span>
              <input type="number" value={itemsPerPage} onChange={handleItemsPerPageChange}
                className="w-10 p-2 bg-gray-100 text-center rounded no-spinner focus:outline-none" min="1" />
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
                className="w-10 p-1 border items-center text-center no-spinner rounded focus:outline-none" min="1" />
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
  );
};

export default StorePaymentsPage;
