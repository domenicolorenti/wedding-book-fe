import { VStack, Text, Box, Center, Spinner } from '@chakra-ui/react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login, Home } from './pages';
import { useAuth } from './hooks';
import { AuthProvider } from './contexts/AuthContext';
import { appTheme } from './config/theme';
import ErrorBoundary from './components/ErrorBoundary';
import { Toaster } from './components/ui/toaster';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Center
        bg={appTheme.colors.background}
        minH="100vh"
        color={appTheme.colors.text}
      >
        <VStack gap={4}>
          <Spinner size="xl" color={appTheme.colors.primary} css={{ '--spinner-track-color': 'rgba(0,0,0,0.1)' }} />
          <Text fontSize="lg" fontFamily="serif" letterSpacing="widest">WEDDING BOOK</Text>
        </VStack>
      </Center>
    );
  }

  const globalStyles = {
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(0,0,0,0.1)',
      borderRadius: '3px',
    },
    '::selection': {
      background: appTheme.colors.primary,
      color: 'white',
    },
  };

  return (
    <AuthProvider user={user}>
      <Box
        bg={appTheme.colors.background}
        color={appTheme.colors.text}
        fontFamily="Serif"
        minH="100vh"
        backgroundImage={`radial-gradient(circle at 50% 0%, #ffffff 0%, ${appTheme.colors.background} 100%)`}
        css={globalStyles}
      >
        <Routes>
          <Route path="/wedding-book-fe/login" element={<Login />} />
          <Route path="/wedding-book-fe" element={<Home />} />
          <Route path="*" element={<Navigate to="/wedding-book-fe" replace />} />
        </Routes>
      </Box>
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
