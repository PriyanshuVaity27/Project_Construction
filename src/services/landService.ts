import api from './api';
import { LandParcel } from '../types';

export const landService = {
  async getLandParcels(params?: {
    skip?: number;
    limit?: number;
    zone?: string;
    city?: string;
  }): Promise<LandParcel[]> {
    const response = await api.get('/land', { params });
    return response.data;
  },

  async createLandParcel(landData: Omit<LandParcel, 'id' | 'createdAt'>): Promise<LandParcel> {
    const response = await api.post('/land', landData);
    return response.data;
  },

  async updateLandParcel(id: string, landData: Partial<LandParcel>): Promise<LandParcel> {
    const response = await api.put(`/land/${id}`, landData);
    return response.data;
  },

  async deleteLandParcel(id: string): Promise<void> {
    await api.delete(`/land/${id}`);
  },

  async getLandParcel(id: string): Promise<LandParcel> {
    const response = await api.get(`/land/${id}`);
    return response.data;
  }
};