import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';

const useRegisterStore = create(
    devtools(
        persist(
            (set) => ({
                registerInfo: {
                    fullname: '',
                    phone: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                },
                setFullname: (fullname) =>
                    set((state) => ({
                        registerInfo: {
                            ...state.registerInfo,
                            fullname,
                        },
                    })),
                setPhone: (phone) =>
                    set((state) => ({
                        registerInfo: {
                            ...state.registerInfo,
                            phone,
                        },
                    })),
                setEmail: (email) =>
                    set((state) => ({
                        registerInfo: {
                            ...state.registerInfo,
                            email,
                        },
                    })),
                setPassword: (password) =>
                    set((state) => ({
                        registerInfo: {
                            ...state.registerInfo,
                            password,
                        },
                    })),
                setConfirmPassword: (confirmPassword) =>
                    set((state) => ({
                        registerInfo: {
                            ...state.registerInfo,
                            confirmPassword,
                        },
                    })),
                clearRegisterInfo: () =>
                    set({
                        registerInfo: {
                            email: '',
                            password: '',
                            confirmPassword: '',
                            fullname: '',
                            phone: '',
                        },
                    }),
            }),
            {
                name: 'register-store',
                storage: createJSONStorage(() => sessionStorage),
            },
        ),
    ),
);

export default useRegisterStore;
