import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Tabs from "./components/Tabs";
import EventPayment from "./user/event/payment";

setupIonicReact({});

const AppShell = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet id="main">
          <Route path="/event/payment" render={() => <EventPayment />} />
          <Route path="/tabs" render={() => <EventPayment />} />
          <Route
            path="/"
            render={() => <Redirect to="/tabs/feed" />}
            exact={true}
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default AppShell;
