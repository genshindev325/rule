// components/admin/dashboard/UserEditModal.tsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { formatDate } from '@/utils/formatDate';
import { calculateAge } from '@/utils/calculateAge';
import SaveConfirmModal from '@/components/utils/SaveConfirmModal';

interface User {
  _id: string,
  email: string;
  userID: string;
  nickname: string;
  gender: string;
  birthday: Date;
  avatar: string;
  verification: string;
  phoneNumber: string;
  status: string;
  createdAt: string;
  creditCard: string;
}

interface IUserEdit {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onUserStatusChanged: (userEmail: string | undefined, status: string) => void;
}

const UserEditModal: React.FC<IUserEdit> = ({ user, isOpen, onClose, onUserStatusChanged }) => {
  const [selectedStatus, setSelectedStatus] = useState<'active' | 'inactive'>('active');
  const [isSaveConfirmModal, setIsSaveConfirmModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const age = user?.birthday ? calculateAge(user.birthday.toString()) : null;

  const handleConfirmSave = () => {
    const ChangeUserStatus = async () => {
      const response = await fetch(`/api/users/changeStatus`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user?.email, status: selectedStatus }),
      });
  
      if (response.status === 200) {
        const result = await response.json();
        setIsSaveConfirmModal(false);
        onClose();
        onUserStatusChanged(user?.email, selectedStatus);
        toast.success('ユーザーステータスが正常に変更されました!', {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          bodyClassName: 'text-xs sm:text-sm',
        });
      } else {
        console.log(response.status);
        console.log("Change user status failed.");
        setIsSaveConfirmModal(false); 
        onClose();
      }
    };

    ChangeUserStatus();
  };

  useEffect(() => {
    if (user?.status === 'active') {
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
          <div className='w-1/4 text-md font-semibold'>ユーザーID</div>
          <div className='w-3/4 text-md'>{user?.userID}</div>
        </div>
        <div className='flex flex-row'>
          <div className='w-1/4 text-md font-semibold'>メール</div>
          <div className='w-3/4 text-md'>{user?.email}</div>
        </div>
        <div className='flex flex-row'>
          <div className='w-1/4 text-md font-semibold'>ニックネーム</div>
          <div className='w-3/4 text-md'>{user?.nickname}</div>
        </div>
        <div className='flex flex-row'>
          <div className='w-1/4 text-md font-semibold'>性別</div>
          <div className='w-3/4 text-md'>{user?.gender === 'male' ? '男' : '女'}</div>
        </div>
        <div className='flex flex-row'>
          <div className='w-1/4 text-md font-semibold'>年齢</div>
          <div className='w-3/4 text-md'>{age}</div>
        </div>
        <div className='flex flex-row'>
          <div className='w-1/4 text-md font-semibold'>作成日</div>
          <div className='w-3/4 text-md'>{user?.createdAt && formatDate(user.createdAt.toString())}</div>
        </div>
        <div className='flex flex-row'>
          <div className='w-1/4 text-md font-semibold'>アバター</div>
          <div className='w-3/4 text-md'>
            <img src={`${user?.avatar}`} alt='アバター' width={60} height={60} />
          </div>
        </div>
        <div className='flex flex-row'>
          <div className='w-1/4 text-md font-semibold'>身分証明書</div>
          <div className='w-3/4 text-md'>
            <img src={`${user?.verification}`} alt='アバター' width={200} height={200} />
          </div>
        </div>
        <div className='flex flex-row py-8'>
          <div className='w-1/4 text-md font-semibold'>状態</div>
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
        <div className='flex flex-row-reverse'>
          <button type='button' className='rounded-md px-4 py-1 bg-gray-400 hover:bg-gray-500 text-white font-bold text-md duration-300' onClick={onClose}>キャンセル</button>
          <button type='button' className='rounded-md px-10 py-1 mx-6 bg-blue-500 hover:bg-blue-600 text-white font-bold text-md duration-300' onClick={() => setIsSaveConfirmModal(true)}>保存</button>
        </div>
      </div>
      <SaveConfirmModal isVisible={isSaveConfirmModal} onConfirm={handleConfirmSave} onCancel={() => setIsSaveConfirmModal(false)} />
    </div>
  )
}

export default UserEditModal;