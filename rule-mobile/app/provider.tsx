// app/provider.tsx

'use client';

import { Provider } from "react-redux";
import { store } from "@/app/store/store";
import { AuthProvider } from "@/app/components/auth/authContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </Provider>
  );
};
export default Providers;