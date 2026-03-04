import { API_BASE_URL } from '../api';

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
        throw new Error(error.message || response.statusText);
    }
    return response.json();
};

const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const apiService = {
    login: async (username, password) => {
        const response = await fetch(`${API_BASE_URL}/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        return handleResponse(response);
    },

    getClothes: async (params = {}) => {
        const query = new URLSearchParams();
        if (params.page) query.append('page', params.page);
        if (params.limit) query.append('limit', params.limit);
        if (params.category) query.append('category', params.category);
        if (params.popular) query.append('popular', 'true');
        if (params.seasonal) query.append('seasonal', 'true');

        const response = await fetch(`${API_BASE_URL}/clothes?${query.toString()}`);
        return handleResponse(response);
    },

    createCloth: async (formData) => {
        const response = await fetch(`${API_BASE_URL}/clothes`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: formData,
        });
        return handleResponse(response);
    },

    updateCloth: async (id, formData) => {
        const response = await fetch(`${API_BASE_URL}/clothes/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: formData,
        });
        return handleResponse(response);
    },

    deleteCloth: async (id) => {
        const response = await fetch(`${API_BASE_URL}/clothes/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        return handleResponse(response);
    }
};
