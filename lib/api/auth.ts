import axios from 'axios';
import { LoginDTO, SignupDTO, AuthResponse } from '@/lib/types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://todo-app.pioneeralpha.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: async (credentials: LoginDTO): Promise<AuthResponse> => {
    const { data } = await api.post('/api/auth/login/', credentials);
    return data;
  },

  signup: async (userData: SignupDTO): Promise<AuthResponse> => {
    const { data } = await api.post('/api/users/signup/', userData);
    return data;
  },

  logout: async (): Promise<void> => {
    await api.post('/api/auth/logout');
    localStorage.removeItem('token');
  },

  getCurrentUser: async () => {
    const { data } = await api.get('/api/users/me/');
    return data;
  },
};