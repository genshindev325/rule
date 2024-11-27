// app/user/setting/setImage.tsx

'use client';

import React, { useState } from 'react';
import { IonPage, IonContent, IonRouterLink, useIonRouter } from '@ionic/react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import AuthWrapper from '@/app/components/auth/authWrapper';
import { SERVER_URL } from '@/app/config';
import { RootState } from '@/app/store/store';

const UploadIdentityCard: React.FC = () => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const textXs = 'text-xs sm:text-sm md:text-md';
  const [localImage, setImage] = useState('');
  const router = useIonRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  const email = useSelector((state: RootState) => state.auth.email);
  const profile = useSelector((state: RootState) => state.auth.profile);
  const status = profile?.status;
  const IdentityCard = profile?.verification;
  const [IDphoto, setIDphoto] = useState(IdentityCard);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const formData = new FormData();
      formData.append('file', event.target.files[0]);

      try {
        toast.info('アップロード中です。お待​​ちください。', {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          bodyClassName: 'text-xs sm:text-sm',
        });
        const response = await fetch(`${SERVER_URL}/api/upload`, {
          method: 'POST',
          body: formData,
        });

        if (response.status === 200) {
          const data = await response.json();
          setImage(data.url);
          toast.success('画像のアップロードに成功しました!', {
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            bodyClassName: 'text-xs sm:text-sm',
          });
        } else {
          console.log(response.status);
          toast.error(`アップロード中にエラーが発生しました。もう一度お試しください。ステータス: ${response.status}`, {
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            bodyClassName: 'text-xs sm:text-sm',
          });
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error(`アップロード中にエラーが発生しました。もう一度お試しください。エラー: ${error}`, {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          bodyClassName: 'text-xs sm:text-sm',
        });
      }
    }
  };

  const handleImageChange = async (image: string) => {
    try {
      if (!token || !email) {
        router.push('/auth/login');
      } else {
        toast.info('しばらくお待ちください!', {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          bodyClassName: 'text-xs sm:text-sm',
        });
        const response = await fetch(`${SERVER_URL}/api/users/IdentityVerification`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ email, image }),
        });
    
        if (response.status === 200) {
          toast.success('身分証明書用写真が正常に送信されました。', {
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            bodyClassName: 'text-xs sm:text-sm',
          });
          setIDphoto(image);
          router.push('/profile/setting');
        } else {
          toast.error(`身分証明書の写真の送信中にエラーが発生しました。もう一度お試しください。ステータス: ${response.status}`, {
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            bodyClassName: 'text-xs sm:text-sm',
          });
        }
      }
    } catch(error) {
      toast.error(`アバターの変更中にエラーが発生しました。もう一度お試しください。エラー: ${error}`, {
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        bodyClassName: 'text-xs sm:text-sm',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission
    handleImageChange(localImage);
  };

  return (
    <IonPage>
      <IonContent>
        <AuthWrapper allowedRoles={['user']}>
          <div className="flex items-start justify-center min-h-screen w-screen bg-white text-gray-800">
            <div className="h-32 md:h-48 w-full bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]">
              {/* header */}
              <div className='flex flex-row text-xl font-semibold text-center text-white pt-6 px-4'>
                <IonRouterLink routerLink={'/profile/setting'}>
                  <img src='/svg/arrow-left-white.svg' className='w-6 h-6' />
                </IonRouterLink>
                <h2 className='grow pr-4'>本人確認</h2>
              </div>
              <div className="bg-white rounded-lg shadow-xl px-4 sm:px-6 md:px-8 mx-5 sm:mx-6 md:mx-8 mt-8 sm:mt-10 md:mt-12 pb-12 md:pb-14">
                {status === 'active' ?
                  <h2 className="text-xs sm:text-sm text-green-600 font-semibold pt-8 sm:pt-10 px-4 sm:px-6 text-center">あなたの身元が確認されました。</h2>
                  :
                  (
                    IdentityCard === '' || IdentityCard === null || IdentityCard === undefined ?
                      <>
                        <h2 className="text-xs sm:text-sm font-semibold py-8 sm:py-10 px-4 sm:px-6 text-center">身分証明書用写真を選択してください</h2>
                        <form onSubmit={handleSubmit}>
                          <div className="py-2 md:py-4 flex flex-col items-center justify-center h-full">
                            <div className='w-full'>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                id="file-input"
                              />
                              <label
                                htmlFor="file-input"
                                className="w-full px-3 sm:px-4 md:px-6 py-2 sm:py-4 flex items-center justify-center border border-gray-500 rounded-md cursor-pointer"
                              >
                                <span className="text-md text-gray-400 mr-4 flex items-center justify-center w-5 h-5 md:w-8 md:h-8 md:pb-1 border rounded-full border-gray-400">+</span>
                                <span className={`${textXs} text-gray-400`}>写真を選択</span>
                              </label>
                            </div>
                            {localImage && (
                              <div className='flex-1 justify-center items-center w-40 h-40 pt-6'>
                                <img src={`${localImage}`} />
                              </div>
                            )}
                          </div>
                          <div className='flex justify-center'>
                            <button type="submit" className={`mt-10 w-24 ${maleGradient} text-white py-2 rounded-full focus:outline-none`}>提出する</button>
                          </div>
                        </form>
                      </>
                    :
                      <>
                        <h2 className="text-xs sm:text-sm font-semibold pt-8 sm:pt-10 px-4 sm:px-6 text-center">現在、本人確認を行っています。確認が完了するまでお待ちください。</h2>
                        <div className="py-2 md:py-4 flex flex-col items-center justify-center h-full">
                          <div className='flex-1 justify-center items-center w-40 h-40 pt-6'>
                            <img src={`${IdentityCard}`} />
                          </div>
                        </div>
                      </>
                  )
                }
              </div>
            </div>
          </div>
        </AuthWrapper>
      </IonContent>
    </IonPage>
  );
};

export default UploadIdentityCard;
