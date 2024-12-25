// app/user/auth/passwordReset.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, useIonRouter } from '@ionic/react';
import { useSearchParams } from 'next/navigation';
import { SERVER_URL } from '@/app/config';
import { toast } from 'react-toastify';

const PasswordReset: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [email, setEmail] = useState('');
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const textSm = 'text-sm md:text-base font-semibold';
  const textXs = 'text-xs sm:text-sm md:text-base';
  const input = `${textXs} w-full text-left placeholder:text-center px-3 sm:px-4 md:px-6 py-2 sm:py-4 border border-gray-700 rounded-md focus:outline-none`;
  const minLength = 6;
  const maxLength = 20;
  const searchParams = useSearchParams();
  const userEmail = searchParams.get('email');

  const router = useIonRouter();

  useEffect(() => {
    if (!userEmail) {
      setConfirmError('無効なリンクです。');
    } else {
      setEmail(JSON.parse(decodeURIComponent(userEmail)));
    }
  }, [userEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission
    if (confirmPassword !== password) {
      setConfirmError('パスワードが一致しません。');
    } else if (password === '') {
      setConfirmError('新しいパスワードを入力してください。');
    } else {
      setConfirmError('');
      toast.info('少々お待ちください。', {
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        bodyClassName: 'text-xs sm:text-sm',
      });
      const response = await fetch(`${SERVER_URL}/api/stores/forgot-pwd`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, newPassword: password }),
      });
      if (response.status === 200) {
        toast.success('パスワードのリセットに成功しました。', {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          bodyClassName: 'text-xs sm:text-sm',
        });
        router.push('/auth/signin');
      } else {
        console.log(response.status);
        console.log("Password setting failed.");
      }
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
  

  return (
    <IonPage>
      <IonContent>
        <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-white text-gray-800 p-6 space-y-4">
          <h2 className="text-lg font-bold pb-4">パスワードを再設定してください</h2>
          <form onSubmit={handleSubmit} className='w-full'>
            <div className="mb-4">
              <input
                type="password"
                className={input}
                placeholder="パスワード"
                value={password}
                onChange={handlePasswordChange}
              />
              {passwordError && <p className={`text-red-500 mt-1 ${textXs}`}>{passwordError}</p>}
            </div>
            <div className="mb-4">
              <input
                type="password"
                className={input}
                placeholder="パスワード(確認用)"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {confirmError && <p className={`text-red-500 mt-1 ${textXs}`}>{confirmError}</p>}
            </div>
            <button
              type="submit"
              className={`${textSm} w-full my-10 py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none`}
            >
              再設定する
            </button>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PasswordReset;
