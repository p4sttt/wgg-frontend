import { Link } from 'react-router-dom';
import { Edit, Logout, Menu2, Moon, Sun, User } from 'tabler-icons-react';

import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';

import { useAuth } from '~/utils/hooks';

export const Header = () => {
  const { logout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();

  const headerBg = useColorModeValue('gray.100', 'gray.900');

  return (
    <Box py={4} w='100%' pos='fixed' background={headerBg} top={0} zIndex={999}>
      <Container maxW='container.lg'>
        <HStack justify='space-between'>
          <Heading fontSize='xl' fontWeight={600}>
            <Link to='/'>Watch Together 👀</Link>
          </Heading>
          <Menu>
            <MenuButton
              as={IconButton}
              variant='outline'
              aria-label='Options'
              icon={<Menu2 width={32} />}
              p={2}
            />
            <MenuList>
              <MenuItem icon={<User strokeWidth={1.5} />} as={Link} to='/profile'>
                Your Profile
              </MenuItem>
              <MenuItem icon={<Edit strokeWidth={1.5} />} as={Link} to='/profile'>
                Edit Profile
              </MenuItem>
              <MenuItem
                icon={colorMode == 'dark' ? <Moon strokeWidth={1.5} /> : <Sun strokeWidth={1.5} />}
                onClick={toggleColorMode}
              >
                {colorMode == 'dark' ? 'Light theme' : 'Dark theme'}
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => logout()} icon={<Logout strokeWidth={1.5} />}>
                Log Out
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Container>
    </Box>
  );
};
