// app/user/auth/passwordResetSend.tsx

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { IonPage, IonContent, IonRouterLink, useIonRouter } from '@ionic/react';
import { SERVER_URL } from '@/app/config';

const PasswordResetSend: React.FC = () => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const textXs = 'text-xs sm:text-sm md:text-base';
  const textSm = 'text-sm md:text-base font-semibold';
  const input = 'text-xs sm:text-sm md:text-base w-full px-3 sm:px-4 md:px-6 py-2 sm:py-4 border border-gray-700 rounded-md focus:outline-none';
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [code, setCode] = useState(Array(4).fill(''));
  const [verificationSent, setVerificationSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [timer, setTimer] = useState(120); // 2-minute timer
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
  const router = useIonRouter();

  useEffect(() => {
    setCode(Array(4).fill(''));
    setErrorMessage('');
    setTimer(120);
  }, [verificationSent])

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setVerificationSent(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const verifyCode = async () => {
    const verificationCode = code.join('');
    const res = await fetch(`${SERVER_URL}/api/users/verify-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, code: verificationCode }),
    });

    if (res.status === 200) {
      setCodeVerified(true);
      setCode(Array(4).fill(''));
      setErrorMessage('');
      router.push(`/auth/passwordReset?email=${encodeURIComponent(JSON.stringify(email))}`);
    } else {
      const data = await res.json();
      setErrorMessage(data.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission
    try {
      const res = await fetch(`${SERVER_URL}/api/users/send-verification-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setVerificationSent(true);
        setTimer(120);
        startTimer();
        setMessage('確認コードが送信されました。メールの受信箱を確認してください。');
      } else {
        setMessage('エラーが発生しました。もう一度お試しください。');
      }
    } catch (error) {
      setMessage('サーバーエラーが発生しました。');
    }
  };

  const handleCodeChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Focus on the next input if the value is a digit
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
    
    // Move focus back if the input is empty and the user pressed backspace
    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className="flex items-start justify-center min-h-screen w-screen bg-white text-gray-800">
          <div className="h-40 sm:h-44 w-full bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]">
            <div className="bg-white rounded-2xl shadow-xl px-4 sm:px-6 md:px-8 mx-5 sm:mx-6 md:mx-8 mt-12 sm:mt-14 md:mt-16">
              <h2 className="text-lg font-semibold py-8 sm:py-10 md:py-12 text-center">パスワード再設定</h2>
              {/* before verification email sent */}
              {!verificationSent && (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <input
                      type="text"
                      className={`${input}`}
                      placeholder="メールアドレスを入力してください"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {message ? <p className={textXs}>{message}</p> :
                  <p className={`${textXs} text-gray-500 font-semibold`}>
                    登録したメールアドレスに確認コードが送信されます。
                  </p>}
                  <button
                    type="submit"
                    className={`w-full py-2 sm:py-3 md:py-4 px-4 mt-16 sm:mt-20 md:mt-24 ${textSm} ${maleGradient} text-white rounded-full`}
                  >
                    送信する
                  </button>
                  <div className="text-right py-8">
                    <IonRouterLink routerLink='/auth/login' className={`${textXs} text-gray-500 font-semibold`}>
                      キャンセル
                    </IonRouterLink>
                  </div>
                </form>
              )}
              {/* verification code sent */}
              {verificationSent && (
                <div className="pb-12 flex flex-col items-center">
                  <h3 className={`${textXs} text-gray-500 font-semibold px-4`}>確認コードは既にあなたのメールに送信されています。メールの受信ボックスを確認し、ここに確認コードを入力してください。確認コードは 120 秒後に期限切れになります。</h3>
                  <div className="flex justify-center items-center space-x-4 my-4">
                    {Array.from({ length: 4 }, (_, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        className="border rounded-lg bg-gray-100 w-10 p-2 text-center text-sm sm:text-base"
                        value={code[index]}
                        onChange={(e) => handleCodeChange(e.target.value, index)}
                        ref={(el) => (inputRefs.current[index] = el)}
                      />
                    ))}
                  </div>
                  <p className={`${textSm} text-gray-600`}>残り時間: {timer}s</p>
                  {errorMessage && <p className={`${textXs} text-red-500`}>{errorMessage}</p>}
                  <button
                    onClick={verifyCode}
                    className={`${textSm} ${maleGradient} text-white mt-6 px-8 py-2 rounded-full focus:outline-none`}
                  >
                    コードを確認する
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PasswordResetSend;
