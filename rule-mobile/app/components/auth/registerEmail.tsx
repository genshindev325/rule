// app/user/auth/registerEmail.tsx

'use client';

import React, { useState } from 'react';
import { IonRouterLink } from '@ionic/react';

interface RegisterEmailInterface {
  userEmail: string;
  isOpen: boolean;
  onEmailChange: (newEmail: string) => void;
}

const RegisterEmail: React.FC<RegisterEmailInterface> = ({ isOpen, userEmail, onEmailChange }) => {
  const [email, setEmail] = useState(userEmail);
  const [confirmEmail, setConfirmEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const textXs = 'text-xs sm:text-sm md:text-base';
  const textSm = 'text-sm md:text-base font-semibold';
  const textMd = 'text-base sm:text-lg md:text-xl';
  const input = 'text-xs sm:text-sm md:text-base text-left placeholder:text-center w-full px-3 sm:px-4 md:px-6 py-2 sm:py-4 border border-gray-700 rounded-md focus:outline-none';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle the form submission
    if (email !== confirmEmail) {
      setConfirmError('メールアドレスが一致しません。');
    } else {
      setConfirmError('');
      onEmailChange(email);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    userEmail = newEmail;

    if (newEmail && !validateEmail(newEmail)) {
      setEmailError('有効なメールアドレスを入力してください。');
    } else {
      setEmailError('');
    }
  };

  const handleConfirmEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmEmail = e.target.value;
    setConfirmEmail(newConfirmEmail);

    if (newConfirmEmail && newConfirmEmail !== email) {
      setConfirmError('メールアドレスが一致しません。');
    } else {
      setConfirmError('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="flex items-start justify-center min-h-screen w-screen bg-white text-gray-800">
      <div className="h-40 sm:h-44 w-full bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]">
      <div className="bg-white rounded-2xl shadow-xl px-6 md:px-12 mx-5 sm:mx-6 md:mx-8 mt-12 sm:mt-14 md:mt-16 pb-12 md:pb-20">
        <h2 className={`${textMd} font-bold pt-8 sm:pt-10 text-center`}>メールアドレスを</h2>
        <h2 className={`${textMd} font-bold pb-8 sm:pb-10 text-center`}>登録してください</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className={`${input}`}
              placeholder="メールアドレス"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && <p className={`text-red-500 ${textXs} mt-2`}>{emailError}</p>}
          </div>
          <div className="mb-4">
            <input
              type="text"
              className={`${input}`}
              placeholder="メールアドレス(確認用)"
              value={confirmEmail}
              onChange={handleConfirmEmailChange}
              required
            />
            {confirmError && <p className={`text-red-500 ${textXs} mt-2`}>{confirmError}</p>}
          </div>
          <div className='flex justify-center'>
            {/* ➔ */}
            <button type="submit" className={`mt-10 w-24 ${maleGradient} ${textSm} text-white py-2 rounded-full focus:outline-none`}>次に</button>
          </div>
          <div className={`text-center ${textXs} pt-6`}>
            <IonRouterLink routerLink='/auth/login' className='text-gray-500 font-semibold'>
              すでにアカウントを持っています
            </IonRouterLink>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default RegisterEmail;
