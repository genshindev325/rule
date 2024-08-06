// components/setting/creditCardSettings.tsx
'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navbar';

const CreditCardSettins = () => {
  const [registeredCard, setRegisteredCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [dateOfExpiry, setDateOfExpiry] = useState('');
  const [securityCode, setSecurityCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add CreditCardSettins logic here
  }

  return (
    <div className="min-h-screen min-w-full flex bg-gray-100">
      <div className="w-20 bg-gray-800">
        <Navbar />
      </div>
      <div className='w-auto mx-auto'>
        <div className="flex items-start py-20 justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Store profile settings</h2>
            <form onSubmit={handleSubmit}>
              <h3 className='text-gray-600 py-2'>registerd card</h3>
              <div className="mb-4 w-full px-6 py-6 gap-16 bg-gray-100 rounded-md flex flex-col">
                <div className='flex flex-row'>
                  <h3 className='text-black text-xl'>****_****_****_4224</h3>
                </div>
                <div className='flex flex-row-reverse'>
                  <button type="button" className="w-20 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    delete
                  </button>
                </div>
              </div>
              {/* Card registration */}
              <h3 className='text-gray-600 py-4'>Card registration</h3>
              <h3 className='text-gray-600 py-2'>Card number</h3>
              <div className="mb-4">
                <input
                  type="name"
                  className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="card number"
                />
              </div>
              <h3 className='text-gray-600 py-2'>Card holder name</h3>
              <div className="mb-4">
                <input
                  type="name"
                  className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="Card holder name"
                />
              </div>
              <h3 className='text-gray-600 py-2'>date of expiry</h3>
              <div className="mb-4">
                <input
                  type="name"
                  className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="date of expiry"
                />
              </div>
              <h3 className='text-gray-600 py-2'>security code</h3>
              <div className="mb-4">
                <input
                  type="name"
                  className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="security code"
                />
              </div>
              {/* buttons */}
              <div className='flex flex-row justify-end gap-4 pt-12'>
                <button type="submit" className="w-48 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  keep
                </button>
                <button type="button" className="w-48 py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400">
                  cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardSettins;
