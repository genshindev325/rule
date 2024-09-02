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

const SignUp: React.FC = () => {
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

  const handleGenderChange = (newGender: 'male' | 'female') => {
    setGender(newGender);
    setIsGenderOpen(false);
    setIsUserIDOpen(true);
  }

  const handleUserIDChange = (newUserID: string) => {
    setUserID(newUserID);
    setIsUserIDOpen(false);
    setIsNicknameOpen(true);
  }

  const handleUserNameChange = (newUserName: string) => {
    setNickname(newUserName);
    setIsNicknameOpen(false);
    setIsBirthdayOpen(true);
  }

  const handleBirthdayChange = (newBirthday: string) => {
    setBirthday(newBirthday);
    setIsBirthdayOpen(false);
    setIsProfileOpen(true);
  }

  useEffect(() => {
  }, [email, password, gender, userID, nickname, birthday]);

  const handleAvatarChange = async (avatar: string) => {
    setIsProfileOpen(false);

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
      router.push('/home');
    } else {
      console.log(response.status);
    }
  }

  return (
    <IonPage>
      <IonContent>
        <RegisterEmail isOpen={isEmailOpen} userEmail={email} onEmailChange={handleEmailChange} />
        <RegisterPassword isOpen={isPasswordOpen} userPassword={password} onPasswordChange={handlePasswordChange} />
        <SelectGender isOpen={isGenderOpen} userGender={gender} onGenderChange={handleGenderChange} />
        <RegisterID isOpen={isUserIDOpen} Id={userID} onUserIDChange={handleUserIDChange} />
        <RegisterName isOpen={isNicknameOpen} userName={nickname} onUserNameChange={handleUserNameChange} />
        <RegisterBirthday isOpen={isBirthdayOpen} onUserBirthdayChange={handleBirthdayChange} />
        <SetProfile isOpen={isProfileOpen} onUserAvatarChange={handleAvatarChange} />
      </IonContent>
    </IonPage>
  )
}

export default SignUp;