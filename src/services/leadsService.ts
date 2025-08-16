import api from './api';
import { Lead } from '../types';

export interface LeadsListResponse {
  items: Lead[];
  total: number;
  page: number;
  limit: number;
}

export const leadsService = {
  async getLeads(params?: {
    skip?: number;
    limit?: number;
    status?: string;
    city?: string;
  }): Promise<Lead[]> {
    const response = await api.get('/leads', { params });
    return response.data;
  },

  async createLead(leadData: Omit<Lead, 'id' | 'createdAt'>): Promise<Lead> {
    const response = await api.post('/leads', leadData);
    return response.data;
  },

  async updateLead(id: string, leadData: Partial<Lead>): Promise<Lead> {
    const response = await api.put(`/leads/${id}`, leadData);
    return response.data;
  },

  async deleteLead(id: string): Promise<void> {
    await api.delete(`/leads/${id}`);
  },

  async getLead(id: string): Promise<Lead> {
    const response = await api.get(`/leads/${id}`);
    return response.data;
  }
};