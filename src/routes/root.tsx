import { Outlet } from 'react-router-dom';
import { Moon, SunHigh } from 'tabler-icons-react';

import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';

function Root() {
  const { colorMode, toggleColorMode } = useColorMode();

  const headerBg = useColorModeValue('gray.50', 'gray.900');

  return (
    <Box>
      <Box p={4} w='100%' pos='fixed' background={headerBg} top={0} zIndex={999}>
        <Container maxW='container.lg'>
          <HStack justify='space-between'>
            <Heading fontSize='xl' fontWeight={600}>
              Whatch Together 👀
            </Heading>
            <Button variant='outline' onClick={toggleColorMode}>
              {colorMode == 'light' ? <SunHigh /> : <Moon />}
            </Button>
          </HStack>
        </Container>
      </Box>
      <Container mt={24} maxW='container.lg'>
        <Outlet />
      </Container>
    </Box>
  );
}

export default Root;