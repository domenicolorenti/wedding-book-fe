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
                    role="group"
                    bg="white"
                    rounded="none"
                    p={0}
                    w="full"
                    h="auto"
                    overflow="hidden"
                    _hover={{ filter: 'brightness(0.95)' }}
                    transition="all 0.3s ease"
                    border="none"
                >
                    <VStack gap={0} w="full" position="relative" h="full">
                        {!imageLoaded && !imageError && (
                            <Box
                                w="full"
                                aspectRatio={1}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                bg="gray.100"
                            >
                                <Spinner size="md" />
                            </Box>
                        )}
                        {imageError ? (
                            <Box
                                w="full"
                                aspectRatio={1}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                bg="gray.200"
                            >
                                <Text fontSize="2xl">📷</Text>
                            </Box>
                        ) : (
                            <Img
                                aspectRatio={1}
                                w="full"
                                objectFit="cover"
                                src={apiService.getPhotoUrl(photo._id)}
                                onLoad={handleImageLoad}
                                onError={handleImageError}
                                display={imageLoaded ? 'block' : 'none'}
                                alt={`Foto di ${photo.user}`}
                                transition="transform 0.5s"
                                _groupHover={{ transform: 'scale(1.1)' }}
                                pointerEvents="none"
                                userSelect="none"
                                draggable={false}
                            />
                        )}
                        <Box 
                            position="absolute" 
                            bottom={0} 
                            left={0} 
                            right={0} 
                            bg="linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)"
                            p={4}
                            display="flex"
                            justifyContent="flex-end"
                        >
                            <Text fontSize="sm" fontWeight="medium" color="white" display="flex" alignItems="center" gap={1.5}>
                                <FaRegHeart /> {photo.likes.length}
                            </Text>
                        </Box>
                    </VStack>
                </Button>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Backdrop bg="black/90" backdropFilter="blur(4px)" />
                <Drawer.Positioner>
                    <Drawer.Content bg="black" h="100dvh" maxH="100dvh" rounded="none" border="none" w="full" maxW="100vw">
                        <Drawer.Body p={0} h="full">
                            <ImageCarousel photo={photo} />
                        </Drawer.Body>
                        <Drawer.CloseTrigger asChild>
                            <CloseButton 
                                size="lg" 
                                color="white" 
                                aria-label="Chiudi" 
                                position="absolute"
                                top={6}
                                right={6}
                                zIndex={50}
                                bg="white/10"
                                rounded="full"
                                _hover={{ bg: "white/20" }}
                            />
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    );
};

export default memo(Card);