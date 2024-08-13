// app/user/auth/passwordReset.tsx

'use client';

import React, { useState } from 'react';

const PasswordReset: React.FC = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission
    console.log(password);
  };

  return (
    <div className="flex items-start justify-center min-h-screen w-screen bg-white">
      <div className="h-32 md:h-48 w-full bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]">
      <div className="bg-white rounded-3xl shadow-xl px-6 md:px-12 mx-8 md:mx-20 mt-12 md:mt-20">
        <h2 className="text-xl md:text-3xl font-bold pt-12 md:pt-20 px-12 text-center">パスワードを</h2>
        <h2 className="text-xl md:text-3xl font-bold pb-12 md:pb-20 px-12 text-center">再設定してください</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="w-full px-3 py-2 md:px-8 md:py-4 border border-gray-700 rounded-lg"
              placeholder="メールアド"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="w-full px-3 py-2 md:px-8 md:py-4 border border-gray-700 rounded-lg"
              placeholder="パスワード(確認用)"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 md:py-4 px-4 mb-16 md:mb-24 mt-16 md:mt-32 bg-gradient-to-r from-[#7c5ded] to-[#83d5f7] text-white rounded-full font-bold"
          >
            送信する
          </button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default PasswordReset;
