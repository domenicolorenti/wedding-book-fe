import { Text, Button, Icon, Box, Flex } from '@chakra-ui/react'
import { Menu } from '@chakra-ui/react'
import { CiCamera } from 'react-icons/ci'
import { FaCamera } from 'react-icons/fa6'
import { GrGallery } from 'react-icons/gr'
import { useRef, useState } from 'react'

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
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                //setPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <Button
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
                    <Icon as={CiCamera} boxSize={14}  />
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
                        <Text>Camera</Text>
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
                onChange={handleFileChange}
            />
            <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={galleryInputRef}
                onChange={handleFileChange}
            />
        </Menu.Root>
    )
}

export default PhotoButton