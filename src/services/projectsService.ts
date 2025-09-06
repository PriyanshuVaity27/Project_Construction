import api from './api';
import { ProjectMaster } from '../types';

export const projectsService = {
  async getProjects(params?: {
    skip?: number;
    limit?: number;
    type?: string;
    status?: string;
    city?: string;
  }): Promise<ProjectMaster[]> {
    const response = await api.get('/projects', { params });
    return response.data;
  },

  async createProject(projectData: Omit<ProjectMaster, 'id' | 'createdAt'>): Promise<ProjectMaster> {
    const response = await api.post('/projects', projectData);
    return response.data;
  },

  async updateProject(id: string, projectData: Partial<ProjectMaster>): Promise<ProjectMaster> {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
  },

  async deleteProject(id: string): Promise<void> {
    await api.delete(`/projects/${id}`);
  },

  async getProject(id: string): Promise<ProjectMaster> {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  }
};