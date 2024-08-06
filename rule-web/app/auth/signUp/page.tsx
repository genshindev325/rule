// pages/signUp.tsx
'use client';

import React, { useState } from 'react';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [useremail, setUseremail] = useState('tarou@gmail.com');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add sign-in logic here
    console.log('Email:', email);
    console.log('Password:', password);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <h1 className="text-xl mb-6">{useremail}</h1>
          <div className="mb-4">
            <input
              type="text"
              className="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="username"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="password"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="confirm password"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-10 py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:border-blue-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
