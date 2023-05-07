import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
});

const get = (url, config) => {
    return axiosInstance.get(url, config);
};

const post = (url, data, config) => {
    return axiosInstance.post(url, data, config);
};

const put = (url, data, config) => {
    return axiosInstance.put(url, data, config);
};

const patch = (url, data, config) => {
    return axiosInstance.patch(url, data, config);
};

const del = (url, config) => {
    return axiosInstance.delete(url, config);
};

export { get, post, put, patch, del };
