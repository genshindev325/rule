import React from 'react';
import EarningsManagement from '@/components/admin/salesManagement/earningsManagement';
import Navbar from '@/components/admin/navbar';

const SalesManagement: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex bg-gray-100">
      <div className="w-20">
        <Navbar />
      </div>
      <div className="w-full p-10 pb-16">
        <EarningsManagement />
      </div>
    </div>
  );
};

export default SalesManagement;