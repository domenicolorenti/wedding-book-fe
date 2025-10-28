import { Tabs } from '@/components/ui';
import PhotoButton from '@/components/ui/PhotoButton';
import { VStack, Text, Flex } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthContext';
import { PhotoProvider } from '@/contexts/PhotoContext';
import { usePhotos } from '@/hooks';

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
            <VStack pos="relative" w="full">
                {/* Header with welcome and logout */}
                <Flex w="90%" justify="space-between" align="center" mb={4}>
                    <Flex align="center" gap={2}>
                        <Text fontSize="lg">Benvenuto/a</Text>
                        <Text fontSize="lg" fontWeight="bold">
                            {user}
                        </Text>
                        !
                    </Flex>
                </Flex>

                {/* Title */}
                <Text fontSize="5xl" fontWeight="bold" mb={2}>
                    Wedding Book
                </Text>

                <Text fontSize="3xl" mt={4}>
                    Condividi le tue foto
                </Text>
                <Text fontSize="lg" color="gray.600">
                    Scatta una foto e condividila!
                </Text>

                <PhotoButton />

                <Text fontSize="3xl" mt={6}>
                    Le Foto
                </Text>

                <Tabs />
            </VStack>
        </PhotoProvider>
    );
};

export default Home;