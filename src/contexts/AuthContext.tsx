import React, { createContext } from 'react';

interface AuthContextType {
  user: string;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: '',
  logout: () => {},
});

interface AuthProviderProps {
  user: string;
  logout: () => void;
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ user, logout, children }) => {
  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

