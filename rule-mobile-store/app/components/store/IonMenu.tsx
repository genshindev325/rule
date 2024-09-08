import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonButtons,
  IonRouterLink,
} from "@ionic/react";

const SideMenu: React.FC = () => {
  return (
    <>
      <IonMenu contentId="main-content" side="start">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>
              <IonRouterLink routerLink="/dashboard">
                <IonLabel>Dashboard</IonLabel>
              </IonRouterLink>
            </IonItem>
            <IonItem>
              <IonRouterLink routerLink="/chat">
                <IonLabel>Chat</IonLabel>
              </IonRouterLink>
            </IonItem>
            {/* Add more menu items here */}
          </IonList>
        </IonContent>
      </IonMenu>

      {/* Menu button */}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton autoHide={false} />
          </IonButtons>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default SideMenu;
