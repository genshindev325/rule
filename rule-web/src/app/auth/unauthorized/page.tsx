// app/auth/unauthorized/page.tsx

'use client';

const Unauthorized = () => {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-200">
        <h1 className="text-3xl font-bold">Unauthorized Access</h1>
        <p className="text-xl font-semibold">You do not have permission to view this page.</p>
      </div>
    );
  };
  
  export default Unauthorized;
  