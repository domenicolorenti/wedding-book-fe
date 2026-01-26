import { Fieldset, Stack, Field, Input, Button, Spinner, Box, Flex, Text, Image } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { appTheme } from '@/config/theme';
import { toaster } from '@/components/ui/toaster';
import logo from "@/assets/logo.svg"

const Login = () => {

    const url = import.meta.env.VITE_BE_URL;

    const navigate = useNavigate();
    const { login, loading, error: authError, isAuthenticated } = useAuth();
    const [username, setUsername] = useState('');
    const [localError, setLocalError] = useState('');

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/wedding-book-fe');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError('');

        const result = await login(username);

        if (!result?.success) {
            setLocalError(result?.error || 'Errore durante il login');
            toaster.create({
                title: 'Errore',
                description: result?.error || 'Errore durante il login',
                type: 'error',
                duration: 3000,
            });
        } else {
            toaster.create({
                title: 'Benvenuto!',
                description: 'Login effettuato con successo',
                type: 'success',
                duration: 2000,
            });
        }
    };

    const displayError = localError || authError;

    return (
        <Flex direction="column" gap={8} align="center" justify="center" minH="80vh" px={4} w="full">
            
            <Box
                w="full"
                maxW="md"
                bg="white/80"
                backdropFilter="blur(20px)"
                p={{ base: 8, md: 10 }}
                pt={0}
                borderRadius="3xl"
                boxShadow="2xl"
                border="1px solid"
                borderColor="white"
            >
                <Image height={"160px"} src={logo} mx={"auto"}/>
                <form onSubmit={handleSubmit}>
                    <Fieldset.Root size="lg" w="full">
                        <Stack gap={6} w="full">
                            <Box textAlign="center" mb={4}>
                                <Text fontSize="3xl" fontFamily="serif" mb={2}>Benvenuto</Text>
                                <Text color="gray.500" fontSize="sm" lineHeight="relaxed">
                                    Partecipa al racconto del nostro matrimonio. {url}
                                    <br />
                                    Carica le tue foto più belle!
                                </Text>
                            </Box>

                            <Fieldset.Content>
                                <Field.Root invalid={!!displayError}>
                                    <Field.Label fontSize="sm" fontWeight="medium" color="gray.700">Come ti chiami?</Field.Label>
                                    <Input
                                        name="name"
                                        fontSize="lg"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        rounded="xl"
                                        size="xl"
                                        type="text"
                                        placeholder="Il tuo nome"
                                        disabled={loading}
                                        autoComplete="name"
                                        aria-label="Inserisci il tuo nome"
                                        maxLength={50}
                                        bg="white"
                                        border="0"
                                        _focus={{ ring: "2px", ringColor: appTheme.colors.primary, bg: "white" }}
                                        boxShadow="sm"
                                    />
                                    {displayError && (
                                        <Field.ErrorText color="red.500" fontSize="sm" mt={2}>
                                            {displayError}
                                        </Field.ErrorText>
                                    )}
                                </Field.Root>
                            </Fieldset.Content>

                            <Button
                                type="submit"
                                rounded="xl"
                                w="full"
                                py={7}
                                fontSize="lg"
                                fontWeight="semibold"
                                shadow="lg"
                                bg={appTheme.colors.primary}
                                color="gray.900"
                                _hover={{ transform: 'translateY(-2px)', shadow: 'xl', opacity: 0.9 }}
                                _active={{ transform: 'translateY(0)', shadow: 'md' }}
                                transition="all 0.2s"
                                disabled={loading || !username.trim()}
                            >
                                {loading ? <Spinner size="sm" color="gray.900" /> : 'Entra nel Wedding Book'}
                            </Button>
                        </Stack>
                    </Fieldset.Root>
                </form>
            </Box>
        </Flex>
    );
};

export default Login;