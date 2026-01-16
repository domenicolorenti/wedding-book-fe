import { Text, Button, Icon, Spinner, Box } from '@chakra-ui/react';
import { Menu } from '@chakra-ui/react';
import { CiCamera } from 'react-icons/ci';
import { FaCamera } from 'react-icons/fa6';
import { GrGallery } from 'react-icons/gr';
import { useRef, useState, useContext } from 'react';
import { compressImage } from '@/utils/imageCompression';
import { validateImageFile } from '@/utils/validation';
import { AuthContext } from '@/contexts/AuthContext';
import { PhotoContext } from '@/contexts/PhotoContext';
import { appTheme } from '@/config/theme';
import { toaster } from './toaster';

const PhotoButton = () => {
    const cameraInputRef = useRef<HTMLInputElement>(null);
    const galleryInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const { user } = useContext(AuthContext);
    const { uploadPhoto } = useContext(PhotoContext);

    const handleCamera = () => {
        if (cameraInputRef.current) {
            cameraInputRef.current.click();
        }
    };

    const handleGallery = () => {
        if (galleryInputRef.current) {
            galleryInputRef.current.click();
        }
    };

    const savePhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Reset input value to allow selecting the same file again
        event.target.value = '';

        // Validate file
        const validation = validateImageFile(file);
        if (!validation.valid) {
            toaster.create({
                title: 'Errore',
                description: validation.error || 'File non valido',
                type: 'error',
                duration: 3000,
            });
            return;
        }

        setUploading(true);

        try {
            // Show uploading toast
            toaster.create({
                title: 'Caricamento...',
                description: 'Compressione e upload della foto in corso',
                type: 'info',
                duration: 2000,
            });

            const compressedFile = await compressImage(file);
            const result = await uploadPhoto(user, compressedFile);

            if (result.success) {
                toaster.create({
                    title: 'Successo!',
                    description: 'Foto caricata con successo',
                    type: 'success',
                    duration: 3000,
                });
            } else {
                throw new Error(result.error || 'Upload fallito');
            }
        } catch (error) {
            toaster.create({
                title: 'Errore',
                description: error instanceof Error ? error.message : 'Errore durante il caricamento',
                type: 'error',
                duration: 4000,
            });
        } finally {
            setUploading(false);
        }
    };

    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <Button
                    bg={appTheme.colors.primary}
                    color="white"
                    rounded="full"
                    py={8}
                    px={10}
                    fontSize="xl"
                    fontWeight="medium"
                    outline="none"
                    _hover={{ transform: 'scale(1.05)', shadow: '2xl' }}
                    _active={{ transform: 'scale(0.95)' }}
                    transition="all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                    shadow="xl"
                    disabled={uploading}
                    w="full"
                    aria-label="Aggiungi una foto"
                >
                    {uploading ? (
                        <Spinner size="md" color="white" />
                    ) : (
                        <>
                            <Icon as={CiCamera} boxSize={8} mr={2} strokeWidth={1} />
                            <Text>Scatta una foto</Text>
                        </>
                    )}
                </Button>
            </Menu.Trigger>
            <Menu.Positioner>
                <Menu.Content
                    rounded="2xl"
                    bg="white/90"
                    backdropFilter="blur(16px)"
                    boxShadow="2xl"
                    p={2}
                    border="1px solid"
                    borderColor="white"
                    minW="220px"
                >
                    <Menu.Item
                        value="camera"
                        onClick={handleCamera}
                        fontSize="xl"
                        color="gray.900"
                        _hover={{ bg: 'gray.50' }}
                        rounded="lg"
                        py={3}
                        display="flex"
                        alignItems="center"
                        gap={3}
                        disabled={uploading}
                    >
                        <FaCamera />
                        <Text>Fotocamera</Text>
                    </Menu.Item>
                    <Menu.Item
                        value="gallery"
                        onClick={handleGallery}
                        fontSize="xl"
                        color="gray.900"
                        _hover={{ bg: 'gray.50' }}
                        rounded="lg"
                        py={3}
                        display="flex"
                        alignItems="center"
                        gap={3}
                        disabled={uploading}
                    >
                        <GrGallery />
                        <Text>Galleria</Text>
                    </Menu.Item>
                </Menu.Content>
            </Menu.Positioner>
            <input
                type="file"
                accept="image/*"
                capture="environment"
                style={{ display: 'none' }}
                ref={cameraInputRef}
                onChange={savePhoto}
                disabled={uploading}
                aria-label="Carica foto dalla fotocamera"
            />
            <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={galleryInputRef}
                onChange={savePhoto}
                disabled={uploading}
                aria-label="Carica foto dalla galleria"
            />
        </Menu.Root>
    );
};

export default PhotoButton;