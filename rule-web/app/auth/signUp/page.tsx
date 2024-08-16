// pages/signUp.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const router = useRouter();

  const handleSubmit = (async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add sign-up logic here
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const username = formData.get('username');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    const response = await fetch('/api/auth/signUp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password }),
    });

    if (response.status === 200) {
      router.push('/store/dashboard');
    } else {
      console.log(response.status);
      console.log("Failed.");
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">サインアップ</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name='email'
              className="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="メール"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name='username'
              className="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="ユーザー名"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name='password'
              className="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="パスワード"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name='confirmPassword'
              className="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="パスワードの確認"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-10 py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:border-blue-300"
          >
            サインアップ
          </button>
          <div className='my-6 text-right'>
            <a href='/auth/signIn' className='text-sm text-blue-300 hover:text-blue-500 hover:cursor-pointer font-bold'>
              すでにアカウントを持っています
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
