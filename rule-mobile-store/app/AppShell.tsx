import { IonApp, IonMenu, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { LoadScriptNext } from "@react-google-maps/api";
import { Redirect, Route } from "react-router-dom";
import Providers from "@/app/provider";

import SignIn from "@/app/pages/auth/signin";
import SignUp from "@/app/pages/auth/signup";
import Dashboard from '@/app/pages/dashboard';
import EventSetting from "@/app/pages/eventSetting";
import SalesManagement from "@/app/pages/salesManagement";
import Chat from "@/app/pages/chat";
import Settings from "@/app/pages/settings";
import Unauthorized from "@/app/pages/auth/unauthorized";

setupIonicReact({});

const AppShell = () => {
  const apiKey = 'AIzaSyD9CmNeN59mj51D4CTLrXFRU2QZUKwg_xc';

  return (
    <Providers>
      <IonApp>
        <LoadScriptNext googleMapsApiKey={apiKey} loadingElement={<div>読み込み中...</div>} id="google-map-script">
          <IonReactRouter>
            <IonRouterOutlet id="main">
              <Route path="/auth/signup" component={SignUp} />
              <Route path="/auth/signin" render={() => <SignIn />} exact={true} />
              <Route path="/dashboard" render={() => <Dashboard />} exact={true} />
              <Route path="/eventSetting" render={() => <EventSetting />} exact={true} />
              <Route path="/salesManagement" render={() => <SalesManagement />} exact={true} />
              <Route path="/chat" render={() => <Chat />} exact={true} />
              <Route path="/settings" render={() => <Settings />} exact={true} />
              <Route path="/auth/unauthorized" render={() => <Unauthorized />} exact={true} />
              {/* redirect */}
              <Route path="/" render={() => <Redirect to="/auth/signin" />} exact={true} />
            </IonRouterOutlet>
          </IonReactRouter>
        </LoadScriptNext>
      </IonApp>
    </Providers>
  );
};

export default AppShell;
