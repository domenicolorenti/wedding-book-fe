import { useState, useCallback } from 'react';
import { apiService } from '@/services/api';
import { type Image } from '@/types';

export const useLikes = (photo: Image, username: string) => {
  const [isLiked, setIsLiked] = useState(() => photo.likes.includes(username));
  const [likeCount, setLikeCount] = useState(photo.likes.length);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLike = useCallback(async () => {
    // Optimistic update
    const previousLiked = isLiked;
    const previousCount = likeCount;

    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    setIsLoading(true);

    try {
      if (isLiked) {
        await apiService.unlikePhoto(username, photo._id);
      } else {
        await apiService.likePhoto(username, photo._id);
      }
      
      // Update the photo object
      if (isLiked) {
        photo.likes = photo.likes.filter((u) => u !== username);
      } else {
        photo.likes = [...photo.likes, username];
      }
    } catch (error) {
      // Revert on error
      setIsLiked(previousLiked);
      setLikeCount(previousCount);
      console.error('Like/unlike failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLiked, likeCount, username, photo]);

  return {
    isLiked,
    likeCount,
    isLoading,
    toggleLike,
  };
};

