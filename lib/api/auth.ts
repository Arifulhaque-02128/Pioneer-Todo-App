import axios from 'axios';
import { ILogin, ISignup, AuthResponse, SignupResponse } from '@/lib/types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isAuthEndpoint = error.config.url?.includes('/login') || 
                            error.config.url?.includes('/signup');
      if (!isAuthEndpoint) {
        console.error('Unauthorized request - token may be invalid');
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (credentials: ILogin): Promise<AuthResponse> => {
    const { data } = await api.post('/api/auth/login/', credentials);
    return data;
  },

  signup: async (userData: ISignup): Promise<SignupResponse> => {
    const formData = new FormData();
    formData.append('first_name', userData.first_name);
    formData.append('last_name', userData.last_name);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    
    const { data } = await api.post('/api/users/signup/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async (token?: string) => {
    const config = token ? {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } : {};
    
    const { data } = await api.get('/api/users/me/', config);
    return data;
  },

  updateProfile: async (profileData: {
    first_name?: string;
    last_name?: string;
    address?: string;
    contact_number?: string;
    birthday?: string;
    bio?: string;
    profile_image?: File | null;
  }) => {
    const formData = new FormData();
    
    if (profileData.first_name) formData.append('first_name', profileData.first_name);
    if (profileData.last_name) formData.append('last_name', profileData.last_name);
    if (profileData.address) formData.append('address', profileData.address);
    if (profileData.contact_number) formData.append('contact_number', profileData.contact_number);
    if (profileData.birthday) formData.append('birthday', profileData.birthday);
    if (profileData.bio) formData.append('bio', profileData.bio);
    if (profileData.profile_image) formData.append('profile_image', profileData.profile_image);

    const { data } = await api.patch('/api/users/me/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },
};