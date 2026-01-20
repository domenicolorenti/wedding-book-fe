import { Spinner, VStack, Text, Box } from '@chakra-ui/react';
import { useState, useContext } from 'react';
import { Menu } from './Menu';
import PhotoGrid from './PhotoGrid';
import { PhotoContext } from '@/contexts/PhotoContext';

const Tabs = () => {
    const [active, setActive] = useState('Home');
    const { photos, loading, error, fetchPhotos } = useContext(PhotoContext);

    if (error) {
        return (
            <VStack w="full" py={8}>
                <Text fontSize="xl" color="red.600">
                    😔 {error}
                </Text>
                <Text fontSize="md" color="gray.600" mt={2}>
                    Riprova più tardi
                </Text>
            </VStack>
        );
    }

    return (
        <VStack w="full" gap={0}>
            <Box 
                position="sticky" 
                top="80px" 
                zIndex={40} 
                py={4} 
                w="full" 
                display="flex" 
                justifyContent="center"
                pointerEvents="none"
            >
                <Box pointerEvents="auto">
                    <Menu setActive={setActive} active={active} fetchImages={fetchPhotos} />
                </Box>
            </Box>
            
            {loading ? (
                <VStack py={12}>
                    <Spinner size="xl" color="gray.600" />
                    <Text color="gray.500" fontSize="sm">Caricamento foto...</Text>
                </VStack>
            ) : (
                <PhotoGrid active={active} photos={photos} />
            )}
        </VStack>
    );
};

export default Tabs;