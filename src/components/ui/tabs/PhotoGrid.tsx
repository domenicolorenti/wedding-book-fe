import { Grid, Text, VStack } from '@chakra-ui/react';
import { Card } from '..';
import { useContext, useMemo } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { type Image } from '@/types';
import React from 'react';

interface PhotoGridProps {
    active: string;
    photos: Image[];
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ active, photos }) => {
    const { user } = useContext(AuthContext);

    const filteredImages = useMemo(() => {
        if (!photos || photos.length === 0) return [];
        if (active === 'Home') {
            return photos;
        }
        return photos.filter((image: Image) => image.user === user);
    }, [photos, active, user]);

    if (filteredImages.length === 0) {
        return (
            <VStack w="full" py={12} px={4}>
                <Text fontSize="3xl" mb={2}>
                    📷
                </Text>
                <Text fontSize="xl" fontWeight="bold" textAlign="center">
                    {active === 'Home' ? 'Nessuna foto ancora' : 'Non hai ancora foto'}
                </Text>
                <Text fontSize="md" color="gray.600" textAlign="center" mt={2}>
                    {active === 'Home'
                        ? 'Sii il primo a condividere una foto!'
                        : 'Carica la tua prima foto per vederla qui'}
                </Text>
            </VStack>
        );
    }

    return (
        <Grid w="full" p={4} gap={4} templateColumns="repeat(2, 1fr)">
            {filteredImages.map((image: Image) => (
                <Card key={image._id} photo={image} />
            ))}
        </Grid>
    );
};

export default React.memo(PhotoGrid);