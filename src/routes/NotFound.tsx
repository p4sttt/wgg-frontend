import { Link } from 'react-router-dom';
import { ArrowDownRight } from 'tabler-icons-react';

import { Button, Center, Heading, Text, VStack } from '@chakra-ui/react';

export const ErrorPage = () => {
  return (
    <Center h='100vh'>
      <VStack>
        <Heading>This page don't exist</Heading>
        <Text>this page has changed its address or never existed</Text>
        <Link to='/'>
          <Button mt={4} rightIcon={<ArrowDownRight size={24} strokeWidth={1.5} />}>
            Go Home
          </Button>
        </Link>
      </VStack>
    </Center>
  );
};

export default ErrorPage;
