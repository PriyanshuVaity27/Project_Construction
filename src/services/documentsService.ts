import api from './api';

export interface Document {
  id: string;
  file_name: string;
  file_url: string;
  file_size?: string;
  content_type?: string;
  uploaded_by: string;
  description?: string;
  created_at: string;
}

export const documentsService = {
  async uploadDocument(file: File, description?: string): Promise<Document> {
    const formData = new FormData();
    formData.append('file', file);
    if (description) {
      formData.append('description', description);
    }

    const response = await api.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async getDocuments(params?: {
    skip?: number;
    limit?: number;
  }): Promise<Document[]> {
    const response = await api.get('/documents', { params });
    return response.data;
  },

  async deleteDocument(id: string): Promise<void> {
    await api.delete(`/documents/${id}`);
  },

  async getDocument(id: string): Promise<Document> {
    const response = await api.get(`/documents/${id}`);
    return response.data;
  }
};