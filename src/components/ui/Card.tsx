import { Text, Image, Box, VStack, Button, Portal, CloseButton, Drawer } from '@chakra-ui/react'
import { FaRegHeart } from 'react-icons/fa'
import { useState } from 'react'
import { ImageCarousel } from '.';

const Card = (image: { id: number, name: string, src: string, likes: number }) => {
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
                            src={image.src}
                        />
                        <Box w="full" px="4" py="1">
                            <Text fontSize="xl" display="flex" alignItems="center" gap={1}>
                                <FaRegHeart />
                                {image.likes}
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
                            <ImageCarousel image={{
                                id: image.id
                            }} />
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