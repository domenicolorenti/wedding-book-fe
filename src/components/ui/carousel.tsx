// components/ImageCarousel.jsx
import { useState } from "react";
import { Box, Image, Text, VStack, Button, Icon } from "@chakra-ui/react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { images } from "@/mooks";



export const ImageCarousel = (props: { image: { id: number } }) => {
    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(0)

    const handleCLick = () => {
        setLiked(true);
        setLikeCount(likeCount + 1)
    }

    const initialIndex = images.findIndex((img) => img.id === props.image.id);
    const [sliderRef] = useKeenSlider({
        loop: true,
        initial: initialIndex >= 0 ? initialIndex : 0,
        slides: {
            perView: 1,
        },
    });

    return (
        <Box
            position="relative"
            width="full"
            overflow="hidden"
        >
            <Box ref={sliderRef} className="keen-slider">
                {images.map((image) => (
                    <VStack
                        key={image.id}
                        className="keen-slider__slide"
                        gap={2}>
                        <Text
                            py="4"
                            textAlign="left"
                            fontSize="xl"
                            fontWeight="bold"
                            fontFamily="Serif"
                            w="full"
                        >
                            {image.name}
                        </Text>
                        <Image
                            src={image.src}
                            aspectRatio={3 / 4}
                            maxH="65vh"
                            rounded="2xl"
                        />
                        <Box w="full" py="2">
                            <Button outline="none" onClick={handleCLick}>
                                <Text fontSize="xl" display="flex" w="full" alignItems="center" gap={1}>
                                    {liked ? <Icon as={FaHeart} color="red" boxSize={8} /> : <Icon as={FaRegHeart} boxSize={8} />}
                                    {image.likes}
                                </Text>
                            </Button>
                        </Box>
                    </VStack>
                ))}
            </Box>

            {/* Arrows */}
            {/* <Flex
        justify="space-between"
        position="absolute"
        top="50%"
        width="100%"
        transform="translateY(-50%)"
        px={2}
      >
        <IconButton
          aria-label="Previous"
          icon={<FaChevronLeft />}
          onClick={() => slider.current?.prev()}
          bg="rgba(0,0,0,0.4)"
          color="white"
          _hover={{ bg: "rgba(0,0,0,0.6)" }}
        />
        <IconButton
          aria-label="Next"
          icon={<FaChevronRight />}
          onClick={() => slider.current?.next()}
          bg="rgba(0,0,0,0.4)"
          color="white"
          _hover={{ bg: "rgba(0,0,0,0.6)" }}
        />
      </Flex> */}
        </Box>
    );
}
