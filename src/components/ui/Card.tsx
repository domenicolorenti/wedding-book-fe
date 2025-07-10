import { Text, Image, Box, VStack, Button, Portal, CloseButton, Drawer } from '@chakra-ui/react'
import { FaRegHeart } from 'react-icons/fa'
import { useState } from 'react'
import { ImageCarousel } from '.';
import axios from 'axios';

const URL = import.meta.env.VITE_BE_URL;

interface Image {
    _id: string;
    name: string;
    src: string; // o "url"
    likes: number;
}

const Card = (props: Image) => {
    const [open, setOpen] = useState(false);

    return (
        <Drawer.Root open={open} placement="bottom" onOpenChange={(e) => setOpen(e.open)}>
            <Drawer.Trigger asChild>
                <Button
                    bg="white"
                    color="gray.900"
                    rounded="2xl"
                    shadow="md"
                    p={0}
                    w="full"
                    h="auto"
                    _active={{ bg: 'orange.100', shadow: '2xl' }}
                >
                    <VStack
                        gap={0}
                        w="full"
                        position="relative"
                    >
                        <Box w="full" h="full" pos="absolute" />
                        <Image
                            loading="lazy"
                            roundedTop="2xl"
                            aspectRatio={4 / 3}
                            src={`${URL}/download/${props._id}`}
                        />
                        <Box w="full" px="4" py="1">
                            <Text fontSize="xl" display="flex" alignItems="center" gap={1}>
                                <FaRegHeart />
                                {props.likes}
                            </Text>
                        </Box>
                    </VStack>
                </Button>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner >
                    <Drawer.Content
                        bg="white"
                        roundedTop="2xl"
                        color="gray.900"
                    >
                        <Drawer.Body>
                            {/* <ImageCarousel image={{
                                id: image._id,
                                src: image.src
                            }} /> */}
                        </Drawer.Body>
                        <Drawer.CloseTrigger asChild>
                            <CloseButton size="xl" color="gray.600" />
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    )
}

export default Card