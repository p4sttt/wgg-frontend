import { Outlet } from 'react-router-dom';

import { Box, Center, Container, Text, useColorModeValue } from '@chakra-ui/react';

import { Header } from '~/widgets';

export const Layout = () => {
  const footerColor = useColorModeValue('gray.300', 'gray.600');

  return (
    <Box>
      <Header />
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
};
