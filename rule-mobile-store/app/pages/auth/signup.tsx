// app/user/auth/signup.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, useIonRouter } from '@ionic/react';

import RegisterEmail from '@/app/components/auth/registerEmail';
import RegisterPassword from '@/app/components/auth/registerPassword';
import SelectGender from '@/app/components/auth/selectGender';
import RegisterID from '@/app/components/auth/registerID';
import RegisterName from '@/app/components/auth/registerName';
import RegisterBirthday from '@/app/components/auth/registerBirthday';
import SetProfile from '@/app/components/auth/setProfile';
import { useAuth } from '@/app/components/auth/authContext';
import { SERVER_URL } from '@/app/config';
import Notification from '@/app/utils/notification';

const SignUp: React.FC = () => {
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [userID, setUserID] = useState('');
  const [nickname, setNickname] = useState('');
  const [birthday, setBirthday] = useState('');

  const [isEmailOpen, setIsEmailOpen] = useState(true);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [isUserIDOpen, setIsUserIDOpen] = useState(false);
  const [isNicknameOpen, setIsNicknameOpen] = useState(false);
  const [isBirthdayOpen, setIsBirthdayOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const router = useIonRouter();
  const { signin } = useAuth();

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
    setIsEmailOpen(false);
    setIsPasswordOpen(true);
  }

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    setIsPasswordOpen(false);
    setIsGenderOpen(true);
  }

  const handlePasswordCancel = () => {
    setIsPasswordOpen(false);
    setIsEmailOpen(true);
  }

  const handleGenderChange = (newGender: 'male' | 'female') => {
    setGender(newGender);
    setIsGenderOpen(false);
    setIsUserIDOpen(true);
  }

  const handleGenderCancel = () => {
    setIsGenderOpen(false);
    setIsPasswordOpen(true);
  }

  const handleUserIDChange = (newUserID: string) => {
    setUserID(newUserID);
    setIsUserIDOpen(false);
    setIsNicknameOpen(true);
  }

  const handleUserIDCancel = () => {
    setIsUserIDOpen(false);
    setIsGenderOpen(true);
  }

  const handleUserNameChange = (newUserName: string) => {
    setNickname(newUserName);
    setIsNicknameOpen(false);
    setIsBirthdayOpen(true);
  }

  const handleUserNameCancel = () => {
    setIsNicknameOpen(false);
    setIsUserIDOpen(true);
  }

  const handleBirthdayChange = (newBirthday: string) => {
    setBirthday(newBirthday);
    setIsBirthdayOpen(false);
    setIsProfileOpen(true);
  }

  const handleBirthdayCancel = () => {
    setIsBirthdayOpen(false);
    setIsNicknameOpen(true);
  }

  const handleAvatarCancel = () => {
    setIsProfileOpen(false);
    setIsBirthdayOpen(true);
  }

  const handleCloseNotification = () => {
    setNotification(null);
  };

  useEffect(() => {
  }, [email, password, gender, userID, nickname, birthday, notification]);

  const handleAvatarChange = async (avatar: string) => {
    setIsProfileOpen(false);

    try {
      setNotification({ message: 'しばらくお待ちください。', type: 'success' });
      const response = await fetch(`${SERVER_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, gender, birthday, avatar, nickname, userID }),
      });
  
      if (response.status === 201) {
        const result = await response.json();
        const {
          email,
          role,
          profile,
          token
        } = result.data;
  
        signin(email, role, profile, token);
        setNotification({ message: '登録が完了しました!', type: 'success' });
        setTimeout(() => {
          router.push('/home');
        }, 1500);
      } else {
        setNotification({ message: `サインアップ中にエラーが発生しました。もう一度お試しください。ステータス: ${response.status}`, type: 'error' });
      }
    } catch(error) {
      setNotification({ message: `サインアップ中にエラーが発生しました。もう一度お試しください。エラー: ${error}`, type: 'error' });
    }
  }

  return (
    <IonPage>
      <IonContent>
        <RegisterEmail isOpen={isEmailOpen} userEmail={email} onEmailChange={handleEmailChange} />
        <RegisterPassword isOpen={isPasswordOpen} userPassword={password} onPasswordChange={handlePasswordChange} onCancel={handlePasswordCancel} />
        <SelectGender isOpen={isGenderOpen} userGender={gender} onGenderChange={handleGenderChange} onCancel={handleGenderCancel} />
        <RegisterID isOpen={isUserIDOpen} Id={userID} onUserIDChange={handleUserIDChange} onCancel={handleUserIDCancel} />
        <RegisterName isOpen={isNicknameOpen} userName={nickname} onUserNameChange={handleUserNameChange} onCancel={handleUserNameCancel} />
        <RegisterBirthday isOpen={isBirthdayOpen} onUserBirthdayChange={handleBirthdayChange} onCancel={handleBirthdayCancel} />
        <SetProfile isOpen={isProfileOpen} onUserAvatarChange={handleAvatarChange} onCancel={handleAvatarCancel} />
        {notification && (<Notification message={notification.message} type={notification.type} onClose={handleCloseNotification} />)}
      </IonContent>
    </IonPage>
  )
}

export default SignUp;