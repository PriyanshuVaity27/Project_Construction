import api from './api';
import { Developer } from '../types';

export const developersService = {
  async getDevelopers(params?: {
    skip?: number;
    limit?: number;
    type?: string;
    grade?: string;
    city?: string;
  }): Promise<Developer[]> {
    const response = await api.get('/developers', { params });
    return response.data;
  },

  async createDeveloper(developerData: Omit<Developer, 'id' | 'createdAt'>): Promise<Developer> {
    const response = await api.post('/developers', developerData);
    return response.data;
  },

  async updateDeveloper(id: string, developerData: Partial<Developer>): Promise<Developer> {
    const response = await api.put(`/developers/${id}`, developerData);
    return response.data;
  },

  async deleteDeveloper(id: string): Promise<void> {
    await api.delete(`/developers/${id}`);
  },

  async getDeveloper(id: string): Promise<Developer> {
    const response = await api.get(`/developers/${id}`);
    return response.data;
  }
};