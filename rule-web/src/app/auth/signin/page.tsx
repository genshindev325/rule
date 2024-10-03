// pages/signin.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/authContext';
import { toast } from 'react-toastify';

const SignIn = () => {
  const router = useRouter();
  const { signin } = useAuth();

  async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Add sign-in logic here
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      const result = await response.json();
      const {
        email,
        role,
        profile,
        token
      } = result.data;
      signin(email, role, profile, token);
      
      if (role === 'admin') {
        router.push('/admin/dashboard');
        sessionStorage.setItem('selectedMenu', 'dashboard');
      } else if (role === 'store') {
        router.push('/store/dashboard');
        sessionStorage.setItem('selectedMenu', 'dashboard');
      } else {
        toast.error('エラー', {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          bodyClassName: 'text-xs sm:text-sm',
        });
      }
    } else {
      console.log(response.status);
      toast.error('ユーザー名とパスワードが一致しません。', {
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        bodyClassName: 'text-xs sm:text-sm',
      });
    }
  }

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">サインイン</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                name='email'
                className="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="メールアドレス"
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
            <div className="mb-8 text-left">
              <a href="#" className="text-sm text-gray-400 hover:underline">
                パスワードをお忘れですか？
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:border-blue-300"
            >
              サインイン
            </button>
            <div className='my-6 text-center'>
              <a href='/auth/signup' className='text-sm text-blue-300 hover:text-blue-500 hover:cursor-pointer font-bold'>
                アカウントを作成する
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
