import axios, { type AxiosInstance } from 'axios';

const API_BASE_URL = import.meta.env.VITE_BE_URL;

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
          throw new Error('Server non raggiungibile');
        }
        throw error;
      }
    );
  }

  // User endpoints
  async addUser(username: string) {
    return this.api.post('/addUser', { username });
  }

  // Photo endpoints
  async getPhotos() {
    return this.api.get('/getPhotos');
  }

  async uploadPhoto(username: string, file: File) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('file', file);

    return this.api.post('/addPhoto', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  getPhotoUrl(photoId: string) {
    return `${API_BASE_URL}/download/${photoId}`;
  }

  // Like endpoints
  async likePhoto(username: string, photoId: string) {
    return this.api.get(`/like/${username}/${photoId}`);
  }

  async unlikePhoto(username: string, photoId: string) {
    return this.api.get(`/unlike/${username}/${photoId}`);
  }
}

export const apiService = new ApiService();

