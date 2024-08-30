// pages/signin.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../components/auth/authContext';

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
      
      // const userName = result.userName;
      // const userEmail = result.userEmail;
      // const userRole = result.userRole;
      // const token = result.token;
      if (role === 'admin') {
        // signin(userName, userEmail, userRole, token);
        router.push('/admin/dashboard');
      } else if (role === 'store') {
        // signin(userName, userEmail, userRole, token);
        router.push('/store/dashboard');
      } else {
        // Add user logic here
      }
    } else {
      console.log(response.status);
      console.log("Your username and password mismatched.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
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
  );
};

export default SignIn;
