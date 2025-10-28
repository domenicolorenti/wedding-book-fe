import { useState, useEffect, useCallback } from 'react';
import { apiService } from '@/services/api';
import { type Image } from '@/types';

export const usePhotos = () => {
  const [photos, setPhotos] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.getPhotos();
      const sortedPhotos = response.data.data.slice().reverse();
      setPhotos(sortedPhotos);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nel caricamento delle foto';
      setError(errorMessage);
      console.error('Error fetching photos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  const uploadPhoto = useCallback(async (username: string, file: File) => {
    try {
      const response = await apiService.uploadPhoto(username, file);
      if (response.status === 200 || response.status === 201) {
        // Refresh photos after upload
        await fetchPhotos();
        return { success: true };
      }
      return { success: false, error: 'Upload fallito' };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore durante il caricamento';
      return { success: false, error: errorMessage };
    }
  }, [fetchPhotos]);

  return {
    photos,
    loading,
    error,
    fetchPhotos,
    uploadPhoto,
  };
};

