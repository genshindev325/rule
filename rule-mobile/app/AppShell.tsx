import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Tabs from "./components/Tabs";

// Auth
import Login from "./user/auth/login";
import LoginWith from "./user/auth/loginWith";
import PasswordReset from "./user/auth/passwordReset";
import PasswordResetSend from "./user/auth/passwordResetSend";
import RegisterBirthday from "./user/auth/registerBirthday";
import RegisterEmail from "./user/auth/registerEmail";
import RegisterID from "./user/auth/registerID";
import RegisterName from "./user/auth/registerName";
import RegisterPassword from "./user/auth/registerPassword";
import SelectGender from "./user/auth/selectGender";
import SetProfile from "./user/auth/setProfile";

// Event
import EventReview1 from "./user/event/eventReview1";
import EventReview2 from "./user/event/eventReview2";
import FindOnMap from "./user/event/findOnMap";
import EventHistory1 from "./user/event/history1";
import EventHistory2 from "./user/event/history2";
import EventPayment from "./user/event/payment";
import RegistSuccess from "./user/event/registSuccess";
import SearchResult1 from "./user/event/searchResult1";
import SearchResult2 from "./user/event/searchResult2";
import SearchResult3 from "./user/event/searchResult3";
import SearchResult4 from "./user/event/searchResult4";

setupIonicReact({});

const AppShell = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet id="main">
          <Route path="/event" render={() => <EventPayment />} />
          <Route path="/tabs" render={() => <Tabs />} />
          {/* user/auth */}
          <Route path="/auth/login" render={() => <Login />} exact={true} />
          <Route path="/auth/loginWith" render={() => <LoginWith />} exact={true} />
          <Route path="/auth/passwordReset" render={() => <PasswordReset />} exact={true} />
          <Route path="/auth/passwordResetSend" render={() => <PasswordResetSend />} exact={true} />
          <Route path="/auth/RegisterBirthday" render={() => <RegisterBirthday />} exact={true} />
          <Route path="/auth/RegisterEmail" render={() => <RegisterEmail />} exact={true} />
          <Route path="/auth/RegisterID" render={() => <RegisterID />} exact={true} />
          <Route path="/auth/RegisterName" render={() => <RegisterName />} exact={true} />
          <Route path="/auth/RegisterPassword" render={() => <RegisterPassword />} exact={true} />
          <Route path="/auth/SelectGender" render={() => <SelectGender />} exact={true} />
          <Route path="/auth/SetProfile" render={() => <SetProfile />} exact={true} />
          {/* user/event */}
          <Route path="/event/eventReview1" render={() => <EventReview1 />} exact={true} />
          <Route path="/event/eventReview2" render={() => <EventReview2 />} exact={true} />
          <Route path="/event/findOnMap" render={() => <FindOnMap />} />
          <Route path="/event/eventHistory1" render={() => <EventHistory1 />} exact={true} />
          <Route path="/event/eventHistory2" render={() => <EventHistory2 />} exact={true} />
          <Route path="/event/eventPayment" render={() => <EventPayment />} exact={true} />
          <Route path="/event/eventRegistSuccess" render={() => <RegistSuccess />} exact={true} />
          <Route path="/event/eventResult1" render={() => <SearchResult1 />} exact={true} />
          <Route path="/event/eventResult2" render={() => <SearchResult2 />} exact={true} />
          <Route path="/event/eventResult3" render={() => <SearchResult3 />} exact={true} />
          <Route path="/event/eventResult4" render={() => <SearchResult4 />} exact={true} />
          <Route
            path="/"
            render={() => <Redirect to="/event/eventReview1" />}
            exact={true}
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default AppShell;
