import { useContext, useState, useEffect, useCallback } from 'react';
import { Box, Image, Text, Button, Icon, Spinner } from '@chakra-ui/react';
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
            bg="white/10"
            backdropFilter="blur(12px)"
            color="white"
            rounded="full"
            h="auto"
            py={3}
            px={6}
            border="1px solid"
            borderColor="white/20"
            onClick={toggleLike}
            disabled={isLoading}
            _hover={{ bg: 'white/20', transform: 'scale(1.05)' }}
            _active={{ transform: 'scale(0.95)' }}
            transition="all 0.2s"
            aria-label={isLiked ? 'Rimuovi mi piace' : 'Mi piace'}
        >
            {isLoading ? (
                <Spinner size="sm" color="white" />
            ) : (
                <Text fontSize="lg" display="flex" alignItems="center" gap={3} fontWeight="medium">
                    {isLiked ? (
                        <Icon as={FaHeart} color="red.400" boxSize={6} />
                    ) : (
                        <Icon as={FaRegHeart} boxSize={6} />
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
        <Box position="relative" width="full" height="100%" bg="black" overflow="hidden">
            <Box ref={sliderRef} className="keen-slider" h="100%">
                {photos.map((image) => (
                    <Box key={image._id} className="keen-slider__slide" h="100%" position="relative">
                        {/* Top Gradient Overlay */}
                        <Box 
                            position="absolute" 
                            top={0} 
                            left={0} 
                            right={0} 
                            h="120px" 
                            bg="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)" 
                            zIndex={1}
                            pointerEvents="none"
                        />
                        
                        {/* User Info */}
                        <Box position="absolute" top={6} left={6} zIndex={2}>
                            <Text
                                fontSize="lg"
                                fontWeight="medium"
                                color="white"
                                fontFamily="serif"
                                letterSpacing="wide"
                                textShadow="0 2px 4px rgba(0,0,0,0.3)"
                            >
                                {image.user}
                            </Text>
                        </Box>

                        {/* Main Image Area */}
                        <Box w="full" h="full" display="flex" alignItems="center" justifyContent="center" position="relative">
                            {!imageLoadStates[image._id] && (
                                <Spinner size="xl" color="white" thickness="3px" position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" />
                            )}
                            <Image
                                src={apiService.getPhotoUrl(image._id)}
                                w="full"
                                h="full"
                                objectFit="contain"
                                loading="eager"
                                onLoad={() => handleImageLoad(image._id)}
                                alt={`Foto di ${image.user}`}
                                opacity={imageLoadStates[image._id] ? 1 : 0}
                                transition="opacity 0.4s ease-in-out"
                            />
                        </Box>

                        {/* Bottom Gradient & Controls */}
                        <Box 
                            position="absolute" 
                            bottom={0} 
                            left={0} 
                            right={0} 
                            h="160px" 
                            bg="linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)" 
                            zIndex={1}
                            pointerEvents="none"
                        />
                        
                        <Box position="absolute" bottom={10} width="full" display="flex" justifyContent="center" zIndex={2}>
                            <LikeButton photo={image} username={user} />
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};
