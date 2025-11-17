import axios from 'axios';
import { Todo, CreateTodoDTO, UpdateTodoDTO } from '@/lib/types/todo';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://todo-app.pioneeralpha.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('token');
//   console.log("%c 🇸🇽: token ", "font-size:16px;background-color:#455591;color:white;", token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const todosAPI = {
  getAll: async (): Promise<Todo[]> => {
    const { data } = await api.get('api/todos/');
    // console.log("TODOOO :::", data)
    return data.results;
  },

  create: async (todo: CreateTodoDTO): Promise<Todo> => {
    const formData = new FormData();
    Object.entries(todo).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as any);
      }
    });

    const { data } = await api.post('api/todos/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return data;
  },

  update: async (id: string, todo: UpdateTodoDTO): Promise<Todo> => {
    const { data } = await api.put(`/api/todos/${id}/`, todo);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/todos/${id}/`);
  },

//   reorder: async (todos: { id: string; position: number }[]): Promise<void> => {
//     await api.patch('api/todos/', { todos });
//   },
};