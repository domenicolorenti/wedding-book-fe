import { Tabs } from '@/components/ui'
import PhotoButton from '@/components/ui/PhotoButton'
import { VStack, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = (props: { username: string }) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!props.username) {
            navigate("/login")
        }
    }, [])

    return (
        <VStack
            pos="relative"
            w="full"
        >
            <Text
                fontSize="3xl"
            >
                Condividi le tue foto
            </Text>
            <Text>
                Scatta una foto e condividila!
            </Text>
            <PhotoButton />
            <Text
                fontSize="3xl"
            >
                Le Foto
            </Text>
            <Tabs username={props.username}/>

        </VStack >
    )
}

export default Home