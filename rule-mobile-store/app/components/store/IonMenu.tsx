import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuToggle, IonList, IonItem } from '@ionic/react';
import { useIonRouter } from '@ionic/react';
import { Dispatch, SetStateAction } from 'react';

interface SideMenuProps {
  setPageTitle: Dispatch<SetStateAction<string>>;
}

const SideMenu: React.FC<SideMenuProps> = ({ setPageTitle }) => {
  const router = useIonRouter();

  const navigateTo = (path: string, title: string) => {
    setPageTitle(title); // Update the title state
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
            <IonItem button onClick={() => navigateTo('/dashboard', 'ダッシュボード')}>
              ダッシュボード
            </IonItem>
            <IonItem button onClick={() => navigateTo('/eventSetting', 'イベント設定')}>
              イベント設定
            </IonItem>
            <IonItem button onClick={() => navigateTo('/salesManagement', '売り上げ管理')}>
              売り上げ管理
            </IonItem>
            <IonItem button onClick={() => navigateTo('/chat', 'お問い合わせ')}>
              お問い合わせ
            </IonItem>
            <IonItem button onClick={() => navigateTo('/settings', '設定')}>
              設定
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;
