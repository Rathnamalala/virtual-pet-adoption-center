// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/pets';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
);

export const petApi = {
  getAllPets: () => api.get('/'),
  getPetById: (id) => api.get(`/${id}`),
  createPet: (petData) => api.post('/', petData),
  updatePet: (id, petData) => api.put(`/${id}`, petData),
  adoptPet: (id) => api.patch(`/${id}/adopt`),
  deletePet: (id) => api.delete(`/${id}`),
  filterPetsByMood: (mood) => api.get(`/filter?mood=${mood}`),
};

export default api;