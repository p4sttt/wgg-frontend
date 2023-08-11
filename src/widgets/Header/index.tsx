import { Link } from 'react-router-dom';
import { User } from 'tabler-icons-react';

import { Box, Button, Container, HStack, Heading, useColorModeValue } from '@chakra-ui/react';

export const Header = () => {
  const headerBg = useColorModeValue('gray.50', 'gray.900');

  return (
    <Box p={4} w='100%' pos='fixed' background={headerBg} top={0} zIndex={999}>
      <Container maxW='container.lg'>
        <HStack justify='space-between'>
          <Heading fontSize='xl' fontWeight={600}>
            <Link to='/'>Watch Together 👀</Link>
          </Heading>
          <Link to='/profile'>
            <Button variant='outline'>
              <User width={32} />
            </Button>
          </Link>
        </HStack>
      </Container>
    </Box>
  );
};
