import { Text, Image, Box, VStack, Button, Dialog, Portal, CloseButton, Drawer, Icon } from '@chakra-ui/react'
import test from "@/assets/test3.jpg"
import { CiHeart } from 'react-icons/ci'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useState } from 'react'

const Card = () => {
    const [open, setOpen] = useState(false)
    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(0)

    const handleCLick = () => {
        setLiked(true);
        setLikeCount(likeCount + 1)
    }

    return (
        <Drawer.Root open={open} placement="bottom" onOpenChange={(e) => setOpen(e.open)}>
            <Drawer.Trigger asChild>
                <Button
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
                    >
                        <Image
                            roundedTop="2xl"
                            src={test}
                            aspectRatio={4 / 3}
                        />
                        <Box w="full" px="4" py="1">
                            <Text fontSize="xl" display="flex" alignItems="center" gap={1}>
                                <FaRegHeart />
                                24
                            </Text>
                        </Box>
                    </VStack>
                </Button>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner padding={2}>
                    <Drawer.Content
                        bg="white"
                        rounded="2xl"
                        color="gray.900"
                    >
                        <Drawer.Header>
                            <Drawer.Title>Nome del fotografo</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <Image
                                src={test}
                                aspectRatio={3 / 4}
                                rounded="2xl"
                            />
                        </Drawer.Body>
                        <Drawer.Footer>
                            <Button w="full" px="4" py="1" outline="none" onClick={handleCLick}>
                                <Text fontSize="xl" display="flex" w="full" alignItems="center" gap={1}>
                                    {liked ? <Icon as={FaHeart} color="red" boxSize={8} /> : <Icon as={FaRegHeart} boxSize={8} />}
                                    {likeCount}
                                </Text>
                            </Button>
                        </Drawer.Footer>
                        <Drawer.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    )
}

export default Card