export interface Image {
  _id: string;
  user: string;
  name: string;
  src: string;
  likes: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface UploadPhotoRequest {
  username: string;
  file: File;
}

export interface User {
  username: string;
}
