import { Container, Heading } from '@chakra-ui/react';

import { LoginForm } from '~/widgets';

export const  Login = ()=> {
  return (
    <Container maxW={400}>
      <Heading>Log In</Heading>
      <LoginForm />
    </Container>
  );
}

export default Login;
