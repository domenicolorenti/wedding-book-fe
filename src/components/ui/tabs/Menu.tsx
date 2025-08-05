import { Button, Grid, GridItem } from "@chakra-ui/react"
import type { Dispatch, SetStateAction } from "react"
import type { IconType } from "react-icons";
import { FaHome, FaUser } from "react-icons/fa"
import { TbRefresh } from "react-icons/tb";

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

export const Menu = (props: { setActive: Dispatch<SetStateAction<string>>; active: string; fetchImages: () => Promise<void> }) => {
    return (
        <Grid
            w="80%"
            gap={"1px"}
            px={1}
            h="42px"
            templateColumns="repeat(7, 1fr)"
        >
            {buttons.map((item: { value: string; icon: IconType; text: string }) => (
                <GridItem colSpan={3}>
                    <MyButton
                        key={item.value}
                        {...item}
                        setActive={props.setActive}
                        active={props.active}
                    />
                </GridItem>
            ))}
            <Button
                bg="white"
                color="gray.900"
                fontSize="xl"
                rounded="2xl"
                w="full"
                h="full"
                onClick={() => props.fetchImages()}
            ><TbRefresh /></Button>
        </Grid>
    )
}

const MyButton = (props: { value: string; icon: IconType; text: string; setActive: Dispatch<SetStateAction<string>>; active: string }) => {
    const Icon = props.icon;
    return (
        <Button
            bg={props.value === props.active ? "#D8BFA4" : "white"}
            color="gray.900"
            fontSize="xl"
            roundedTop="2xl"
            roundedBottom="0"
            borderWidth={0}
            borderBottomWidth={props.value === props.active ? 0 : 1}
            borderColor="gray.200"
            w="full"
            h="full"
            onClick={() => props.setActive(props.value)}
        >
            <Icon />
            {props.text}
        </Button>
    )
}