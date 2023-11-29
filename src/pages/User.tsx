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
      <div className='p-8'>
        <h3 className='text-lg font-semibold pb-8'>Users</h3>
      </div>
    </AdminLayout>
  );
};


export default Users;