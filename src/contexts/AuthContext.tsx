import React, { createContext } from 'react';

interface AuthContextType {
  user: string;
}

export const AuthContext = createContext<AuthContextType>({
  user: ''
});

interface AuthProviderProps {
  user: string;
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ user, children }) => {
  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

