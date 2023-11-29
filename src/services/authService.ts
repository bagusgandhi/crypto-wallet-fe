import Cookies from 'js-cookie';
import useAuthStore from '../store/auth';
import axios from 'axios';

export const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/login', credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = response.data;
      const token = data.data.access_token;
      const user = data.data.user;
  
      Cookies.set('token', token);
  
      useAuthStore.getState().setIsAuth(true, user.email);
  
      return user;
    } catch (error: any) {
        throw new Error(error.response.data.data.message)
    }
  };

export const useUserProfile = async () => {
    try {
        const token = Cookies.get('token');
        const response = await axios.get('http://localhost:8000/api/v1/user/profile', {
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