// components/admin/dashboard/StoreEditModal.tsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { formatDate } from '@/utils/formatDate';
import SaveConfirmModal from '@/components/utils/SaveConfirmModal';

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

interface IStoreEdit {
  store: Store | null;
  isOpen: boolean;
  onClose: () => void;
  onStoreStatusChanged: (storeEmail: string | undefined, status: string) => void;
}

const StoreEditModal: React.FC<IStoreEdit> = ({ store, isOpen, onClose, onStoreStatusChanged }) => {
  const [selectedStatus, setSelectedStatus] = useState<'active' | 'inactive'>('active');
  const [isSaveConfirmModal, setIsSaveConfirmModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleConfirmSave = () => {
    const ChangeStoreStatus = async () => {
      const response = await fetch(`/api/stores/changeStatus`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: store?.email, status: selectedStatus }),
      });
  
      if (response.status === 200) {
        const result = await response.json();
        setIsSaveConfirmModal(false);
        onClose();
        onStoreStatusChanged(store?.email, selectedStatus);
        toast.success('ストアのステータスが正常に変更されました!', {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          bodyClassName: 'text-xs sm:text-sm',
        });
      } else {
        console.log(response.status);
        console.log("Change store status failed.");
        setIsSaveConfirmModal(false); 
        onClose();
      }
    };

    ChangeStoreStatus();
  };

  useEffect(() => {
    if (store?.status === 'active') {
      setSelectedStatus('active');
    } else {
      setSelectedStatus('inactive');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-gray-800">
      <div ref={modalRef} className="bg-white p-6 rounded shadow-md w-full max-w-xl">
        <h3 className="text-2xl font-bold mb-4">ユーザー認証</h3>
        <div className='flex flex-row'>
          <div className='w-2/5 text-lg'>店舗ID</div>
          <div className='w-3/5 text-lg'>{store?.storeID}</div>
        </div>
        <div className='flex flex-row'>
          <div className='w-2/5 text-lg'>メール</div>
          <div className='w-3/5 text-lg'>{store?.email}</div>
        </div>
        <div className='flex flex-row'>
          <div className='w-2/5 text-lg'>店名</div>
          <div className='w-3/5 text-lg'>{store?.storeName}</div>
        </div>
        <div className='flex flex-row'>
          <div className='w-2/5 text-lg'>店舗住所</div>
          <div className='w-3/5 text-lg'>{store?.address}</div>
        </div>
        <div className='flex flex-row'>
          <div className='w-2/5 text-lg'>店舗ジャンル</div>
          <div className='w-3/5 text-lg'>{store?.storeGenre}</div>
        </div>
        <div className='flex flex-row'>
          <div className='w-2/5 text-lg'>食べ物のジャンル</div>
          <div className='w-3/5 text-lg'>{store?.foodGenre}</div>
        </div>
        <div className='flex flex-row'>
          <div className='w-2/5 text-lg'>料理ジャンル</div>
          <div className='w-3/5 text-lg'>{store?.cookingGenre}</div>
        </div>
        <div className='flex flex-row'>
          <div className='w-2/5 text-lg'>店舗イメージ</div>
          <div className='w-3/5 text-lg'>
            <img src={`${store?.storeImages[0]}`} alt='アバター' width={60} height={60} />
          </div>
        </div>
        <div className='flex flex-row py-8'>
          <div className='w-2/5 text-lg'>状態</div>
          <div className='flex space-x-4'>
            <button
              onClick={() => setSelectedStatus('active')}
              className={`${
                selectedStatus === 'active'
                  ? 'bg-[#26B636] opacity-80 text-white'
                  : 'text-zinc-850'
              } p-2 font-semibold focus:outline-none duration-300 rounded-lg text-sm`}
            >
              アクティブ
            </button>
            <button
              onClick={() => setSelectedStatus('inactive')}
              className={`${
                selectedStatus === 'inactive'
                  ? 'bg-[#825FD2] opacity-80 text-white'
                  : 'text-zinc-850'
              } p-2 font-semibold focus:outline-none duration-300 rounded-lg text-sm`}
            >
              非アクティブ
            </button>
          </div>
        </div>
        <div className='flex flex-row-reverse mt-6'>
          <button type='button' className='rounded-md px-4 py-1 bg-gray-400 hover:bg-gray-500 text-white font-bold text-md duration-300' onClick={onClose}>キャンセル</button>
          <button type='button' className='rounded-md px-10 py-1 mx-6 bg-blue-500 hover:bg-blue-600 text-white font-bold text-md duration-300' onClick={() => setIsSaveConfirmModal(true)}>保存</button>
        </div>
      </div>
      <SaveConfirmModal isVisible={isSaveConfirmModal} onConfirm={handleConfirmSave} onCancel={() => setIsSaveConfirmModal(false)} />
    </div>
  )
}

export default StoreEditModal;