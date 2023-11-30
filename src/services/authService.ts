import Cookies from 'js-cookie';
import useAuthStore from '../store/auth';
import axios from 'axios';

export const login = async (credentials: { username: string; password: string }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}auth/login`, credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;
      const token = data.token;
      const username = data.username;
  
      Cookies.set('token', token);
  
      useAuthStore.getState().setIsAuth(true, username);
  
      return username;
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
  };

export const useUserProfile = async () => {
    try {
        const token = Cookies.get('token');
        const response = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}user/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const logout = async () => {
    Cookies.remove('token');
    useAuthStore.getState().setIsAuth(false, null);
}