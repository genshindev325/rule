import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuToggle, IonList, IonItem } from '@ionic/react';
import { useIonRouter } from '@ionic/react';

const SideMenu: React.FC = () => {
  const router = useIonRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>メニュー</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonMenuToggle>
            <IonItem button onClick={() => navigateTo('/dashboard')}>
              ダッシュボード
            </IonItem>
            <IonItem button onClick={() => navigateTo('/eventSetting')}>
              イベント設定
            </IonItem>
            <IonItem button onClick={() => navigateTo('/eventList')}>
              イベント一覧
            </IonItem>
            <IonItem button onClick={() => navigateTo('/salesManagement')}>
              売り上げ管理
            </IonItem>
            {/* <IonItem button onClick={() => navigateTo('/chat')}>
              お問い合わせ
            </IonItem> */}
            <IonItem button onClick={() => navigateTo('/settings')}>
              設定
            </IonItem>
            <IonItem button onClick={() => navigateTo('/auth/signout')} className='font-semibold text-red-400'>
              ログアウト
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;
