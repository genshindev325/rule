// components/admin/dashboard/memberStoreList.tsx

'use client';

import React, { useState } from 'react';

import DeleteConfirmationModal from '@/components/utils/deleteConfirmModal';
import { formatDateTime } from '@/utils/datetime';
import { formatNumber } from '@/utils/formatNumber';
import { toast } from 'react-toastify';
import StoreEditModal from '@/components/admin/dashboard/StoreEditModal';

interface Store {
  _id: string,
  email: string;
  storeID: string;
  storeName: string;
  storeGenre: string;
  foodGenre: string;
  cookingGenre: string;
  address: string;
  access: [string];
  storeImages: [string];
  description: string;
  monthlyRate: number;
  status: string;
  createdAt: Date;
}

interface StoresProps {
  stores: Store[],
}

const MemberStoreList: React.FC<StoresProps> = ({ stores: initialStores }) => {
  const [stores, setStores] = useState<Store[]>(initialStores);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [isDeleteConfirmModalVisible, setDeleteConfirmModalVisible] = useState(false);
  const [isStoreEditModal, setIsStoreEditModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  // Delete memberStore logic
  const handleDelete = (rowId: string) => {
    setSelectedRowId(rowId);
    setDeleteConfirmModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedRowId !== null) {
      toast.info('しばらくお待ちください。', {
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        bodyClassName: 'text-xs sm:text-sm',
      });
      const response = await fetch(`/api/stores/${selectedRowId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.status === 200) {
        const result = await response.json();
        console.log(result.message);
        toast.success('ストアは正常に削除されました。', {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          bodyClassName: 'text-xs sm:text-sm',
        });
        // Filter out the deleted store from the state
        setStores(prevStores => prevStores.filter(store => store._id !== selectedRowId));

        // Optionally, reset to the first page if the last item on the current page is deleted
        if ((currentPage - 1) * itemsPerPage >= stores.length - 1) {
          setCurrentPage(prev => Math.max(prev - 1, 1));
        }
      } else {
        console.log(response.status);
        toast.error('管理者にお問い合わせください。', {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          bodyClassName: 'text-xs sm:text-sm',
        });
      }
      setSelectedRowId(null);
    }
    setDeleteConfirmModalVisible(false);
  };

  const handleCancel = () => {
    setDeleteConfirmModalVisible(false);
  };

  // Edit memberStore logic
  const handleEdit = (store: Store) => {
    setSelectedStore(store);
    setIsStoreEditModal(true);
  };

  const handleChangeStoreStatus = (storeEmail: string | undefined, status: string) => {
    if (!storeEmail) return;

    setStores((prevStoreList) =>
      prevStoreList.map((store) =>
        store.email === storeEmail ? { ...store, status: status } : store
      )
    );
  };

  const filteredStores = stores.filter(store =>
    store.storeName && store.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.storeID.includes(searchTerm)
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
      <div className="w-full mb-4 flex justify-start gap-8 bg-white shadow-md rounded-md p-4 text-gray-800">
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
            {paginatedStores.map((store) => (
              <tr key={store._id}>
                <td className="py-2 text-left">{store.storeID}</td>
                <td className="py-2 px-4 text-left">{store.storeName? store.storeName : "NOT SET"}</td>
                <td className="py-2 px-4 text-left">{formatNumber(store.monthlyRate)}</td>
                <td className="py-2 px-4 text-left">{formatDateTime(store.createdAt.toString())}</td>
                <td className="py-2 px-4 text-left">
                  <div className="flex space-x-2 justify-start">
                    <button className="text-blue-600" onClick={() => handleEdit(store)}>設定</button>
                    <button className="text-red-600" onClick={() => handleDelete(store._id)}>削除</button>
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
      <StoreEditModal isOpen={isStoreEditModal} store={selectedStore} onClose={() => setIsStoreEditModal(false)} onStoreStatusChanged={handleChangeStoreStatus} />
    </div>
  );
};

export default MemberStoreList;
