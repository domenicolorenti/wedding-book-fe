import { Text, Image as Img, Box, VStack, Button, Portal, CloseButton, Drawer } from '@chakra-ui/react'
import { FaRegHeart } from 'react-icons/fa'
import { useContext, useState } from 'react'
import { ImageCarousel } from '.';
import { ImagesContex } from './tabs/Tabs';

const URL = import.meta.env.VITE_BE_URL;

const Card = (props: { index: number }) => {
    const [open, setOpen] = useState(false);
    const images = useContext(ImagesContex);

    return (
        <Drawer.Root open={open} placement="bottom" onOpenChange={(e) => setOpen(e.open)}>
            <Drawer.Trigger asChild>
                <Button
                    bg="#F8F4F0"
                    color="gray.900"
                    rounded="2xl"
                    borderColor={"#888"}
                    p={0}
                    w="full"
                    h="auto"
                >
                    <VStack
                        gap={0}
                        w="full"
                        position="relative"
                    >
                        <Box w="full" h="full" pos="absolute" />
                        <Img
                            loading="lazy"
                            roundedTop="2xl"
                            aspectRatio={4 / 3}
                            src={`${URL}/download/${images[props.index]._id}`}
                        />
                        <Box w="full" px="4" py="1">
                            <Text fontSize="xl" display="flex" alignItems="center" gap={1}>
                                <FaRegHeart />
                                {images[props.index].likes.length}
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
                            <ImageCarousel
                                index={props.index}
                            />
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