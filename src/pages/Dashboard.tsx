import React, { useEffect } from 'react';
import AdminLayout from '../layouts/Admin';
import { useDashboardStore } from '../store/dashboard';

const Dashboard: React.FC = () => {
  const { setSelectedMenu } = useDashboardStore();

  useEffect(() => {
    setSelectedMenu("dashboard")
  }, [])

  return (
    <AdminLayout>
      <div className='p-8'>
        <h3 className='text-lg font-semibold pb-8'>Dashboard</h3>
      </div>
    </AdminLayout>
  );
};


export default Dashboard;