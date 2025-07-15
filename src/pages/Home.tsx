import { UserContext } from '@/App'
import { Tabs } from '@/components/ui'
import PhotoButton from '@/components/ui/PhotoButton'
import { VStack, Text } from '@chakra-ui/react'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    const user = useContext(UserContext);

    useEffect(() => {
        if (!user) {
            navigate("/wedding-book-fe/login")
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
            <Tabs />

        </VStack >
    )
}

export default Home