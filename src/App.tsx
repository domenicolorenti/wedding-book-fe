import { VStack, Text } from '@chakra-ui/react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login, Home } from './pages';
import { useAuth } from './hooks';
import { AuthProvider } from './contexts/AuthContext';
import { appTheme } from './config/theme';
import ErrorBoundary from './components/ErrorBoundary';
import { Toaster } from './components/ui/toaster';

function AppContent() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <VStack
        bg={appTheme.colors.background}
        minH="100vh"
        justify="center"
        align="center"
        color={appTheme.colors.text}
        fontFamily="Serif"
      >
        <Text fontSize="2xl">Caricamento...</Text>
      </VStack>
    );
  }

  return (
    <AuthProvider user={user} logout={logout}>
      <VStack
        bg={appTheme.colors.background}
        py="8"
        color={appTheme.colors.text}
        fontFamily="Serif"
        minH="100vh"
      >
        <Routes>
          <Route path="/wedding-book-fe/login" element={<Login />} />
          <Route path="/wedding-book-fe" element={<Home />} />
          <Route path="*" element={<Navigate to="/wedding-book-fe" replace />} />
        </Routes>
      </VStack>
      <Toaster />
    </AuthProvider>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

export default App;
