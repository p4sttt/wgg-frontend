import { Link } from 'react-router-dom';
import { ArrowDownRight } from 'tabler-icons-react';

import { Button, Center, Heading, Text, VStack } from '@chakra-ui/react';

function ErrorPage() {
  return (
    <Center h='100vh'>
      <VStack>
        <Heading>This page don't exist</Heading>
        <Text>this page has changed its address or never existed</Text>
        <Button mt={4} rightIcon={<ArrowDownRight size={24} strokeWidth={1.5} />}>
          <Link to='/'>Go Home</Link>
        </Button>
      </VStack>
    </Center>
  );
}

export default ErrorPage;
