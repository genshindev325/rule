// app/user/auth/registerPasword.tsx

'use client';

import React, { useState } from 'react';

interface RegisterPasswordInterface {
  userPassword: string;
  isOpen: boolean;
  onPasswordChange: (newPassword: string) => void;
  onCancel: () => void;
}

const RegisterPassword: React.FC<RegisterPasswordInterface> = ({ userPassword, isOpen, onPasswordChange, onCancel }) => {
  const [password, setPassword] = useState(userPassword);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const minLength = 6;
  const maxLength = 20;

  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const textXs = 'text-xs sm:text-sm md:text-base';
  const textSm = 'text-sm md:text-base font-semibold';
  const input = 'text-xs sm:text-sm md:text-base text-left placeholder:text-center w-full px-3 sm:px-4 md:px-6 py-2 sm:py-4 border border-gray-700 rounded-md focus:outline-none';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission
    if (confirmPassword !== password) {
      setConfirmError('パスワードが一致しません。');
    } else {
      setConfirmError('');
      onPasswordChange(password);
    }
  };

  const validatePassword = (newPassword: string) => {
    if (newPassword && newPassword.length < minLength) {
      return `パスワードは${minLength}文字以上でなければなりません。`;
    } else if (newPassword && newPassword.length > maxLength) {
      return `パスワードは${maxLength}文字を超えることはできません。`;
    } else if (newPassword && !/[A-Z]/.test(newPassword)) {
      return 'パスワードには少なくとも 1 つの大文字が含まれている必要があります。';
    } else if (newPassword && !/[a-z]/.test(newPassword)) {
      return 'パスワードには少なくとも 1 つの小文字が含まれている必要があります。';
    } else if (newPassword && !/[0-9]/.test(newPassword)) {
      return 'パスワードには少なくとも 1 つの数字を含める必要があります。';
    // } else if (!/[!@#$%^&*]/.test(newPassword)) {
    //   return 'パスワードには少なくとも1つの特殊文字を含める必要があります (!@#$%^&*).';
    } else {
      return '';
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(validatePassword(newPassword));

    if (confirmPassword && newPassword !== confirmPassword) {
      setConfirmError('パスワードが一致しません。');
    } else {
      setConfirmError('');
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (newConfirmPassword !== password) {
      setConfirmError('パスワードが一致しません。');
    } else {
      setConfirmError('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="flex items-start justify-center min-h-screen w-screen bg-white text-gray-800">
      <div className="h-40 sm:h-44 w-full bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]">
      <div className="bg-white rounded-2xl shadow-xl px-4 sm:px-6 md:px-8 mx-5 sm:mx-6 md:mx-8 mt-16 sm:mt-20 md:mt-24 pb-12 md:pb-14">
        <h2 className="text-base sm:text-lg md:text-xl font-bold pt-8 sm:pt-10 text-center">パスワードを</h2>
        <h2 className="text-base sm:text-lg md:text-xl font-bold pb-8 sm:pb-10 text-center">登録してください</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className={`${input}`}
              placeholder="パスワード"
              required
            />
            {passwordError && <p className={`text-red-500 ${textXs} mt-2`}>{passwordError}</p>}
          </div>
          <div className="mb-4">
            <input
              type="password"
              className={`${input}`}
              placeholder="パスワード(確認用)"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            {confirmError && <p className={`text-red-500 ${textXs} mt-2`}>{confirmError}</p>}
          </div>
          <div className='flex justify-center space-x-4'>
            <button type="button" className={`mt-10 w-24 ${maleGradient} ${textSm} text-white py-2 rounded-full focus:outline-none`} onClick={onCancel}>前の</button>
            <button type="submit" className={`mt-10 w-24 ${maleGradient} ${textSm} text-white py-2 rounded-full focus:outline-none`}>次に</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default RegisterPassword;
