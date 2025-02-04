import axios from 'axios';
import { BlogForm, CsrfResponse, PageResponse } from '../types/blog';

const API_BASE_URL = 'https://java-mongo.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  auth: {
    username: 'User',
    password: 'password'
  }
});

async function getCsrfToken(): Promise<string> {
  console.log('🔄 Obteniendo CSRF token...');
  const response = await api.get<CsrfResponse>('/csrf');
  console.log('✅ CSRF Token obtenido:', response.data);
  return response.data.csrfToken;
}

async function updateHeaders() {
  const csrfToken = await getCsrfToken();
  api.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
  api.defaults.headers.common['Content-Type'] = 'application/json';
  console.log('🔑 Headers actualizados con CSRF token');
}

export const blogApi = {
  async getAll(page: number = 0): Promise<PageResponse<BlogForm>> {
    console.log('🔄 Obteniendo blogs para la página:', page);
    await updateHeaders();
    const response = await api.get(`/blog-forms?page=${page}&size=10`);
    console.log('✅ Blogs obtenidos:', response.data);
    return response.data;
  },

  async getById(id: string): Promise<BlogForm> {
    console.log(`🔄 Obteniendo blog con ID ${id}...`);
    await updateHeaders();
    const response = await api.get(`/blog-forms/${id}`);
    console.log('✅ Blog obtenido:', response.data);
    return response.data;
  },

  async create(data: Omit<BlogForm, 'id'>): Promise<BlogForm> {
    console.log('🔄 Creando nuevo blog:', data);
    await updateHeaders();
    const response = await api.post('/blog-forms', data);
    console.log('✅ Blog creado:', response.data);
    return response.data;
  },

  async update(id: string, data: Omit<BlogForm, 'id'>): Promise<BlogForm> {
    console.log(`🔄 Actualizando blog ${id}:`, data);
    await updateHeaders();
    const response = await api.put(`/blog-forms/${id}`, data);
    console.log('✅ Blog actualizado:', response.data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    console.log(`🔄 Eliminando blog ${id}...`);
    await updateHeaders();
    await api.delete(`/blog-forms/${id}`);
    console.log('✅ Blog eliminado');
  }
};