import { Button, Grid } from "@chakra-ui/react"
import type { Dispatch, SetStateAction } from "react"
import type { IconType } from "react-icons";
import { FaHome, FaUser } from "react-icons/fa"

const buttons = [
    {
        value: "Home",
        icon: FaHome,
        text: "Tutte"
    },
    {
        value: "Profile",
        icon: FaUser,
        text: "Mie"
    }
]

export const Menu = (props: { setActive: Dispatch<SetStateAction<string>> }) => {
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
            {buttons.map((item: { value: string; icon: IconType; text: string }) => (
                <MyButton
                    key={item.value}
                    {...item}
                    setActive={props.setActive}
                />
            ))}
        </Grid>
    )
}

const MyButton = (props: { value: string; icon: IconType; text: string; setActive: Dispatch<SetStateAction<string>> }) => {
    const Icon = props.icon;
    return (
        <Button
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
            onClick={() => props.setActive(props.value)}
        >
            <Icon />
            {props.text}
        </Button>
    )
}