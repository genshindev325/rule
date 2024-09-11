// components/utils/PasswordInput.tsx

import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface PasswordInputProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      {label && <label className="block text-gray-700">{label}</label>}
      <input
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        className="w-full px-3 border-none focus:outline-none"
      />
      <div
        className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </div>
    </div>
  );
};

export default PasswordInput;
