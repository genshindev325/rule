import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { LoadScriptNext } from "@react-google-maps/api";
import { Route } from "react-router-dom";
import Providers from "@/app/provider";
import Tabs from "@/app/pages/tab";

setupIonicReact({});

const AppShell = () => {
  const apiKey = 'AIzaSyD9CmNeN59mj51D4CTLrXFRU2QZUKwg_xc';

  return (
    <Providers>
      <IonApp>
        <LoadScriptNext googleMapsApiKey={apiKey} loadingElement={<div className="w-screen h-screen flex flex-row items-center justify-center text-2xl font-bold">読み込み中...</div>} id="google-map-script">
          <IonReactRouter>
            <IonRouterOutlet id="main">
              <Route path="/" render={() => <Tabs />} />
            </IonRouterOutlet>
          </IonReactRouter>
        </LoadScriptNext>
      </IonApp>
    </Providers>
  );
};

export default AppShell;
