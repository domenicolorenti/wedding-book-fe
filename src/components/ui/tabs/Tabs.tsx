import { Spinner, VStack, Text } from '@chakra-ui/react';
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
        <VStack w="full">
            <Menu setActive={setActive} active={active} fetchImages={fetchPhotos} />
            {loading ? (
                <Spinner mt="4" size="xl" color="gray.600" />
            ) : (
                <PhotoGrid active={active} photos={photos} />
            )}
        </VStack>
    );
};

export default Tabs;