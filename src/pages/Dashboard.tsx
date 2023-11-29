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
      <div>Dashboard</div>
    </AdminLayout>
  );
};


export default Dashboard;