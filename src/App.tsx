import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute'
import { logout, useUserProfile } from './services/authService';
import useAuthStore from './store/auth';
import Users from './pages/User';

const App: React.FC = () => {
  const { isAuth } = useAuthStore();

  const fetchProfile = async () => {
    try {
      await useUserProfile();
    } catch (error: any) {
      console.log("error", error);
      logout();
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='login' element={isAuth ? <Navigate to="/" /> : <Login />} />
          <Route element={<ProtectedRoute auth={isAuth} />}>
            <Route path='/' element={<Transactions />} />
            {/* <Route path='/transactions' element={<Transactions />} /> */}
            {/* <Route path='/users' element={<Users />} /> */}
          </Route>
          <Route path="*" element={<><div>Not found!</div></>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
