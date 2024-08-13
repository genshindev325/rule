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
import SearchResult1 from './user/event/searchResult1/page';

export default function Home() {
  return (
    <SearchResult1 />
  );
}
