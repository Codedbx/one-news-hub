// src/services/api.js
// const BASE_URL = process.env.REACT_APP_API_URL;
const BASE_URL = "http://127.0.0.1:8000/api";

const api = {
  get: async (endpoint) => {
    const token = window.localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },

  post: async (endpoint, data) => {
    const token = window.localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }
};

export default api;