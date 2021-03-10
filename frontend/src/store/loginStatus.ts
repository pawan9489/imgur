import create from 'zustand';
import { persist } from "zustand/middleware";
import axios from 'axios';

type State = {
    isLoggedIn: boolean,
    userName: string,
    fullName: string,
    toggleLoggedIn: () => void
}

const LoginStatusStore = create<State>(persist((set, get) => ({
    isLoggedIn: false,
    userName: '',
    fullName: '',
    toggleLoggedIn: async () => {
        if (!get().isLoggedIn) {
            const user = await axios.get('http://localhost:5000/user', {
                withCredentials: true
            });
            set(_ => ({ userName: user.data.userName, fullName: user.data.fullName }));
        } else {
            await axios.get('http://localhost:5000/logout', {
                withCredentials: true
            });
        }
        set(state => ({ isLoggedIn: !state.isLoggedIn }));
    },
}), {
    name: "user-data",
    getStorage: () => sessionStorage
}));

export default LoginStatusStore;