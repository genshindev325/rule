import SignIn from '@/app/auth/signIn/page';
import SignUp from '@/app/auth/signUp/page';
import Dashboard from '@/app/(store)/dashboard/page';
import SalesManagement from '@/app/(store)/salesManagement/page';
import Setting from '@/app/(store)/setting/page';
import StoreProfileSettings from '@/components/setting/storeProfileSettings';
import CreditCardSettins from '@/components/setting/creditCardSettings';
import PasswordSetting from '@/components/setting/passwordSetting';
import TransferAccountSetting from '@/components/setting/transferAccountSettings';
import EventSettings from '@/app/(store)/eventSettings/page';

export default function Home() {
  return (
    <Dashboard/>
  );
}
