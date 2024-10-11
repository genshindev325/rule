// app/pages/settings/passwordSetting.tsx

'use client';

import React, { useState } from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonMenuButton, IonTitle, IonRouterLink, useIonRouter } from '@ionic/react';
import SideMenu from '@/app/components/store/IonMenu';
import AuthWrapper from '@/app/components/auth/authWrapper';
import { useAuth } from '@/app/components/auth/authContext';
import { SERVER_URL } from '@/app/config';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { toast } from 'react-toastify';

const PasswordSetting = () => {
  const textSm = 'text-sm sm:text-md text-gray-800';
  const textXs = 'text-xs sm:text-sm';
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const token = useSelector((state: RootState) => state.auth.token);
  const minLength = 6;
  const maxLength = 20;

  const router = useIonRouter();
  const { profile } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add Password setting logic here
    if (confirmPassword !== password) {
      setConfirmError('パスワードが一致しません。');
    } else {
      setConfirmError('');
      if (!token) {
        router.push('/auth/login');
      } else {
        const response = await fetch(`${SERVER_URL}/api/stores/change-pwd`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ email: profile?.email, password: currentPassword, newPassword: password }),
        });
        if (response.status === 200) {
          toast.success('パスワード設定に成功しました。', {
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            bodyClassName: 'text-xs sm:text-sm',
          });
          setTimeout(() => {
            router.push('/settings');
          }, 1000);
          console.log("Password setting success.")
        } else {
          console.log(response.status);
          console.log("Password setting failed.");
        }
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
    <AuthWrapper allowedRoles={['store']}>
      <SideMenu />
      <IonPage id='main-content'>
        <IonHeader>
            <IonToolbar>
              <IonMenuButton slot="start" /> {/* This button opens the SideMenu */}
              <IonTitle className='text-center font-semibold mr-12 text-gray-800'>パスワード設定</IonTitle> {/* Default title */}
            </IonToolbar>
          </IonHeader>
        <IonContent fullscreen>
          <div className='bg-white w-full ion-padding text-gray-800'>
            <form onSubmit={handleSubmit}>
              {/* Password setting */}
              <h3 className={`${textSm} font-semibold py-2`}>現在のパスワード</h3>
              <div className="mb-4">
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={`text-xs sm:text-sm w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100`}
                  placeholder="現在のパスワード"
                  required
                />
              </div>
              <h3 className={`${textSm} font-semibold py-2`}>新しいパスワード</h3>
              <div className="mb-4">
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className={`text-xs sm:text-sm w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100`}
                  placeholder="新しいパスワード"
                  required
                />
                {passwordError && <p className="text-red-500 mt-2">{passwordError}</p>}
              </div>
              <h3 className={`${textSm} font-semibold py-2`}>新しいパスワード (再入力)</h3>
              <div className="mb-4">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className={`text-xs sm:text-sm w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100`}
                  placeholder="新しいパスワード (再入力)"
                  required
                />
                {confirmError && <p className="text-red-500 mt-2">{confirmError}</p>}
              </div>
              {/* buttons */}
              <div className='flex flex-col pt-2 space-y-4'>
                <button type="submit" className={`${textSm} w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 duration-300`}>
                  保存
                </button>
                <button type="button" className={`${textSm} w-full py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 duration-300`}>
                  <IonRouterLink routerLink='/settings' className='text-gray-800'>キャンセル</IonRouterLink>
                </button>
              </div>
            </form>
          </div>
        </IonContent>
      </IonPage>
    </AuthWrapper>
  );
}

export default PasswordSetting;