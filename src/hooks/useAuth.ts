import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '@/services/api';
import { sanitizeUsername, validateUsername } from '@/utils/validation';

const STORAGE_KEY = 'wedding_username';

export const useAuth = () => {
  const [user, setUser] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY);
    if (savedUser) {
      setUser(savedUser);
    } else {
      navigate('/login');
    }
    setLoading(false);
  }, [navigate]);

  const login = useCallback(async (username: string) => {
    setError('');
    setLoading(true);

    try {
      // Validate input
      const validation = validateUsername(username);
      if (!validation.valid) {
        setError(validation.error || 'Input non valido');
        setLoading(false);
        return { success: false, error: validation.error };
      }

      const sanitizedUsername = sanitizeUsername(username);

      // Call API
      const response = await apiService.addUser(sanitizedUsername);

      if (response.status === 201) {
        localStorage.setItem(STORAGE_KEY, sanitizedUsername);
        setUser(sanitizedUsername);
        navigate('/');
        return { success: true };
      }
    } catch (err) {
      let errorMessage = 'Errore durante il login';

      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response?: { status?: number } };
        if (axiosError.response?.status === 409) {
          errorMessage = 'Questo nome è già in uso!';
        } else if (axiosError.response?.status === 400) {
          errorMessage = 'Questo input non è valido';
        } else if (axiosError.response?.status === 500) {
          errorMessage = 'Errore del server';
        }
      } else if (err instanceof Error && err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [navigate]);


  return {
    user,
    loading,
    error,
    login,
    isAuthenticated: !!user,
  };
};

