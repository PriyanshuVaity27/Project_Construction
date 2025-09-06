import api from './api';
import { InventoryItem } from '../types';

export const inventoryService = {
  async getInventory(params?: {
    skip?: number;
    limit?: number;
    type?: string;
    status?: string;
    city?: string;
  }): Promise<InventoryItem[]> {
    const response = await api.get('/inventory', { params });
    return response.data;
  },

  async createInventoryItem(inventoryData: Omit<InventoryItem, 'id' | 'createdAt'>): Promise<InventoryItem> {
    const response = await api.post('/inventory', inventoryData);
    return response.data;
  },

  async updateInventoryItem(id: string, inventoryData: Partial<InventoryItem>): Promise<InventoryItem> {
    const response = await api.put(`/inventory/${id}`, inventoryData);
    return response.data;
  },

  async deleteInventoryItem(id: string): Promise<void> {
    await api.delete(`/inventory/${id}`);
  },

  async getInventoryItem(id: string): Promise<InventoryItem> {
    const response = await api.get(`/inventory/${id}`);
    return response.data;
  }
};