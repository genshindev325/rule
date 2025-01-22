// /app/components/user/event/recentEvents.tsx

'use client'

import React, { useEffect, useRef } from 'react';

interface IEventCancelModal {
  isOpen: boolean;
  onClose: () => void;
  onConfirmCancel: () => void;
}

const EventCancelModal: React.FC<IEventCancelModal> = ({ isOpen, onClose, onConfirmCancel }) => {
  useEffect(() => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.setAttribute('inert', isOpen ? 'true' : 'false');
    }
    return () => {
      if (mainContent) mainContent.removeAttribute('inert');
    };
  }, [isOpen]);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 z-50">
      <div ref={modalRef} className="relative flex flex-col items-center bg-white text-gray-800 p-8 rounded-2xl rounded-tr-none w-[75vw] min-h-[40vh] max-w-2xl mx-4 sm:mx-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-1 -right-1 w-6 h-6 flex items-center justify-center rounded-full bg-gray-400 hover:bg-red-400 text-white font-semibold transition duration-300"
          aria-label="Close"
        >
          ✕
        </button>
        <h2 className='text-lg font-bold text-[#fb298e]'>キャンセル前に</h2>
        <h2 className='text-lg font-bold text-[#fb298e] pb-4'>お読みください</h2>
        <h2 className='text-xs text-zinc-700 mr-auto pb-2'>・開催日3日前のキャンセルは返金できません。</h2>
        <h2 className='text-xs text-zinc-700 mr-auto pb-2'>・キャンセルした場合、再度同じイベントに参加 するには空き状況によります。</h2>
        <h2 className='text-xs text-zinc-700 mr-auto pb-2'>・参加人数の調整が必要になるため、他の参加者 に影響を与える場合があります。</h2>
        <h2 className='text-xs text-zinc-700 mr-auto pb-2'>・キャンセルが確定したら元には戻りません。</h2>
        <h2 className='text-xs text-zinc-700 py-4'>本当にキャンセルしてもよろしいですか?</h2>
        <button onClick={() => onConfirmCancel()} className='w-full p-1 my-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#fb298e] to-[#ff9dc7]'>参加をキャンセルする</button>
      </div>
    </div>
  )
}

export default EventCancelModal;