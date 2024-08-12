// app/event/payment/page.tsx

'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const EventPayment: React.FC = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [dateOfExpiry, setDateOfExpiry] = useState('');
  const [cardSecurityCode, setCardSecurityCode] = useState('');

  const total = 8;
  const males = 7;
  const females = 2;
  const maleRate = males/total;
  const femaleRate = females/total;

  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const femaleGradient = 'bg-gradient-to-r from-[#fb298e] to-[#ff9dc7]';

  const americanExpressSVG = "/svg/american_express.svg";
  const jcbSVG = "/svg/jcb.svg";
  const masterCardSVG = "/svg/mastercard.svg";
  const visaSVG = "/svg/visa.svg";

  const [eventImage, setEventImage] = useState(
    '/image/img_1.png'
    // Modify image paths here from event profile
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission
    console.log(eventImage);
  };

  return (
    <div className="flex items-start justify-center min-h-screen w-screen bg-white">
      <div className={`h-32 md:h-48 w-full ${maleGradient}`}>
      {/* title on the bg-gradient */}
      <div className="py-6 md:py-12 px-4 md:px-8 flex flex-row text-xl text-white md:text-3xl font-bold text-center">
        <button type='button' className='flex bg-transparent rounded-full border-none w-12 text-white text-left items-center justify-center font-bold'>
          &lt;
        </button>
        <h2 className='grow'>イベントに参加</h2>
      </div>
      {/* event attend to participate */}
      <div className="flex flex-row space-x-2 bg-white rounded-xl shadow-xl px-2 sm:px-4 md:px-8 py-6 md:py-12 mx-8 md:mx-20 md:mt-6 mb-12 md:mb-20">
        <Image src={eventImage} alt={`event-profile`} width={100} height={70}
          className="rounded-md rounded-br-none"
        />
        <div className='flex flex-col space-y-1'>
          <h2 className="text-xs font-bold">街コン・合コン・飲み会イベント</h2>
          <h2 className="text-xs">2023年9月20日 17:00</h2>
          <div className='flex flex-row space-x-1'>
            <div className={`${maleGradient} px-1 rounded-full w-10 text-center text-xs text-white my-auto`}>男性</div>
            <h2 className='text-xs'>5000円 募集 : {males}/{total}</h2>
            <div className="w-16 md:w-28 bg-gray-300 h-2 rounded-full my-auto">
              <div 
                className={`h-2 ${maleGradient}`} 
                style={{ width: `${maleRate * 100}%` }}
              ></div>
            </div>
          </div>
          <div className='flex flex-row space-x-1'>
            <div className={`${femaleGradient} px-1 rounded-full w-10 text-center text-xs text-white my-auto`}>女性</div>
            <h2 className='text-xs'>2000円 募集 : {females}/{total}</h2>
            <div className="w-16 md:w-28 bg-gray-200 h-2 rounded-full my-auto">
              <div 
                className={`h-2 ${femaleGradient}`} 
                style={{ width: `${femaleRate * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      {/* form */}
      <div className='flex flex-col justify-center'>
        <div className="rounded-md border-2 border-solid border-gray-500 py-2 md:py-4 mx-8 md:mx-20 text-gray-800 font-bold text-center">
          支払い手続き
        </div>
        {/*  */}
        <div className='flex flex-col mx-8 md:mx-20 mt-6 md:mt-10'>
          <h3 className="text-lg text-gray-800 font-bold">クレジット決済</h3>
          <div className="flex items-center justify-between mt-2">
            <div className="text-gray-600">参加費（税込み）</div>
            <div className="text-gray-800">2,000円</div>
          </div>
          <div className="flex items-center font-bold justify-between mt-2 border-t-2 border-gray-300 pt-2 md:pt-4">
            <div className="text-gray-600">決済金額（税込み）</div>
            <div className="text-gray-800">2,000円</div>
          </div>
        </div>
        {/*  */}
        <form onSubmit={handleSubmit} className='mt-8 md:mt-16 bg-white'>
          <div className='px-4 md:px-8 bg-gray-100 pb-8'>
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
          <h2 className='text-sm sm:text-md md:text-lg text-center pt-6'>##############################</h2>
          <h2 className='text-sm sm:text-md md:text-lg text-center'>#######################################</h2>
          <div className="mt-4 flex items-center justify-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2 text-gray-600"><a href="" className='text-blue-400 font-bold'>利用規約</a>に同意する</span>
          </div>
          <div className="mt-6 justify-center flex">
            <button className={`mx-4 md:mx-8 w-full ${maleGradient} text-white py-2 rounded-full hover:bg-purple-600`}>決済する</button>
          </div>
          <div className="mt-4 pb-12 md:pb-20 flex justify-center">
            <button className="mx-4 md:mx-8 w-full bg-gray-500 text-white py-2 rounded-full bg-[#b3b3b3] hover:bg-gray-400">キャンセル</button>
          </div>
          {/*  */}
        </form>
      </div>
      </div>
    </div>
  );
};

export default EventPayment;
