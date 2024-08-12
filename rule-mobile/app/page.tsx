// Auth
import PasswordResetSend from '@/app/auth/passwordResetSend/page';
import PasswordReset from '@/app/auth/passwordReset/page';
import Login from './auth/login/page';
import LoginWith from './auth/loginWith/page';
import RegisterID from './auth/registerID/page';
import RegisterName from './auth/registerName/page';
import SetProfile from './auth/setProfile/page';
import RegisterBirthday from './auth/registerBirthday/page';
import RegisterPassword from './auth/registerPassword/page';
import RegisterEmail from './auth/registerEmail/page';
import SelectGender from './auth/selectGender/page';
// Events
import EventPayment from './event/payment/page';
import RegistSuccess from './event/registSuccess/page';
import FindOnMap from './event/find/page';

export default function Home() {
  return (
    <FindOnMap />
  );
}
