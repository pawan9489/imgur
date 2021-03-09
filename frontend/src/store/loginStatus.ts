import create from 'zustand'

type State = {
    isLoggedIn: boolean
    toggleLoggedIn: () => void
}

const LoginStatusStore = create<State>(set => ({
    isLoggedIn: false,
    toggleLoggedIn: () => set(state => ({ isLoggedIn: !state.isLoggedIn })),
}));

export default LoginStatusStore;