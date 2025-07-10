import { Spinner, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Menu } from './Menu'
import PhotoGrid from './PhotoGrid'
import axios from 'axios'

const URL = import.meta.env.VITE_BE_URL;

interface Image {
    _id: string;
    name: string;
    src: string; // o "url"
    likes: number;
}


const Tabs = (props: { username: string }) => {
    const [active, setActive] = useState("Home");
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState<Image[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await axios.get(`${URL}/getPhotos`);
                setImages(res.data.data.slice().reverse());
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);



    const filteredImages = () => {
        if (!images) return [];
        if (active === "Home") {
            return images;
        }
        return images.filter((image) => image.name === props.username);
    }


    return (
        <VStack
            w="full"
        >
            <Menu setActive={setActive} />
            {loading ? (
                <Spinner mt="4" size="xl" />
            ) : (
                <PhotoGrid images={filteredImages()} />
            )}

        </VStack>
    )
}

export default Tabs