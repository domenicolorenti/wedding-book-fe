import { Text, Button, Image, VStack, Box, Grid, Icon } from '@chakra-ui/react'
import logo from "@/assets/logo.svg"
import Card from './components/ui/Card'
import PhotoButton from './components/ui/PhotoButton'

function App() {

  return (
    <VStack
      bg="orange.50"
      p="2"
      color="gray.700"
      fontFamily="Serif"
    >
      {/* <Image
        w="80%"
        src={logo}
      /> */}
      <Text
        fontSize="5xl"
      >
        Wedding Book
      </Text>
      <Text
        fontSize="3xl"
      >
        Condividi le tue foto
      </Text>
      <Text>
        Scatta una foto e condividila!
      </Text>
      <PhotoButton/>
      <Text
        fontSize="3xl"
      >
        Le Foto
      </Text>

      <Grid
        w="full"
        px="4"
        gap={4}
        templateColumns="repeat(2, 1fr)"
      >
        <Card>
          
        </Card>
        <Card>
          
        </Card>
        <Card>
          
        </Card>

      </Grid>
    </VStack>
  )
}

export default App
