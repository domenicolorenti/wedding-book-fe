import { Fieldset, Stack, Field, Input, Button, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useState, type Dispatch, type SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props: {
    setUsername: Dispatch<SetStateAction<string>>,
    username: string
}) => {
    const navigate = useNavigate();
    const [label, setLabel] = useState("");

    const URL = import.meta.env.VITE_BE_URL;

    const login = async () => {
        try {
            const username = props.username.trim()

            if (username === null || username === "") {
                setLabel("Inserisci il nome per continuare")
            }

            const response = await axios.post(`${URL}/addUser`, { username });
            if (response.status === 201) {
                localStorage.setItem("wedding_username", props.username.trim());
                props.setUsername(username);
                navigate("/")
            }
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 409) {
                    setLabel("Questo nome è già in uso!");
                }
                if (error.response.status === 400) {
                    setLabel("Questo input non è valido")
                }
                if (error.response.status === 500) {
                    alert("Generic Server error")
                }
            }
            if( error.code === "ERR_NETWORK" || error.message === "Network Error" ) {
                alert("Server non raggiungibile")
            }
            console.log(error)
        }
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            login()
        }}>
            <Fieldset.Root
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
                            fontSize="16px"
                            onChange={(e) => props.setUsername(e.target.value)}
                            rounded="2xl"
                            type='text'
                        />
                        <Text
                            opacity={label ? 1 : 0}
                            color="red.600"
                            alignSelf="center"
                        >
                            {label}
                        </Text>
                    </Field.Root>

                    {/* <Field.Root>
            <Field.Label>Email address</Field.Label>
            <Input name="email" type="email" />
          </Field.Root> */}
                </Fieldset.Content>

                <Button
                    type="submit"
                    rounded="2xl"
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
    )
}

export default Login