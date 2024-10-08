import { IonApp, IonRouterOutlet, IonTab, IonTabBar, IonTabs, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { LoadScriptNext } from "@react-google-maps/api";
import { Redirect, Route } from "react-router-dom";
import Providers from "@/app/provider";

import SignIn from "@/app/pages/auth/signin";
import SignUp from "@/app/pages/auth/signup";
import SignOut from "@/app/pages/auth/signout";
import PasswordReset from "@/app/pages/auth/passwordReset";
import PasswordResetSend from "@/app/pages/auth/passwordResetSend";
import Dashboard from '@/app/pages/dashboard';
import EventSetting from "@/app/pages/eventSetting";
import EventList from "./pages/eventList";
import SalesManagement from "@/app/pages/salesManagement";
import ChatList from "@/app/pages/chat/chatList";
import ChatMessages from "@/app/pages/chat/chatMessages";
import Settings from "@/app/pages/settings";
import StoreProfileSetting from "./pages/settings/storeProfileSetting";
import PasswordSetting from "./pages/settings/passwordSetting";
import CreditCardSetting from "./pages/settings/creditCardSetting";
import TransferAccountSetting from "./pages/settings/transferAccountSetting";
import Unauthorized from "@/app/pages/auth/unauthorized";

setupIonicReact({});

const AppShell = () => {
  const apiKey = 'AIzaSyD9CmNeN59mj51D4CTLrXFRU2QZUKwg_xc';

  return (
    <Providers>
      <IonApp>
        <LoadScriptNext googleMapsApiKey={apiKey} loadingElement={<div className="w-screen h-screen flex flex-row items-center justify-center text-2xl font-bold">読み込み中...</div>} id="google-map-script">
          <IonReactRouter>
            <IonRouterOutlet id="main">
              <Route path="/auth/signup" render={() => <SignUp />} exact={true} />
              <Route path="/auth/signin" render={() => <SignIn />} exact={true} />
              <Route path="/auth/signout" render={() => <SignOut />} exact={true} />
              <Route path="/auth/passwordReset" render={() => <PasswordReset />} exact={true} />
              <Route path="/auth/passwordResetSend" render={() => <PasswordResetSend />} exact={true} />              
              <Route path="/dashboard" render={() => <Dashboard />} exact={true} />
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
              {/* redirect */}
              <Route path="/" render={() => <SignIn />} exact={true} />
            </IonRouterOutlet>
          </IonReactRouter>
        </LoadScriptNext>
      </IonApp>
    </Providers>
  );
};

export default AppShell;
