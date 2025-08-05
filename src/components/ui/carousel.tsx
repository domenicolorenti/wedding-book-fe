// components/ImageCarousel.jsx
import { useContext, useEffect, useState } from "react";
import { Box, Image, Text, VStack, Button, Icon } from "@chakra-ui/react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ImagesContex } from "./tabs/Tabs";
import { UserContext } from "@/App";
import axios from "axios";

const URL = import.meta.env.VITE_BE_URL;

export const ImageCarousel = (props: { index: number }) => {
    const [liked, setLiked] = useState(false);
    const user = useContext(UserContext);
    const images = useContext(ImagesContex);
    const [index, setIndex] = useState(props.index)

    const handleClick = async () => {
        const imageId = images[index]._id;
        const url = liked
            ? `${URL}/unlike/${user}/${imageId}`
            : `${URL}/like/${user}/${imageId}`;

        try {
            await axios.get(url);
            setLiked(!liked);

            // Update like count locally
            images[index].likes = liked
                ? images[index].likes.filter((u) => u !== user)
                : [...images[index].likes, user];
        } catch (error) {
            console.error("Like/unlike failed:", error);
        }
    };


    useEffect(() => {
        const image = images[index];
        setLiked(image.likes.includes(user));
    }, [images, index, user]);


    const [sliderRef] = useKeenSlider({
        loop: true,
        initial: props.index,
        slides: { perView: 1 },
        slideChanged(s) {
            setIndex(s.track.details.rel);
        }
    });


    return (
        <Box
            position="relative"
            width="full"
            overflow="hidden"
        >
            <Box ref={sliderRef} className="keen-slider">
                {images.map((image, index) => (
                    <VStack
                        key={index}
                        className="keen-slider__slide"
                        gap={2}
                    >
                        <Box w="full" h="full" pos="absolute" />
                        <Text
                            py="4"
                            textAlign="left"
                            fontSize="xl"
                            fontWeight="bold"
                            fontFamily="Serif"
                            w="full"
                        >
                            {image.user}
                        </Text>
                        <Image
                            src={`${URL}/download/${image._id}`}
                            aspectRatio={3 / 4}
                            maxH="68vh"
                            rounded="2xl"
                            loading="lazy"
                        />
                        <Box w="full" py="2">
                            <Button
                                bg="white"
                                color="gray.900"
                                outline="none"
                                onClick={handleClick}
                            >
                                <Text fontSize="xl" display="flex" w="full" alignItems="center" gap={1}>
                                    {liked ? <Icon as={FaHeart} color="red" boxSize={8} /> : <Icon as={FaRegHeart} boxSize={8} />}
                                    {image.likes.length}
                                </Text>
                            </Button>
                        </Box>
                    </VStack>
                ))}
            </Box>
        </Box >
    );
}
