import { VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { Menu } from './Menu'
import PhotoGrid from './PhotoGrid'
import { images } from '@/mooks'

const Tabs = (props: {username: string}) => {
    const [active, setActive] = useState("Home")

    const filteredImages = () => {
        if (active === "Home") {
            return images;
        }
        return images.filter((image) => image.name === props.username)
    }

    return (
        <VStack
            w="full"
        >
            <Menu setActive={setActive}/>
            <PhotoGrid images={filteredImages()} />

        </VStack>
    )
}

export default Tabs