// app/user/profile/password.tsx

'use client';

import React, { useState } from 'react';
import { IonPage, IonContent, IonRouterLink, useIonRouter } from '@ionic/react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AuthWrapper from '@/app/components/auth/authWrapper';
import PasswordInput from '@/app/components/utils/passwordInput';
import { RootState } from '@/app/store/store';
import { SERVER_URL } from '@/app/config';

const ProfilePassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const minLength = 6;
  const maxLength = 20;
  const userInfo = useSelector((state: RootState) => state.auth.profile);
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useIonRouter();

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
    setNewPassword(newPassword);
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

    if (newConfirmPassword !== newPassword) {
      setConfirmError('パスワードが一致しません。');
    } else {
      setConfirmError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add Password setting logic here
    if (!userInfo) {
      console.log("Missing user information or event data.");
      return;
    }
    const { email: email } = userInfo;

    if (confirmPassword !== newPassword) {
      setConfirmError('パスワードが一致しません。');
    } else {
      setConfirmError('');
      if (!token) {
        router.push('/auth/login');
      } else {
        toast.info('しばらくお待ちください。', {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          bodyClassName: 'text-xs sm:text-sm',
        });
        const response = await fetch(`${SERVER_URL}/api/users/change-pwd`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ email: email, password: password, newPassword: newPassword }),
        });
        if (response.status === 200) {
          router.push('/profile/myPage');
          toast.success('パスワードの変更に成功しました。', {
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            bodyClassName: 'text-xs sm:text-sm',
          });
        } else {
          console.log(response.status);
          toast.error('サーバーが応答しません。', {
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            bodyClassName: 'text-xs sm:text-sm',
          });
        }
      }
    }
  };

  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const container = 'w-full rounded-xl bg-white -mt-28 px-3 sm:px-4 md:px-6 pb-10 sm:pb-8 md:py-10 flex flex-col shadow-md';
  const textMd = 'text-md sm:text-lg md:text-xl font-semibold';
  const textSm = 'text-sm sm:text-md md:text-lg font-semibold';

  return (
    <IonPage>
      <IonContent>
        <AuthWrapper allowedRoles={['user']}>
          <div className="flex flex-col items-center min-h-screen w-screen bg-white text-gray-800">
            <div className={`h-56 sm:h-60 md:h-72 w-full px-6 md:px-8 pb-4 sm:pb-6 md:pb-8 pt-16 sm:pt-20 md:pt-24 flex flex-row ${maleGradient}`}>
              {/* header */}
              <IonRouterLink routerLink={'/profile/myPage'}>
                <img src='/svg/arrow-left-white.svg' className='w-6 h-6' />
              </IonRouterLink>
              <h2 className='grow text-xl font-semibold text-center text-white pr-10'>マイページ</h2>
            </div>
            {/* container */}
            <form onSubmit={handleSubmit} className='w-5/6 flex flex-col items-center'>
              <div className={`${container}`}>
                <div className='flex flex-col items-center'>
                  <h2 className={`${textSm} pt-6`}>パスワード変更</h2>
                </div>
                {/* current password */}
                <div className='flex flex-col pt-8 border-b-2 border-solid border-gray-300'>
                  <h2 className={`${textSm}`}>現在のパスワード</h2>
                  <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {/* new password */}
                <div className='flex flex-col pt-6 border-b-2 border-solid border-gray-300'>
                  <h2 className={`${textSm}`}>新規パスワード</h2>
                  <PasswordInput value={newPassword} onChange={handlePasswordChange} />
                </div>
                {passwordError && <p className="text-red-500 mt-2">{passwordError}</p>}
                {/* confirm new password */}
                <div className='flex flex-col pt-6 border-b-2 border-solid border-gray-300'>
                  <h2 className={`${textSm}`}>新規パスワード確認</h2>
                  <PasswordInput value={confirmPassword} onChange={handleConfirmPasswordChange} />
                </div>
                {confirmError && <p className="text-red-500 mt-2">{confirmError}</p>}
              </div>
              {/* buttons */}
              <div className='flex flex-col space-y-4 py-10 w-full'>
                <button type='submit' className={`${maleGradient} rounded-full py-2 text-white ${textSm}`}>登録する</button>
                <button type='button' onClick={() => router.back()} className={`bg-gray-400 rounded-full py-2 text-white text-center ${textSm}`}>キャンセル</button>
              </div>
            </form>
          </div>
        </AuthWrapper>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePassword;
