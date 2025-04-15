import axios from './axioConfig';

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post('/user/login', { email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Network error occurred' };
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await axios.post('/user/register', userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Network error occurred' };
    }
};

export const logoutUser = async () => {
    try {
        const response = await axios.post('/user/logout');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Network error occurred' };
    }
};