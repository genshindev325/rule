// pages/signin.tsx
'use client';

import React, { useState } from 'react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add sign-in logic here
    console.log('Email:', email);
    console.log('Password:', password);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Sign in</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              className="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="email address"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="password"
            />
          </div>
          <div className="mb-8 text-left">
            <a href="#" className="text-sm text-gray-400 hover:underline">
              Did you forget your password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:border-blue-300"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
