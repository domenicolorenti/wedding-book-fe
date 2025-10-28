import { useContext, useState, useEffect, useCallback } from 'react';
import { Box, Image, Text, VStack, Button, Icon, Spinner } from '@chakra-ui/react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { PhotoContext } from '@/contexts/PhotoContext';
import { AuthContext } from '@/contexts/AuthContext';
import { useLikes } from '@/hooks';
import { apiService } from '@/services/api';
import { type Image as ImageType } from '@/types';

interface LikeButtonProps {
    photo: ImageType;
    username: string;
}

const LikeButton = ({ photo, username }: LikeButtonProps) => {
    const { isLiked, likeCount, isLoading, toggleLike } = useLikes(photo, username);

    return (
        <Button
            bg="white"
            color="gray.900"
            outline="none"
            onClick={toggleLike}
            disabled={isLoading}
            _hover={{ bg: 'gray.50' }}
            _active={{ transform: 'scale(0.95)' }}
            minH="44px"
            aria-label={isLiked ? 'Rimuovi mi piace' : 'Mi piace'}
        >
            {isLoading ? (
                <Spinner size="sm" />
            ) : (
                <Text fontSize="xl" display="flex" w="full" alignItems="center" gap={1}>
                    {isLiked ? (
                        <Icon as={FaHeart} color="red.500" boxSize={8} />
                    ) : (
                        <Icon as={FaRegHeart} boxSize={8} />
                    )}
                    {likeCount}
                </Text>
            )}
        </Button>
    );
};

export const ImageCarousel = ({ photo }: { photo: ImageType }) => {
    const { user } = useContext(AuthContext);
    const { photos } = useContext(PhotoContext);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageLoadStates, setImageLoadStates] = useState<Record<string, boolean>>({});

    // Find initial index
    const initialIndex = photos.findIndex((p) => p._id === photo._id);

    const handleImageLoad = useCallback((photoId: string) => {
        setImageLoadStates((prev) => ({ ...prev, [photoId]: true }));
    }, []);

    const [sliderRef] = useKeenSlider({
        loop: photos.length > 1,
        initial: initialIndex >= 0 ? initialIndex : 0,
        slides: { perView: 1 },
        slideChanged(slider) {
            setCurrentIndex(slider.track.details.rel);
        },
    });

    useEffect(() => {
        setCurrentIndex(initialIndex >= 0 ? initialIndex : 0);
    }, [initialIndex]);

    const currentPhoto = photos[currentIndex];

    if (!currentPhoto) {
        return (
            <Box textAlign="center" py={8}>
                <Text>Nessuna foto disponibile</Text>
            </Box>
        );
    }

    return (
        <Box position="relative" width="full" overflow="hidden">
            <Box ref={sliderRef} className="keen-slider">
                {photos.map((image) => (
                    <VStack key={image._id} className="keen-slider__slide" gap={2}>
                        <Text
                            py="4"
                            textAlign="left"
                            fontSize="xl"
                            fontWeight="bold"
                            fontFamily="Serif"
                            w="full"
                        >
                            {image.user}
                        </Text>
                        <Box position="relative" w="full">
                            {!imageLoadStates[image._id] && (
                                <Box
                                    position="absolute"
                                    top="50%"
                                    left="50%"
                                    transform="translate(-50%, -50%)"
                                    zIndex={1}
                                >
                                    <Spinner size="lg" />
                                </Box>
                            )}
                            <Image
                                src={apiService.getPhotoUrl(image._id)}
                                aspectRatio={3 / 4}
                                maxH="68vh"
                                rounded="2xl"
                                loading="eager"
                                onLoad={() => handleImageLoad(image._id)}
                                alt={`Foto di ${image.user}`}
                            />
                        </Box>
                        <Box w="full" py="2">
                            <LikeButton photo={image} username={user} />
                        </Box>
                    </VStack>
                ))}
            </Box>
        </Box>
    );
};
