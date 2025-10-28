import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Box, VStack, Text, Button } from '@chakra-ui/react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <VStack
          minH="100vh"
          bg="#F9F7F4"
          justify="center"
          align="center"
          p={8}
          gap={4}
        >
          <Box
            bg="white"
            p={8}
            rounded="2xl"
            shadow="lg"
            maxW="md"
            textAlign="center"
          >
            <Text fontSize="4xl" mb={4}>
              😔
            </Text>
            <Text fontSize="2xl" fontWeight="bold" mb={2}>
              Oops! Qualcosa è andato storto
            </Text>
            <Text fontSize="md" color="gray.600" mb={6}>
              Si è verificato un errore imprevisto. Prova a ricaricare la pagina.
            </Text>
            {import.meta.env.MODE === 'development' && this.state.error && (
              <Box
                bg="red.50"
                p={4}
                rounded="lg"
                mb={4}
                textAlign="left"
                fontSize="sm"
                overflow="auto"
              >
                <Text fontFamily="mono" color="red.700">
                  {this.state.error.toString()}
                </Text>
              </Box>
            )}
            <Button
              onClick={this.handleReload}
              bg="#A9BBA8"
              color="gray.900"
              rounded="xl"
              px={8}
              py={6}
              fontSize="lg"
              _hover={{ bg: '#98AA97' }}
            >
              Ricarica la pagina
            </Button>
          </Box>
        </VStack>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

