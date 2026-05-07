import {
    Box,
    Flex,
    VStack,
    HStack,
    Text,
    Image as Img,
    Spinner,
    Icon,
    Container,
    CloseButton,
} from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { useState, useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '@/services/api';
import { type Image } from '@/types';
import { appTheme } from '@/config/theme';
import bgImage from '@/assets/bg-no-flowers.svg';

const MEDAL: Record<number, { border: string; bg: string; text: string; label: string }> = {
    1: { border: '#C9A84C', bg: '#FDF8EC', text: '#7A6000', label: '1°' },
    2: { border: '#A0A0A0', bg: '#F5F5F5', text: '#505050', label: '2°' },
    3: { border: '#B07D4A', bg: '#FAF0E8', text: '#7A4000', label: '3°' },
};

const PhotoThumb = memo(({ id, size }: { id: string; size: number }) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    return (
        <Box w={size} h={size} bg="gray.100" rounded="lg" overflow="hidden" flexShrink={0} position="relative">
            {!loaded && !error && (
                <Flex w="full" h="full" align="center" justify="center">
                    <Spinner size="xs" color="gray.400" />
                </Flex>
            )}
            {error ? (
                <Flex w="full" h="full" align="center" justify="center" fontSize="lg">📷</Flex>
            ) : (
                <Img
                    src={apiService.getPhotoUrl(id)}
                    w="full"
                    h="full"
                    objectFit="cover"
                    onLoad={() => setLoaded(true)}
                    onError={() => { setError(true); setLoaded(true); }}
                    display={loaded ? 'block' : 'none'}
                    draggable={false}
                    userSelect="none"
                />
            )}
        </Box>
    );
});

const RankRow = memo(({ photo, position }: { photo: Image; position: number }) => {
    const medal = MEDAL[position];

    return (
        <HStack
            w="full"
            gap={3}
            px={4}
            py={3}
            bg={medal ? medal.bg : 'white/65'}
            backdropFilter="blur(10px)"
            rounded="xl"
            border="1px solid"
            borderColor={medal ? medal.border : 'gray.100'}
            transition="all 0.2s"
            _hover={{ shadow: 'sm' }}
        >
            <Text
                w={6}
                textAlign="center"
                fontSize="sm"
                fontWeight="bold"
                color={medal ? medal.text : 'gray.400'}
                fontFamily="serif"
                flexShrink={0}
            >
                {medal ? medal.label : position}
            </Text>
            <PhotoThumb id={photo._id} size={44} />
            <Text
                flex={1}
                fontSize="sm"
                fontWeight="medium"
                color={appTheme.colors.text}
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
            >
                {photo.user}
            </Text>
            <HStack gap={1.5} flexShrink={0}>
                <Icon as={FaHeart} boxSize={3} color={medal ? medal.border : 'red.300'} />
                <Text fontSize="sm" fontWeight="semibold" color={appTheme.colors.text}>
                    {photo.likes.length}
                </Text>
            </HStack>
        </HStack>
    );
});

const Leaderboard = () => {
    const navigate = useNavigate();
    const [photos, setPhotos] = useState<Image[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await apiService.getPhotos();
                const all = res.data?.data as Image[];
                const sorted = [...all].sort((a, b) => b.likes.length - a.likes.length);
                setPhotos(sorted);
            } catch {
                // silent fail
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return (
        <Box
            position="fixed"
            inset={0}
            zIndex={200}
            overflowY="auto"
            bg={appTheme.colors.background}
            backgroundImage={`url(${bgImage})`}
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
        >
            <Container maxW="lg" pt={10} pb={16} px={4}>
                <Flex justify="space-between" align="flex-start" mb={10}>
                    <VStack align="start" gap={0}>
                        <Text
                            fontSize="xs"
                            fontWeight="bold"
                            letterSpacing="0.2em"
                            textTransform="uppercase"
                            color="gray.400"
                        >
                            Wedding Book
                        </Text>
                        <Text fontSize="3xl" fontFamily="serif" color={appTheme.colors.text}>
                            Classifica
                        </Text>
                        <Text fontSize="sm" color="gray.500" mt={1}>
                            Le foto più amate del giorno
                        </Text>
                    </VStack>
                    <CloseButton
                        size="sm"
                        rounded="full"
                        color="gray.500"
                        bg="white/70"
                        backdropFilter="blur(8px)"
                        border="1px solid"
                        borderColor="gray.100"
                        mt={1}
                        _hover={{ bg: 'white', color: appTheme.colors.text }}
                        aria-label="Chiudi classifica"
                        onClick={() => navigate('/')}
                    />
                </Flex>

                {loading ? (
                    <VStack py={20} gap={4}>
                        <Spinner size="xl" color={appTheme.colors.primary} css={{ '--spinner-track-color': 'rgba(0,0,0,0.08)' }} />
                        <Text fontSize="sm" color="gray.500" letterSpacing="0.1em">
                            Caricamento classifica...
                        </Text>
                    </VStack>
                ) : photos.length === 0 ? (
                    <VStack py={20} gap={3}>
                        <Text fontSize="4xl">📷</Text>
                        <Text fontSize="lg" fontFamily="serif" color={appTheme.colors.text}>
                            Nessuna foto ancora
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                            Sii il primo a condividere un momento!
                        </Text>
                    </VStack>
                ) : (
                    <VStack gap={3} align="stretch">
                        {photos.map((photo, i) => (
                            <RankRow key={photo._id} photo={photo} position={i + 1} />
                        ))}
                    </VStack>
                )}
            </Container>
        </Box>
    );
};

export default Leaderboard;
