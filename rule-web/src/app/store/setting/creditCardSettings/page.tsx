// app/store/setting/creditCardSettings/page.tsx

'use client';

import React from 'react';

import AuthWrapper from '@/components/auth/authWrapper';
import Navbar from '@/components/store/navbar';
import StripePaymentElement from '@/components/store/stripePaymentElement';

const CreditCardSettings: React.FC = () => {
  return (
    <AuthWrapper allowedRoles={['store']}>
      <div className="min-h-screen min-w-full flex bg-gray-100 text-sm text-gray-800">
        <div className="w-24">
          <Navbar />
        </div>
        <div className='w-auto mx-auto'>
          <div className="flex items-start py-20 justify-center bg-gray-100">
            <div className="bg-white p-4 rounded-lg shadow-md w-96 max-w-4xl">
              <StripePaymentElement />
            </div>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default CreditCardSettings;
