import api from './api';
import { User } from '../types';

export const usersService = {
  async getUsers(params?: {
    skip?: number;
    limit?: number;
  }): Promise<User[]> {
    const response = await api.get('/users', { params });
    return response.data;
  },

  async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const response = await api.post('/users', userData);
    return response.data;
  },

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  async deleteUser(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  },

  async getUser(id: string): Promise<User> {
    const response = await api.get(`/users/${id}`);
    return response.data;
  }
};