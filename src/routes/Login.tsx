import { useLocation, useNavigate } from 'react-router-dom';

import { Container, Heading } from '@chakra-ui/react';

import { LoginForm } from '~/widgets';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from || '/profile';

  return (
    <Container maxW={400}>
      <Heading>Log In</Heading>
      <LoginForm onLogin={() => navigate(fromPage)} />
    </Container>
  );
};

export default Login;
