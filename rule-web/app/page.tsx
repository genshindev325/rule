import SignIn from '@/app/auth/signIn/page';
import SignUp from '@/app/auth/signUp/page';

// Admin
import Dashboard from '@/app/admin/dashboard/page';
import Events from '@/app/admin/events/page';

// Store
// import Dashboard from '@/app/store/dashboard/page';
import ChatPage from '@/app/store/chat/page';
import EventSettings from '@/app/store/eventSettings/page';
import SalesManagement from '@/app/store/salesManagement/page';
import Setting from '@/app/store/setting/page';

// Users
// Auth
import PasswordResetSend from '@/app/user/auth/passwordResetSend/page';
import PasswordReset from '@/app/user/auth/passwordReset/page';
import Login from '@/app/user/auth/login/page';
import LoginWith from '@/app/user/auth/loginWith/page';
import RegisterID from '@/app/user/auth/registerID/page';
import RegisterName from '@/app/user/auth/registerName/page';
import SetProfile from '@/app/user/auth/setProfile/page';
import RegisterBirthday from '@/app/user/auth/registerBirthday/page';
import RegisterPassword from '@/app/user/auth/registerPassword/page';
import RegisterEmail from '@/app/user/auth/registerEmail/page';
import SelectGender from '@/app/user/auth/selectGender/page';
// Events
import EventPayment from '@/app/user/event/payment/page';
import RegistSuccess from '@/app/user/event/registSuccess/page';
import FindOnMap from '@/app/user/event/findOnMap/page';
import SearchResult1 from '@/app/user/event/searchResult1/page';
import SearchResult2 from '@/app/user/event/searchResult2/page';
import SearchResult3 from '@/app/user/event/searchResult3/page';
import SearchResult4 from '@/app/user/event/searchResult4/page';

import EventHistory1 from '@/app/user/event/history1/page';
import EventHistory2 from '@/app/user/event/history2/page';

import EventReview1 from '@/app/user/event/eventReview1/page';
import EventReview2 from '@/app/user/event/eventReview2/page';

export default function Home() {
  return (
    <EventHistory2 />
  );
}
