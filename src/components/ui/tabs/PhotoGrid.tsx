import { Grid } from '@chakra-ui/react'
import { Card } from '..'

interface Image {
    _id: string;
    name: string;
    src: string; // o "url"
    likes: number;
}

const PhotoGrid = (props: { images: Image[] }) => {
    return (
        <Grid
            borderTopWidth={1}
            borderColor="gray.300"
            rounded="4xl"
            w="full"
            py={4}
            px="4"
            gap={4}
            templateColumns="repeat(2, 1fr)"
        >
            {props.images.map((image) => (
                <Card {...image} key={image._id} />
            ))}

        </Grid>
    )
}

export default PhotoGrid