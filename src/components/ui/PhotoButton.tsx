import { Text, Button, Icon } from '@chakra-ui/react'
import { Menu } from '@chakra-ui/react'
import { CiCamera } from 'react-icons/ci'
import { FaCamera } from 'react-icons/fa6'
import { GrGallery } from 'react-icons/gr'
import { useRef } from 'react'
import { compressImage } from '@/utils/imageCompression'
import axios from 'axios'

const URL = import.meta.env.VITE_BE_URL;

const PhotoButton = () => {
    const cameraInputRef = useRef(null);
    const galleryInputRef = useRef(null);

    const handleCamera = () => {
        if (cameraInputRef.current) {
            (cameraInputRef.current as HTMLInputElement).click();
        }
    };

    const handleGallery = () => {
        if (galleryInputRef.current) {
            (galleryInputRef.current as HTMLInputElement).click();
        }
    };

    const savePhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            try {
                const compFile = await compressImage(file);
                const username = localStorage.getItem("wedding_username") ?? "";

                const formData = new FormData();
                formData.append("username", username);
                formData.append("file", compFile);

                const response = await axios.post(`${URL}/addPhoto`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (response.status === 200) {
                    console.log("Image uploaded!")
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <Button
                    bg="white"
                    color="gray.900"
                    rounded="2xl"
                    shadow="md"
                    py={6}
                    my={4}
                    fontSize="2xl"
                    flex={1}
                    flexDirection="column"
                    outline={'none'}
                    _active={{ bg: 'orange.100', shadow: '2xl' }}
                >
                    <Icon as={CiCamera} boxSize={14} />
                    <Text>Aggiungi una foto</Text>
                </Button>
            </Menu.Trigger>
            <Menu.Positioner>
                <Menu.Content
                    rounded="2xl"
                    bg="white"
                    boxShadow="xl"
                    py={2}
                    px={1}
                    minW="220px"
                >
                    <Menu.Item
                        value="camera"
                        onClick={handleCamera}
                        fontSize="xl"
                        color="gray.900"
                        _hover={{ bg: 'orange.50' }}
                        rounded="lg"
                        py={3}
                        display="flex"
                        alignItems="center"
                        gap={3}
                    >
                        <FaCamera />
                        <Text>Fotocamera</Text>
                    </Menu.Item>
                    <Menu.Item
                        value="gallery"
                        onClick={handleGallery}
                        fontSize="xl"
                        color="gray.900"
                        _hover={{ bg: 'orange.50' }}
                        rounded="lg"
                        py={3}
                        display="flex"
                        alignItems="center"
                        gap={3}
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
            />
            <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={galleryInputRef}
                onChange={savePhoto}
            />
        </Menu.Root>
    )
}

export default PhotoButton