import { VStack, Text, Box, Center, Spinner, Flex } from '@chakra-ui/react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login, Home } from './pages';
import { useAuth } from './hooks';
import { AuthProvider } from './contexts/AuthContext';
import { appTheme } from './config/theme';
import ErrorBoundary from './components/ErrorBoundary';
import { Toaster } from './components/ui/toaster';
import bgImage from './assets/bg-no-flowers.svg';
import Leaderboard from './pages/Leaderboard';

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
        position="fixed"
        top={0}
        left={0}
        w="100%"
        h="100%"
        zIndex={-1}
        bg={appTheme.colors.background}
        backgroundImage={`url(${bgImage})`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      />
      <Flex
        direction="column"
        color={appTheme.colors.text}
        fontFamily="Serif"
        minH="100vh"
        css={globalStyles}
      >
        <Box flex="1">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path='/leaderboard' element={<Leaderboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
        <Box py={8} textAlign="center">
          <VStack gap={0}>
            <Text fontSize="xs" letterSpacing="0.2em" textTransform="uppercase" opacity={0.6}>
              Wedding Book
            </Text>
            <Text fontSize="10px" opacity={0.4} mt={1}>
              Creato da Domenico Lorenti
            </Text>
          </VStack>
        </Box>
      </Flex>
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
