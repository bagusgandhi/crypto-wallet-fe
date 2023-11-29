import React, { useEffect } from 'react';
import AdminLayout from '../layouts/Admin';
import { useDashboardStore } from '../store/dashboard';

const Users: React.FC = () => {
  const { setSelectedMenu } = useDashboardStore();

  useEffect(() => {
    setSelectedMenu("user")
  }, [])

  return (
    <AdminLayout>
      <div>Users</div>
    </AdminLayout>
  );
};


export default Users;