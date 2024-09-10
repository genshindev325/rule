// components/event/registeredCard.tsx

import React from 'react';

interface RegisterCardInterface {
  last4: string;
  setDeleteConfirmModalVisible: () => void;
  exDate: string;
}

const RegisteredCard: React.FC<RegisterCardInterface> = ({ last4, exDate, setDeleteConfirmModalVisible }) => {
  const visaSVG = "/svg/visa.svg";

  return (
    <div className='px-4 sm:px-6 md:px-8 bg-gray-100 pb-4'>
      <label className="block font-bold text-gray-800 pt-4">登録済みカード</label>
      <div className="mt-4 bg-white rounded-md">
        <div className="flex flex-col p-4">
          <h4 className="text-md md:text-lg text-left font-semibold">{`****_****_****_${last4}`}</h4>
          <img src={`${visaSVG}`} alt="Visa" className="h-12 md:h-16 mr-auto" />
          <h4 className="text-md md:text-lg text-left font-semibold">{exDate}</h4>
          <div className='text-right'>
            <button onClick={setDeleteConfirmModalVisible} type='button'
              className='rounded-full bg-[#ff9c9c] text-md md:text-lg font-semibold text-center px-6 md:px-10'>
              削除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisteredCard;
