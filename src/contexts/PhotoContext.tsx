import React, { createContext } from 'react';
import { type Image } from '@/types';

interface PhotoContextType {
  photos: Image[];
  loading: boolean;
  error: string | null;
  fetchPhotos: () => Promise<void>;
  uploadPhoto: (username: string, file: File) => Promise<{ success: boolean; error?: string }>;
}

export const PhotoContext = createContext<PhotoContextType>({
  photos: [],
  loading: false,
  error: null,
  fetchPhotos: async () => {},
  uploadPhoto: async () => ({ success: false }),
});

interface PhotoProviderProps {
  value: PhotoContextType;
  children: React.ReactNode;
}

export const PhotoProvider: React.FC<PhotoProviderProps> = ({ value, children }) => {
  return (
    <PhotoContext.Provider value={value}>
      {children}
    </PhotoContext.Provider>
  );
};

