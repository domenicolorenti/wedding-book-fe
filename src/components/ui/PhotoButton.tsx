import { Text, Button, Icon, Spinner, Flex } from '@chakra-ui/react';
import { CiCamera } from 'react-icons/ci';
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
        <Flex gap={3} w="full">
            <Button
                flex={1}
                bg={appTheme.colors.primary}
                color="gray.900"
                rounded="2xl"
                py={7}
                fontSize="lg"
                fontWeight="semibold"
                border="1px solid"
                borderColor="#D9D3CD"
                _hover={{ transform: 'translateY(-2px)', opacity: 0.9 }}
                _active={{ transform: 'translateY(0)' }}
                transition="all 0.2s"
                disabled={uploading}
                onClick={handleCamera}
                aria-label="Scatta una foto"
            >
                {uploading ? (
                    <Spinner size="sm" color="gray.900" />
                ) : (
                    <>
                        <Icon as={CiCamera} boxSize={7} mr={2} strokeWidth={1} />
                        <Text>Scatta</Text>
                    </>
                )}
            </Button>

            <Button
                flex={1}
                bg="white"
                color="gray.900"
                rounded="2xl"
                py={7}
                fontSize="lg"
                fontWeight="semibold"
                border="1px solid"
                borderColor="#D9D3CD"
                _hover={{ transform: 'translateY(-2px)', bg: "gray.50" }}
                _active={{ transform: 'translateY(0)' }}
                transition="all 0.2s"
                disabled={uploading}
                onClick={handleGallery}
                aria-label="Carica dalla galleria"
            >
                {uploading ? (
                    <Spinner size="sm" color="gray.900" />
                ) : (
                    <>
                        <Icon as={GrGallery} boxSize={5} mr={2} />
                        <Text>Galleria</Text>
                    </>
                )}
            </Button>

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
        </Flex>
    );
};

export default PhotoButton;