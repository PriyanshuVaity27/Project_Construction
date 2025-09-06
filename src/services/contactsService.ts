import api from './api';
import { Contact } from '../types';

export const contactsService = {
  async getContacts(params?: {
    skip?: number;
    limit?: number;
    type?: string;
    city?: string;
  }): Promise<Contact[]> {
    const response = await api.get('/contacts', { params });
    return response.data;
  },

  async createContact(contactData: Omit<Contact, 'id' | 'createdAt'>): Promise<Contact> {
    const response = await api.post('/contacts', contactData);
    return response.data;
  },

  async updateContact(id: string, contactData: Partial<Contact>): Promise<Contact> {
    const response = await api.put(`/contacts/${id}`, contactData);
    return response.data;
  },

  async deleteContact(id: string): Promise<void> {
    await api.delete(`/contacts/${id}`);
  },

  async getContact(id: string): Promise<Contact> {
    const response = await api.get(`/contacts/${id}`);
    return response.data;
  }
};