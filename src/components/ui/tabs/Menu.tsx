import { Button, Grid, GridItem, Icon as ChakraIcon } from '@chakra-ui/react';
import type { Dispatch, SetStateAction } from 'react';
import type { IconType } from 'react-icons';
import { FaHome, FaUser } from 'react-icons/fa';
import { TbRefresh } from 'react-icons/tb';
import { appTheme } from '@/config/theme';
import { memo } from 'react';

const buttons = [
    {
        value: 'Home',
        icon: FaHome,
        text: 'Tutte',
    },
    {
        value: 'Profile',
        icon: FaUser,
        text: 'Mie',
    },
];

interface MenuProps {
    setActive: Dispatch<SetStateAction<string>>;
    active: string;
    fetchImages: () => Promise<void>;
}

export const Menu = ({ setActive, active, fetchImages }: MenuProps) => {
    return (
        <Grid w="80%" gap="1px" px={1} h="42px" templateColumns="repeat(7, 1fr)">
            {buttons.map((item) => (
                <GridItem key={item.value} colSpan={3}>
                    <MyButton {...item} setActive={setActive} active={active} />
                </GridItem>
            ))}
            <Button
                bg="white"
                color="gray.900"
                fontSize="xl"
                rounded="2xl"
                w="full"
                h="full"
                _active={{ bg: appTheme.colors.primary }}
                _hover={{ bg: 'gray.50' }}
                onClick={() => fetchImages()}
                aria-label="Aggiorna foto"
            >
                <ChakraIcon as={TbRefresh} />
            </Button>
        </Grid>
    );
};

interface MyButtonProps {
    value: string;
    icon: IconType;
    text: string;
    setActive: Dispatch<SetStateAction<string>>;
    active: string;
}

const MyButton = memo(({ value, icon, text, setActive, active }: MyButtonProps) => {
    const isActive = value === active;
    return (
        <Button
            bg={isActive ? appTheme.colors.primary : 'white'}
            color="gray.900"
            fontSize="xl"
            roundedTop="2xl"
            roundedBottom="0"
            borderWidth={0}
            borderBottomWidth={isActive ? 0 : 1}
            borderColor="gray.200"
            w="full"
            h="full"
            onClick={() => setActive(value)}
            _hover={{ bg: isActive ? appTheme.colors.primary : 'gray.50' }}
            aria-label={text}
            aria-pressed={isActive}
        >
            <ChakraIcon as={icon} mr={1} />
            {text}
        </Button>
    );
});