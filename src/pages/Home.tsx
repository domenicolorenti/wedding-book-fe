import { Tabs } from '@/components/ui';
import PhotoButton from '@/components/ui/PhotoButton';
import { VStack, Text, Flex, Box, Container, Separator } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthContext';
import { PhotoProvider } from '@/contexts/PhotoContext';
import { usePhotos } from '@/hooks';
import { appTheme } from '@/config/theme';

const Home = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const photosData = usePhotos();

    useEffect(() => {
        if (!user) {
            navigate('/wedding-book-fe/login');
        }
    }, [user, navigate]);

    return (
        <PhotoProvider value={photosData}>
            <Box w="full">
                <Container maxW="4xl" pt={{ base: 6, md: 12 }} pb={8} px={{ base: 4, md: 8 }}>
                    {/* Header with welcome and logout */}
                    <Flex justify="space-between" align="center" mb={12}>
                        <VStack align="start" gap={0}>
                            <Text fontSize="xs" fontWeight="bold" letterSpacing="0.2em" textTransform="uppercase" color="gray.500">
                                Wedding Book
                            </Text>
                            <Text fontSize="2xl" fontFamily="serif">
                                Ciao, {user}
                            </Text>
                        </VStack>
                    </Flex>

                    {/* Hero Section */}
                    <VStack gap={8} align="center" textAlign="center" mb={16}>
                        <Box>
                            <Text fontSize={{ base: "5xl", md: "7xl" }} lineHeight="1" fontFamily="serif" mb={2}>
                                Cattura ogni
                            </Text>
                            <Text fontSize={{ base: "5xl", md: "7xl" }} lineHeight="1" fontFamily="serif" fontStyle="italic" color={appTheme.colors.primary}>
                                emozione
                            </Text>
                        </Box>
                        
                        <Text fontSize="lg" color="gray.600" maxW="md">
                            Contribuisci al racconto di questa giornata speciale. Scatta una foto e condividila con noi!
                        </Text>

                        <Box w="full" maxW="sm" mt={4}>
                            <PhotoButton />
                        </Box>
                    </VStack>

                    <Separator mb={10} borderColor="gray.200" />

                    {/* Gallery Title */}
                    <Flex align="center" gap={4} mb={8}>
                        <Text fontSize="2xl" fontFamily="serif">Galleria</Text>
                        <Box h="1px" flex={1} bg="gray.100" />
                    </Flex>
                </Container>

                {/* Gallery Section - Full Width */}
                <Box w="full" px={{ base: 0, md: 4 }}>
                    <Tabs />
                </Box>
            </Box>
        </PhotoProvider>
    );
};

export default Home;