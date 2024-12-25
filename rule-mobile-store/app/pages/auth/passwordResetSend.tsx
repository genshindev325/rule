// app/user/auth/passwordResetSend.tsx

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { IonPage, IonContent, IonRouterLink, useIonRouter } from '@ionic/react';
import { toast } from 'react-toastify'; 
import { SERVER_URL } from '@/app/config';

const PasswordResetSend: React.FC = () => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const textXs = 'text-xs sm:text-sm';
  const textSm = 'text-sm md:text-base font-semibold';
  const input = 'text-xs sm:text-sm md:text-base text-left placeholder:text-center w-full p-3 sm:p-4 border border-gray-700 rounded-md focus:outline-none';
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [code, setCode] = useState(Array(4).fill(''));
  const [verificationSent, setVerificationSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [timer, setTimer] = useState(120); // 2-minute timer
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
  const router = useIonRouter();

  useEffect(() => {
    setCode(Array(4).fill(''));
    setErrorMessage('');
    setTimer(120);
  }, [verificationSent]);

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
    console.log("email: " + email);
    console.log("code: " + verificationCode);

    const res = await fetch(`${SERVER_URL}/api/stores/verify-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code: verificationCode }),
    });

    if (res.ok) {
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
      const res = await fetch(`${SERVER_URL}/api/stores/send-verification-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.status === 200) {
        setVerificationSent(true);
        setTimer(120);
        startTimer();
        setMessage('確認コードが送信されました。メールの受信箱を確認してください。');
      } else {
        const result = await res.json();
        toast.error(`${result.message}`, {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          bodyClassName: 'text-xs sm:text-sm',
        });
        setMessage(result.message);
      }
    } catch (error) {
      toast.error(`${error}`, {
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        bodyClassName: 'text-xs sm:text-sm',
      });
      setMessage('サーバーエラーが発生しました。メールの受信箱を確認してください。');
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
      <IonContent fullscreen>
        <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-white text-gray-800 p-6 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold pb-4">パスワード再設定</h2>
          {/* before verification email sent */}
          {!verificationSent && (
            <form onSubmit={handleSubmit} className='w-full'>
              <div className="mb-4">
                <input
                  type="text"
                  className={`${input}`}
                  placeholder="メールアドレスを入力してください"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {message ? <p className={`${textXs} text-red-500`}>{message}</p> :
                <p className={`${textXs} text-gray-500`}>
                  登録したメールアドレスに確認コードが送信されます。
                </p>}
              <button
                type="submit"
                className={`${textSm} w-full py-2 px-4 my-10 bg-black text-white rounded-md focus:outline-none`}
              >
                送信する
              </button>
              <div className="text-right">
                <IonRouterLink routerLink='/auth/signin' className={`${textSm} text-gray-500`}>
                  キャンセル
                </IonRouterLink>
              </div>
            </form>
          )}
          {/* verification code sent */}
          {verificationSent && (
            <div className="pb-12 flex flex-col items-center">
              <h3 className={`${textSm} text-gray-500 px-4`}>確認コードは既にあなたのメールに送信されています。メールの受信ボックスを確認し、ここに確認コードを入力してください。確認コードは 120 秒後に期限切れになります。</h3>
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
              {errorMessage && <p className={`${textSm} text-red-500`}>{errorMessage}</p>}
              <button
                onClick={verifyCode}
                className={`${textSm} w-full my-10 py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none`}
              >
                コードを確認する
              </button>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PasswordResetSend;
