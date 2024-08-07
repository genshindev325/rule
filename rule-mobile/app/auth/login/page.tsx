// app/auth/login/page.tsx

'use client';

import React, { useState } from 'react';

const Login: React.FC = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission
    console.log(emailAddress);
  };

  return (
    <div className="flex items-start justify-center min-h-screen w-screen bg-white">
      <div className="h-32 md:h-48 w-full bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]">
      <div className="bg-white rounded-3xl shadow-xl px-6 md:px-12 mx-8 md:mx-20 mt-12 md:mt-20">
        <h2 className="text-3xl font-bold py-12 md:py-20 px-12 text-center">ログイン</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="w-full px-3 py-2 md:px-8 md:py-4 border border-gray-700 rounded-lg"
              placeholder="メールアドレス"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="w-full px-3 py-2 md:px-8 md:py-4 border border-gray-700 rounded-lg"
              placeholder="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="text-md md:text-lg text-right font-semibold text-gray-400">
            パスワードをお忘れですか？
          </p>
          <button
            type="submit"
            className="w-full py-2 md:py-4 px-4 mb-16 md:mb-24 mt-16 md:mt-32 bg-gradient-to-r from-[#7c5ded] to-[#83d5f7] text-white rounded-full font-bold"
          >
            サインイン
          </button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Login;
