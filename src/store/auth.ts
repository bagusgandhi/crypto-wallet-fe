import { create } from "zustand";
import Cookies from 'js-cookie';

interface AuthState {
    isAuth: boolean;
    username: string | null;
    setIsAuth: (auth: boolean, username?: string | null) => void;
}

const useAuthStore = create<AuthState>((set) => ({
    isAuth: !!Cookies.get('token'),
    username: null,
    setIsAuth: (auth, username) => set(() => ({ isAuth: auth, username })),
}));

export default useAuthStore;