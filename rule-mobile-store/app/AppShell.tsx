import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { LoadScriptNext } from "@react-google-maps/api";
import { Redirect, Route } from "react-router-dom";
import Providers from "@/app/provider";

import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";
import Dashboard from '@/app/pages/dashboard/page';

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
