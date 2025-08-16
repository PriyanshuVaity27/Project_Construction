import api from './api';
import { User } from '../types';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get('/auth/me');
    return response.data;
  },

  async register(userData: any): Promise<User> {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  }
};