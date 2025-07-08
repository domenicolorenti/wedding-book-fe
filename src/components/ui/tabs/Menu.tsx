import { Button, Grid } from "@chakra-ui/react"
import type { Dispatch, SetStateAction } from "react"
import { FaHome, FaUser } from "react-icons/fa"

export const Menu = (props: {setActive: Dispatch<SetStateAction<string>>}) => {
    return (
        <Grid
            w="80%"
            mb={-2}
            px={1}
            bottom={0}
            borderBottom={1}
            h="42px"
            templateColumns="repeat(2, 1fr)"
        >
            <Button
                value="Home"
                bg="white"
                color="gray.900"
                fontSize="xl"
                roundedTop="2xl"
                borderWidth={1}
                borderColor="gray.200"
                w="full"
                h="full"
                _active={{
                    shadow: "2xl",
                }}
            >
                <FaHome />
                Tutte
            </Button>
            <Button
                value="Profile"
                bg="white"
                color="gray.900"
                fontSize="xl"
                roundedTop="2xl"
                borderWidth={1}
                borderColor="gray.200"
                w="full"
                h="full"
                _active={{
                    shadow: "2xl",
                }}
            >
                <FaUser />
                Mie
            </Button>
        </Grid>
    )
}