import { IonRouterOutlet, IonTabButton, IonTabBar, IonTabs, IonIcon, IonLabel } from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import { cog, home, list } from 'ionicons/icons';

import SignIn from "@/app/pages/auth/signin";
import SignUp from "@/app/pages/auth/signup";
import SignOut from "@/app/pages/auth/signout";
import PasswordReset from "@/app/pages/auth/passwordReset";
import PasswordResetSend from "@/app/pages/auth/passwordResetSend";
import Dashboard from '@/app/pages/dashboard';
import EventSetting from "@/app/pages/eventSetting";
import EventList from "@/app/pages/eventList";
import SalesManagement from "@/app/pages/salesManagement";
import ChatList from "@/app/pages/chat/chatList";
import ChatMessages from "@/app/pages/chat/chatMessages";
import Settings from "@/app/pages/settings";
import StoreProfileSetting from "@/app/pages/settings/storeProfileSetting";
import PasswordSetting from "@/app/pages/settings/passwordSetting";
import CreditCardSetting from "@/app/pages/settings/creditCardSetting";
import TransferAccountSetting from "@/app/pages/settings/transferAccountSetting";
import Unauthorized from "@/app/pages/auth/unauthorized";
import { useAuth } from "@/app/components/auth/authContext";

const Tabs = () => {
  const { isAuthenticated } = useAuth();

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/auth/signup" render={() => <SignUp />} exact={true} />
        <Route path="/auth/signin" render={() => <SignIn />} exact={true} />
        <Route path="/auth/signout" render={() => <SignOut />} exact={true} />
        <Route path="/auth/passwordReset" render={() => <PasswordReset />} exact={true} />
        <Route path="/auth/passwordResetSend" render={() => <PasswordResetSend />} exact={true} />              
        <Route path="/dashboard" render={() => <Dashboard />} />
        <Route path="/eventSetting" render={() => <EventSetting />} exact={true} />
        <Route path="/eventList" render={() => <EventList />} exact={true} />
        <Route path="/salesManagement" render={() => <SalesManagement />} exact={true} />
        <Route path="/chatList" render={() => <ChatList />} exact={true} />
        <Route path="/chatMessages" render={() => <ChatMessages />} exact={true} />
        <Route path="/settings" render={() => <Settings />} exact={true} />
        <Route path="/settings/storeProfileSetting" render={() => <StoreProfileSetting />} exact={true} />
        <Route path="/settings/passwordSetting" render={() => <PasswordSetting />} exact={true} />
        <Route path="/settings/creditCardSetting" render={() => <CreditCardSetting />} exact={true} />
        <Route path="/settings/transferAccountSetting" render={() => <TransferAccountSetting />} exact={true} />
        <Route path="/auth/unauthorized" render={() => <Unauthorized />} exact={true} />
        <Route path="" render={() => <Redirect to={'/auth/signin'} />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/dashboard">
          <IonIcon icon={home} />
          <IonLabel></IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/eventSetting">
          <IonIcon icon={list} />
          <IonLabel>イベント</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/settings">
          <IonIcon icon={cog} />
          <IonLabel>Settings設定</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
