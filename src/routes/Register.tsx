import { Container, Heading } from '@chakra-ui/react';

import { RegisterForm } from '~/widgets';

export const Register = () => {
  return (
    <Container maxW={400}>
      <Heading>Register</Heading>
      <RegisterForm />
    </Container>
  );
};
