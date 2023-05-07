import * as axiosInstance from '~/config/axiosInstance';
const login = async (data) => {
    const { email, password } = data;
    try {
        const res = await axiosInstance.post('login', {
            email,
            password,
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

const signUp = async (data) => {
    const { username, phonenumber, email, password } = data;
    try {
        const res = await axiosInstance.post('signup', {
            username,
            phonenumber,
            email,
            password,
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export { login, signUp };
