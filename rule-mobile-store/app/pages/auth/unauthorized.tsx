// app/auth/unauthorized/page.tsx

'use client';

import { IonPage, IonContent } from '@ionic/react';

const Unauthorized = () => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';

  return (
    <IonPage>
      <IonContent>
        <div className={`w-screen h-screen flex flex-col items-center justify-center ${maleGradient} text-white`}>
          <h1 className="text-xl font-bold pb-10">不正アクセス</h1>
          <p className="text-xl font-semibold pb-10">このページを表示する権限がありません。</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Unauthorized;