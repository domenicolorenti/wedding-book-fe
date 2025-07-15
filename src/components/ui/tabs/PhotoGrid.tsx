import { Grid } from '@chakra-ui/react'
import { Card } from '..'
import { ImagesContex } from './Tabs';
import { useContext } from 'react';
import { UserContext } from '@/App';
import { type Image } from "@/types"

const PhotoGrid = (props: { active: string }) => {
    const images = useContext(ImagesContex);
    const user = useContext(UserContext);

    const filteredImages = () => {
        if (!images) return [];
        if (props.active === "Home") {
            return images;
        }
        console.log(images.find);
        return images.filter((image: Image) => image.user === user);
    }

    return (
        <Grid
            w="full"
            p={4}
            gap={4}
            templateColumns="repeat(2, 1fr)"
        >
            {filteredImages().map((image: Image, index: number) => (
                <Card key={index} index={index} {...image}/>
            ))}

        </Grid>
    )
}

export default PhotoGrid