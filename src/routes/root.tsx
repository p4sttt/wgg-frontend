import { Outlet } from 'react-router-dom';
import { Moon, SunHigh } from 'tabler-icons-react';

import {
  Box,
  Button,
  Center,
  Container,
  HStack,
  Heading,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';

function Root() {
  const { colorMode, toggleColorMode } = useColorMode();

  const headerBg = useColorModeValue('gray.50', 'gray.900');
  const footerColor = useColorModeValue('gray.300', 'gray.600');

  return (
    <Box>
      <Box p={4} w='100%' pos='fixed' background={headerBg} top={0} zIndex={999}>
        <Container maxW='container.lg'>
          <HStack justify='space-between'>
            <Heading fontSize='xl' fontWeight={600}>
              Watch Together 👀
            </Heading>
            <Button variant='outline' onClick={toggleColorMode}>
              {colorMode != 'light' ? <SunHigh /> : <Moon />}
            </Button>
          </HStack>
        </Container>
      </Box>
      <Container mt={24} maxW='container.lg'>
        <Outlet />
      </Container>
      <Box mt={24} px={4} pb={4}>
        <Center>
          <Text color={footerColor}>Watch Together. 2023</Text>
        </Center>
      </Box>
    </Box>
  );
}

export default Root;
