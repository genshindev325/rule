import SignIn from '@/pages/signIn';
import SignUp from '@/pages/signUp';
import Dashboard from '@/pages/dashboard';
import SalesManagement from '@/pages/salesManagement';
import Setting from '@/pages/setting';
import StoreProfileSettings from '@/components/setting/storeProfileSettings';
import CreditCardSettins from '@/components/setting/creditCardSettings';
import PasswordSetting from '@/components/setting/passwordSetting';
import TransferAccountSetting from '@/components/setting/transferAccountSettings';

export default function Home() {
  return (
    <TransferAccountSetting/>
  );
}
