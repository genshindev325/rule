// components/event/registeredCard.tsx

import React from 'react';

interface RegisterCardInterface {
  last4: string;
  setDeleteConfirmModalVisible: () => void;
  exDate: string;
  cardSVG: string;
}

const RegisteredCard: React.FC<RegisterCardInterface> = ({ last4, cardSVG, exDate, setDeleteConfirmModalVisible }) => {
  const textXs = 'text-xs sm:text-sm';
  const textSm = 'text-sm sm:text-base';

  return (
    <div className='bg-gray-100 pb-4 text-gray-800'>
      <label className={`${textSm} block font-semibold text-gray-800 pt-2`}>登録済みカード</label>
      <div className="mt-4 bg-white rounded-md">
        <div className="flex flex-col p-2">
          <h4 className={`${textXs} text-left font-semibold`}>{`****_****_****_${last4}`}</h4>
          <img src={`${cardSVG}`} alt="Visa" className="h-10 sm:h-12 mr-auto" />
          <h4 className={`${textXs} text-left font-semibold`}>{exDate}</h4>
          <div className='text-right'>
            <button onClick={setDeleteConfirmModalVisible} type='button'
              className={`rounded-full bg-[#ff9c9c] ${textSm} font-semibold text-center px-6 sm:px-8`}>
              削除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisteredCard;
