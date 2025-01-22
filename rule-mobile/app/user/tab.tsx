import { IonRouterOutlet, IonTabButton, IonTabBar, IonTabs, IonIcon, IonLabel } from "@ionic/react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { cog, home, list } from 'ionicons/icons';

// Home
import Home from '@/app/user/home';

// profile
import MyPage from '@/app/user/profile/myPage';
import Password from '@/app/user/profile/password';
import Payment from '@/app/user/profile/payment';
import Setting from '@/app/user/profile/setting';
import ChangeAvatar from "@/app/components/user/setting/changeAvatar";
import ChangeName from "@/app/components/user/setting/changeName";
import ChangeID from '@/app/components/user/setting/changeID';
import ChangeBirthday from "@/app/components/user/setting/changeBirthday";
import UploadIdentityCard from "@/app/components/user/setting/uploadIdentityCard";

// Auth
import Login from "@/app/user/auth/login";
import LoginWith from "@/app/user/auth/loginWith";
import LogOut from "@/app/user/auth/logout";
import PasswordReset from "@/app/user/auth/passwordReset";
import PasswordResetSend from "@/app/user/auth/passwordResetSend";
import Unauthorized from "@/app/user/auth/unauthorized";
import SignUp from "@/app/user/auth/signup";
import { useAuth } from "@/app/components/auth/authContext";

// Event
import EventReview2 from "@/app/user/event/eventReview2";
import FindOnMap from "@/app/user/event/findOnMap";
import EventHistory2 from "@/app/user/event/history2";
import EventPayment from "@/app/user/event/payment";
import RegistSuccess from "@/app/user/event/registSuccess";
import EventDetail from "@/app/user/event/eventDetail";
import SearchResult4 from "@/app/user/event/searchResult4";
import EventCancel from "@/app/user/event/eventCancel";

// Chat
import ChatList from "@/app/user/chat/chatList";
import ChatMessages from "@/app/user/chat/chatMessages";

const Tabs = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === '/home';

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/event" render={() => <EventPayment />} />
        {/* home */}
        <Route path="/home" component={Home} />
        {/* my page */}
        <Route path="/profile/myPage" component={MyPage} />
        <Route path="/profile/password" component={Password} />
        <Route path="/profile/payment" component={Payment} />
        <Route path="/profile/setting" component={Setting} />
        <Route path="/setting/changeAvatar" component={ChangeAvatar} />
        <Route path="/setting/changeName" component={ChangeName} />
        <Route path="/setting/changeID" component={ChangeID} />
        <Route path="/setting/changeBirthday" component={ChangeBirthday} />
        <Route path="/setting/uploadIdentityCard" component={UploadIdentityCard} />
        {/* user/auth */}
        <Route path="/auth/signup" component={SignUp} />
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/loginWith" render={() => <LoginWith />} exact={true} />
        <Route path="/auth/logout" component={LogOut} />
        <Route path="/auth/passwordReset" render={() => <PasswordReset />} exact={true} />
        <Route path="/auth/passwordResetSend" render={() => <PasswordResetSend />} exact={true} />
        <Route path="/auth/unauthorized" render={() => <Unauthorized />} exact={true} />
        {/* user/event */}
        <Route path="/participate" render={() => <RegistSuccess />} exact={true} />
        <Route path="/event/findOnMap" render={() => <FindOnMap />} exact={true} />
        <Route path="/event/eventReview2" render={() => <EventReview2 />} exact={true} />
        <Route path="/event/eventHistory2" render={() => <EventHistory2 />} exact={true} />
        <Route path="/event/eventPayment" render={() => <EventPayment />} exact={true} />
        <Route path="/event/eventDetail" render={() => <EventDetail />} exact={true} />
        <Route path="/event/eventResult4" render={() => <SearchResult4 />} exact={true} />
        <Route path="/event/eventCancel" render={() => <EventCancel />} exact={true} />
        {/* chat */}
        <Route path="/chatList" render={() => <ChatList />} exact={true} />
        <Route path="/chatMessages" render={() => <ChatMessages />} exact={true} />
        <Route
          path="/"
          render={() => <Redirect to="/auth/login" />}
          exact={true}
        />
      </IonRouterOutlet>
      {isAuthenticated && !isHomePage ?
        <IonTabBar slot="bottom" className="h-14 min-h-14 bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]">
          <IonTabButton tab="tab1" href="/event/findOnMap" className="bg-transparent">
            <div className="flex items-center justify-center">
              <img
                src="/image/tab-1.png"
                onMouseOver={(e) => (e.currentTarget.src = '/image/tab-1-hover.png')}
                onMouseOut={(e) => (e.currentTarget.src = '/image/tab-1.png')}
                className="w-9 h-12"
              />
            </div>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/event/eventHistory2" className="bg-transparent">
            <div className="flex items-center justify-center">
              <img
                src="/image/tab-2.png"
                onMouseOver={(e) => (e.currentTarget.src = '/image/tab-2-hover.png')}
                onMouseOut={(e) => (e.currentTarget.src = '/image/tab-2.png')}
                className="w-9 h-12"
              />
            </div>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/profile/myPage" className="bg-transparent">
            <div className="flex items-center justify-center">
              <img
                src="/image/tab-3.png"
                onMouseOver={(e) => (e.currentTarget.src = '/image/tab-3-hover.png')}
                onMouseOut={(e) => (e.currentTarget.src = '/image/tab-3.png')}
                className="w-9 h-12"
              />
            </div>
          </IonTabButton>
          <IonTabButton tab="tab4" href="/chatList" className="bg-transparent">
            <div className="flex items-center justify-center">
              <img
                src="/image/tab-4.png"
                onMouseOver={(e) => (e.currentTarget.src = '/image/tab-4-hover.png')}
                onMouseOut={(e) => (e.currentTarget.src = '/image/tab-4.png')}
                className="w-9 h-12"
              />
            </div>
          </IonTabButton>
          <IonTabButton tab="tab5" href="/auth/logout" className="bg-transparent">
            <div className="flex items-center justify-center">
              <img
                src="/image/tab-5.png"
                onMouseOver={(e) => (e.currentTarget.src = '/image/tab-5-hover.png')}
                onMouseOut={(e) => (e.currentTarget.src = '/image/tab-5.png')}
                className="w-9 h-12"
              />
            </div>
          </IonTabButton>
        </IonTabBar>
        :
        <IonTabBar /> 
      }
    </IonTabs>
  );
};

export default Tabs;
