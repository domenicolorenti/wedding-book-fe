import { Fieldset, Stack, Field, Input, Button, Spinner } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { appTheme } from '@/config/theme';
import { toaster } from '@/components/ui/toaster';

const Login = () => {
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

        if (!result.success) {
            setLocalError(result.error || 'Errore durante il login');
            toaster.create({
                title: 'Errore',
                description: result.error || 'Errore durante il login',
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
        <form onSubmit={handleSubmit}>
            <Fieldset.Root
                my="10%"
                size="lg"
                maxW="md"
                p="4"
            >
                <Stack>
                    <Fieldset.HelperText fontSize="lg" textAlign="center">
                        Ciao!
                        <br />
                        Benvenuto su Wedding Book!
                        <br />
                        <br />
                        Qui potrai caricare le foto più uniche e divertenti!
                        La foto più bella sarà premiata alla fine dell'evento!
                        <br />
                        <br />
                        Inserisci il Nome per cominciare
                    </Fieldset.HelperText>
                </Stack>

                <Fieldset.Content>
                    <Field.Root invalid={!!displayError}>
                        <Field.Label fontSize="lg">Nome</Field.Label>
                        <Input
                            name="name"
                            fontSize="16px"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            rounded="2xl"
                            type="text"
                            placeholder="Il tuo nome"
                            disabled={loading}
                            autoComplete="name"
                            aria-label="Inserisci il tuo nome"
                            maxLength={50}
                        />
                        {displayError && (
                            <Field.ErrorText color="red.600" textAlign="center" mt={2}>
                                {displayError}
                            </Field.ErrorText>
                        )}
                    </Field.Root>
                </Fieldset.Content>

                <Button
                    type="submit"
                    rounded="2xl"
                    mx="auto"
                    px="8"
                    py={6}
                    fontWeight="semibold"
                    shadow="md"
                    bg={appTheme.colors.primary}
                    color="gray.900"
                    _hover={{ bg: '#98AA97' }}
                    _active={{ bg: 'orange.100', shadow: '2xl' }}
                    disabled={loading || !username.trim()}
                    minW="150px"
                >
                    {loading ? <Spinner size="sm" /> : 'Entra'}
                </Button>
            </Fieldset.Root>
        </form>
    );
};

export default Login;