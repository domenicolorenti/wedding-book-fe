import { Text, Image as Img, Box, VStack, Button, Portal, CloseButton, Drawer, Spinner } from '@chakra-ui/react';
import { FaRegHeart } from 'react-icons/fa';
import { useState, memo } from 'react';
import { ImageCarousel } from '.';
import { type Image } from '@/types';
import { apiService } from '@/services/api';
import { appTheme } from '@/config/theme';

interface CardProps {
    photo: Image;
}

const Card = ({ photo }: CardProps) => {
    const [open, setOpen] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handleImageError = () => {
        setImageError(true);
        setImageLoaded(true);
    };

    return (
        <Drawer.Root open={open} placement="bottom" onOpenChange={(e) => setOpen(e.open)}>
            <Drawer.Trigger asChild>
                <Button
                    bg={appTheme.colors.cardBg}
                    color="gray.900"
                    rounded="2xl"
                    borderColor="#888"
                    p={0}
                    w="full"
                    h="auto"
                    _hover={{ transform: 'scale(1.02)', transition: 'transform 0.2s' }}
                    _active={{ transform: 'scale(0.98)' }}
                >
                    <VStack gap={0} w="full" position="relative">
                        {!imageLoaded && !imageError && (
                            <Box
                                w="full"
                                aspectRatio={4 / 3}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                bg="gray.100"
                                roundedTop="2xl"
                            >
                                <Spinner size="md" />
                            </Box>
                        )}
                        {imageError ? (
                            <Box
                                w="full"
                                aspectRatio={4 / 3}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                bg="gray.200"
                                roundedTop="2xl"
                            >
                                <Text fontSize="2xl">📷</Text>
                            </Box>
                        ) : (
                            <Img
                                roundedTop="2xl"
                                aspectRatio={4 / 3}
                                src={apiService.getPhotoUrl(photo._id)}
                                onLoad={handleImageLoad}
                                onError={handleImageError}
                                display={imageLoaded ? 'block' : 'none'}
                                alt={`Foto di ${photo.user}`}
                            />
                        )}
                        <Box w="full" px="4" py="1">
                            <Text fontSize="xl" display="flex" alignItems="center" gap={1}>
                                <FaRegHeart />
                                {photo.likes.length}
                            </Text>
                        </Box>
                    </VStack>
                </Button>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content bg="white" roundedTop="2xl" color="gray.900">
                        <Drawer.Body>
                            <ImageCarousel photo={photo} />
                        </Drawer.Body>
                        <Drawer.CloseTrigger asChild>
                            <CloseButton size="xl" color="gray.600" aria-label="Chiudi" />
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    );
};

export default memo(Card);