import axios from 'axios';

const API_URL = 'http://localhost:5000/tasks'; // Adjust based on your backend URL

export const getTasks = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error; // Rethrow the error if you want to handle it later
    }
};

export const createTask = async (task) => {
    try {
        const response = await axios.post(API_URL, task);
        return response.data;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};

export const updateTask = async (id, task) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, task);
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};

export const deleteTask = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};