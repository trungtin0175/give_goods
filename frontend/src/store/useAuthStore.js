import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';

const useAuthStore = create(
    devtools(
        persist(
            (set) => ({
                token: '',
                user: {},
                setToken: (token) => set((state) => ({ token })),
                setUser: (user) => set({ user }),
                login: (payload) =>
                    set({
                        token: payload.accessToken,
                        user: payload.user,
                    }),
                logout: () =>
                    set({
                        token: '',
                        user: {},
                    }),
            }),
            {
                name: 'auth-store', // unique name
                storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
            },
        ),
    ),
);

export default useAuthStore;
