import { Button, Spinner, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Menu } from './Menu'
import PhotoGrid from './PhotoGrid'
import axios from 'axios'
import React from 'react'
import { type Image } from "@/types"
import { TbRefresh } from 'react-icons/tb'

const URL = import.meta.env.VITE_BE_URL;

export const ImagesContex = React.createContext<Image[]>([]);

const Tabs = () => {
    const [active, setActive] = useState("Home");
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState<Image[]>([]);

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

    useEffect(() => {
        fetchImages()
    }, []);

    return (
        <VStack
            w="full"
        >
            <Menu setActive={setActive} active={active} fetchImages={fetchImages}/>
            {loading ? (
                <Spinner mt="4" size="xl" />
            ) : (
                <ImagesContex value={images}>
                    <PhotoGrid active={active} />
                </ImagesContex>
            )}

        </VStack>
    )
}

export default Tabs