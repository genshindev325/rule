// app/user/auth/registerEmail.tsx

'use client';

import React, { useState } from 'react';

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle the form submission
    onEmailChange(email);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    userEmail = newEmail;

    if (!validateEmail(newEmail)) {
      setEmailError('有効なメールアドレスを入力してください。');
    } else {
      setEmailError('');
    }
  };

  const handleConfirmEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmEmail = e.target.value;
    setConfirmEmail(newConfirmEmail);

    if (newConfirmEmail !== email) {
      setConfirmError('メールアドレスが一致しません。');
    } else {
      setConfirmError('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="flex items-start justify-center min-h-screen w-screen bg-white">
      <div className="h-32 md:h-48 w-full bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]">
      <div className="bg-white rounded-3xl shadow-xl px-6 md:px-12 mx-8 md:mx-20 mt-12 md:mt-20 pb-12 md:pb-20">
        <h2 className="text-xl md:text-3xl font-bold pt-12 md:pt-20 px-12 text-center">メールアドレスを</h2>
        <h2 className="text-xl md:text-3xl font-bold pb-12 md:pb-20 px-12 text-center">登録してください</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-md md:text-xl font-bold">
            <input
              type="text"
              className="w-full px-3 py-2 md:px-8 md:py-4 border border-gray-700 rounded-lg text-center focus:outline-none"
              placeholder="メールアドレス"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && <p className="text-red-500 mt-2">{emailError}</p>}
          </div>
          <div className="mb-4 text-md md:text-xl font-bold">
            <input
              type="text"
              className="w-full px-3 py-2 md:px-8 md:py-4 border border-gray-700 rounded-lg text-center focus:outline-none"
              placeholder="メールアドレス(確認用)"
              value={confirmEmail}
              onChange={handleConfirmEmailChange}
              required
            />
            {confirmError && <p className="text-red-500 mt-2">{confirmError}</p>}
          </div>
          <div className='flex justify-center'>
            <button type="submit" className={`mt-10 w-24 ${maleGradient} text-white py-2 rounded-full focus:outline-none`}>➔</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default RegisterEmail;
