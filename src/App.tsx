import { Text, VStack, Grid, Input, Button, Field, Fieldset, Stack } from '@chakra-ui/react'
import Card from './components/ui/Card'
import PhotoButton from './components/ui/PhotoButton'
import { images } from './mooks'
import { useEffect, useState } from 'react';

function App() {
  const [username, setUsername] = useState("");
  const [logged, setLogged] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("wedding_username");
    if (saved) {
      setUsername(saved);
      setLogged(true)
    }
  }, []);

  const handleSave = () => {
    if (username.trim() !== "") {
      console.log(username.trim())
      localStorage.setItem("wedding_username", username.trim());
      setLogged(true)
    }
  };

  return (
    <VStack
      bg="orange.50"
      px="4"
      pt="8"
      color="gray.700"
      fontFamily="Serif"
      minH="100vh"
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
      {!logged ? (
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSave()
        }}>
          <Fieldset.Root
            onSubmit={handleSave}
            my="10%"
            size="lg"
            maxW="md"
            p="4"
          >
            <Stack>
              <Fieldset.HelperText>
                Ciao!
                <br />
                Benvenuto su Wedding Book!
                <br />
                <br />
                Qui potrai caricare le foto più uniche e divertenti!
                La foto più bella sarà premiata alla fine dell'evento!
                <br />
                <br />
                Inserisci il Nome per cominciare
              </Fieldset.HelperText>
            </Stack>

            <Fieldset.Content>
              <Field.Root>
                <Field.Label>Nome</Field.Label>
                <Input
                  name="name"
                  onChange={(e) => setUsername(e.target.value)}
                  rounded="2xl"
                />
              </Field.Root>

              {/* <Field.Root>
              <Field.Label>Email address</Field.Label>
              <Input name="email" type="email" />
            </Field.Root> */}
            </Fieldset.Content>

            <Button
              type="submit"
              w="min"
              mx="auto"
              px="8"
              fontWeight="semibold"
              shadow="md"
              outline={'none'}
              _active={{ bg: 'orange.100', shadow: '2xl' }}
            >
              Entra
            </Button>
          </Fieldset.Root>
        </form>
      ) : (
        <VStack>
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

          <Grid
            w="full"
            px="4"
            gap={4}
            templateColumns="repeat(2, 1fr)"
          >
            {images.map((image) => (
              <Card {...image} />
            ))}

          </Grid>
        </VStack >
      )}
    </VStack >
  )
}

export default App
