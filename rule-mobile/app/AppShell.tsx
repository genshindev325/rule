import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { LoadScript } from "@react-google-maps/api";
import { Redirect, Route } from "react-router-dom";
import Providers from "@/app/provider";

// Home
import Home from './user/home';

// profile
import MyPage from './user/profile/myPage';
import Password from './user/profile/password';
import Payment from './user/profile/payment';
import Setting from './user/profile/setting';

// Auth
import Login from "./user/auth/login";
import LoginWith from "./user/auth/loginWith";
import PasswordReset from "./user/auth/passwordReset";
import PasswordResetSend from "./user/auth/passwordResetSend";
import Unauthorized from "./user/auth/unauthorized";
import SignUp from "./user/auth/signup";

// Event
// import EventReview1 from "./user/event/eventReview1";
import EventReview2 from "./user/event/eventReview2";
import FindOnMap from "./user/event/findOnMap";
// import EventHistory1 from "./user/event/history1";
import EventHistory2 from "./user/event/history2";
import EventPayment from "./user/event/payment";
import RegistSuccess from "./user/event/registSuccess";
import SearchResult1 from "./user/event/searchResult1";
import SearchResult2 from "./user/event/searchResult2";
import SearchResult3 from "./user/event/searchResult3";
import SearchResult4 from "./user/event/searchResult4";
import Success from "./user/event/success";

setupIonicReact({});

const AppShell = () => {
  const apiKey = 'AIzaSyD9CmNeN59mj51D4CTLrXFRU2QZUKwg_xc';

  return (
    <Providers>
      <IonApp>
        <LoadScript
          googleMapsApiKey={apiKey}
          loadingElement={<div>読み込み中...</div>}
          id="google-map-script"
        >
          <IonReactRouter>
            <IonRouterOutlet id="main">
              <Route path="/event" render={() => <EventPayment />} />
              {/* home */}
              <Route path="/home" component={Home} />
              {/* my page */}
              <Route path="/profile/myPage" component={MyPage} />
              <Route path="/profile/password" component={Password} />
              <Route path="/profile/payment" component={Payment} />
              <Route path="/profile/setting" component={Setting} />
              {/* user/auth */}
              <Route path="/auth/signup" component={SignUp} />
              <Route path="/auth/login" component={Login} />
              <Route path="/auth/loginWith" render={() => <LoginWith />} exact={true} />
              <Route path="/auth/passwordReset" render={() => <PasswordReset />} exact={true} />
              <Route path="/auth/passwordResetSend" render={() => <PasswordResetSend />} exact={true} />
              <Route path="/auth/unauthorized" render={() => <Unauthorized />} exact={true} />
              {/* user/event */}
              <Route path="/event/registSuccess" component={RegistSuccess} exact />
              <Route path="/event/findOnMap" render={() => <FindOnMap />} exact={true} />
              {/* <Route path="/event/eventReview1" render={() => <EventReview1 />} exact={true} /> */}
              <Route path="/event/eventReview2" render={() => <EventReview2 />} exact={true} />
              {/* <Route path="/event/eventHistory1" render={() => <EventHistory1 />} exact={true} /> */}
              <Route path="/event/eventHistory2" render={() => <EventHistory2 />} exact={true} />
              <Route path="/event/eventPayment" render={() => <EventPayment />} exact={true} />
              <Route path="/event/eventResult1" render={() => <SearchResult1 />} exact={true} />
              <Route path="/event/eventResult2" render={() => <SearchResult2 />} exact={true} />
              <Route path="/event/eventResult3" render={() => <SearchResult3 />} exact={true} />
              <Route path="/event/eventResult4" render={() => <SearchResult4 />} exact={true} />
              <Route path="/event/success" render={() => <Success />} exact={true} />
              <Route
                path="/"
                render={() => <Redirect to="/auth/login" />}
                exact={true}
              />
            </IonRouterOutlet>
          </IonReactRouter>
        </LoadScript>
      </IonApp>
    </Providers>
  );
};

export default AppShell;
