// app/user/auth/registerPasword.tsx

'use client';

import React, { useState } from 'react';

interface RegisterPasswordInterface {
  userPassword: string;
  isOpen: boolean;
  onPasswordChange: (newPassword: string) => void;
}

const RegisterPassword: React.FC<RegisterPasswordInterface> = ({ userPassword, isOpen, onPasswordChange }) => {
  const [password, setPassword] = useState(userPassword);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const minLength = 6;
  const maxLength = 20;

  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';

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
    if (newPassword.length < minLength) {
      return `パスワードは${minLength}文字以上でなければなりません。`;
    } else if (newPassword.length > maxLength) {
      return `パスワードは${maxLength}文字を超えることはできません。`;
    } else if (!/[A-Z]/.test(newPassword)) {
      return 'パスワードには少なくとも 1 つの大文字が含まれている必要があります。';
    } else if (!/[a-z]/.test(newPassword)) {
      return 'パスワードには少なくとも 1 つの小文字が含まれている必要があります。';
    } else if (!/[0-9]/.test(newPassword)) {
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
    <div className="flex items-start justify-center min-h-screen w-screen bg-white">
      <div className="h-32 md:h-48 w-full bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]">
      <div className="bg-white rounded-3xl shadow-xl px-6 md:px-12 mx-8 md:mx-20 mt-12 md:mt-20 pb-12 md:pb-20">
        <h2 className="text-xl md:text-3xl font-bold pt-12 md:pt-20 px-12 text-center">パスワードを</h2>
        <h2 className="text-xl md:text-3xl font-bold pb-12 md:pb-20 px-12 text-center">登録してください</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-md md:text-xl font-bold">
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 md:px-8 md:py-4 border border-gray-700 rounded-lg text-center"
              placeholder="パスワード"
              required
            />
            {passwordError && <p className="text-red-500 mt-2">{passwordError}</p>}
          </div>
          <div className="mb-4 text-md md:text-xl font-bold">
            <input
              type="password"
              className="w-full px-3 py-2 md:px-8 md:py-4 border border-gray-700 rounded-lg text-center"
              placeholder="パスワード(確認用)"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            {confirmError && <p className="text-red-500 mt-2">{confirmError}</p>}
          </div>
          <div className='flex justify-center'>
            <button type="submit" className={`mt-10 w-24 ${maleGradient} text-white py-2 rounded-full`}>➔</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default RegisterPassword;
