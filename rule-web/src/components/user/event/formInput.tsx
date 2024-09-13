// components/event/formInput.tsx

import React, { useState } from 'react';

const FormInput: React.FC = () => {

  const americanExpressSVG = "/svg/american_express.svg";
  const jcbSVG = "/svg/jcb.svg";
  const masterCardSVG = "/svg/mastercard.svg";
  const visaSVG = "/svg/visa.svg";

  return (
    <div className='px-4 md:px-8 bg-gray-100 pb-8 text-gray-800'>
      <label className="block font-bold text-gray-800 pt-8">カード登録</label>
      <div className="mt-4 bg-white rounded-md">
        <h4 className="text-md text-center font-semibold py-2">対応ブランド</h4>
        <div className="flex justify-around pb-4">
          <img src={`${visaSVG}`} alt="Visa" className="h-12" />
          <img src={`${masterCardSVG}`} alt="MasterCard" className="h-12" />
          <img src={`${jcbSVG}`} alt="JCB" className="h-12" />
          <img src={`${americanExpressSVG}`} alt="American Express" className="h-12" />
        </div>
      </div>
      <div className="mt-4">
        <label className="block font-bold text-gray-800">カード番号</label>
        <input type="text" className="w-full px-3 py-2 border rounded-md" placeholder="カード番号" />
      </div>
      <div className="mt-4">
        <label className="block font-bold text-gray-800">カード名義</label>
        <input type="text" className="w-full px-3 py-2 border rounded-md" placeholder="カード番号" />
      </div>
      <div className="mt-4">
        <label className="block font-bold text-gray-600">有効期限</label>
        <input type="text" className="w-full px-3 py-2 border rounded-md" placeholder="有効期限" />
      </div>
      <div className="mt-4">
        <label className="block font-bold text-gray-600">セキュリティコード</label>
        <input type="text" className="w-full px-3 py-2 border rounded-md" placeholder="セキュリティコード" />
      </div>
    </div>
  );
};

export default FormInput;
