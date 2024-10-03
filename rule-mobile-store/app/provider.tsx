// app/provider.tsx

'use client';

import { Provider } from "react-redux";
import { store } from "@/app/store/store";
import { AuthProvider } from "@/app/components/auth/authContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        {children}
        <ToastContainer 
          position="top-right" 
          autoClose={3000} 
          hideProgressBar={false} 
          newestOnTop={false} 
          closeOnClick 
          rtl={false} 
          pauseOnFocusLoss 
          draggable 
          pauseOnHover
        />
      </AuthProvider>
    </Provider>
  );
};
export default Providers;