import axios from './axioConfig';

export const getAllQuestions = async () => {
    try {
        const response = await axios.get('/question/all');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Network error occurred' };
    }
};

export const getQuestionById = async (id) => {
    try {
        const response = await axios.get(`/question/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Network error occurred' };
    }
};

export const submitSolution = async (questionId, solution) => {
    try {
        const response = await axios.post(`/question/${questionId}/submit`, { solution });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Network error occurred' };
    }
};