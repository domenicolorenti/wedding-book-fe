import { Button, Flex, Text, Box, Icon } from '@chakra-ui/react';
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
        <Flex 
            bg="white" 
            p={1.5} 
            rounded="full" 
            shadow="lg" 
            border="1px solid" 
            borderColor="gray.100"
            gap={1}
            align="center"
            maxW="fit-content"
            mx="auto"
        >
            {buttons.map((item) => (
                <MyButton key={item.value} {...item} setActive={setActive} active={active} />
            ))}
            
            <Box w="1px" h="20px" bg="gray.200" mx={2} />

            <Button
                variant="ghost"
                rounded="full"
                w="10"
                h="10"
                minW="10"
                p={0}
                color="gray.400"
                _hover={{ bg: 'gray.50', color: appTheme.colors.primary, transform: 'rotate(180deg)' }}
                onClick={() => fetchImages()}
                aria-label="Aggiorna foto"
                transition="all 0.4s ease"
            >
                <Icon as={TbRefresh} boxSize={5} />
            </Button>
        </Flex>
    );
};

interface MyButtonProps {
    value: string;
    icon: IconType;
    text: string;
    setActive: Dispatch<SetStateAction<string>>;
    active: string;
}

const MyButton = memo(({ value, icon: Icon, text, setActive, active }: MyButtonProps) => {
    const isActive = value === active;
    return (
        <Button
            variant="ghost"
            bg={isActive ? appTheme.colors.primary : 'transparent'}
            color={isActive ? 'gray.900' : 'gray.500'}
            rounded="full"
            px={6}
            h="10"
            onClick={() => setActive(value)}
            _hover={{ 
                bg: isActive ? appTheme.colors.primary : 'gray.50',
                color: isActive ? 'gray.900' : 'gray.700',
                transform: 'translateY(-1px)'
            }}
            _active={{ transform: 'translateY(0)' }}
            transition="all 0.2s"
            aria-label={text}
            aria-pressed={isActive}
            fontWeight="medium"
            fontSize="sm"
        >
            <Icon style={{ marginRight: '8px' }} />
            {text}
        </Button>
    );
});