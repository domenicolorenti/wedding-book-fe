import { Grid } from '@chakra-ui/react'
import { Card } from '..'

interface Image {
    id: number,
    name: string,
    src: string,
    likes: number
}

const PhotoGrid = (props: {images: Image[]}) => {
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
                <Card {...image} />
            ))}

        </Grid>
    )
}

export default PhotoGrid