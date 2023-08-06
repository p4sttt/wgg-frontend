import { FC, useState } from 'react';
import { redirect } from 'react-router-dom';
import { Eye, EyeOff } from 'tabler-icons-react';

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';

import { useAuth, useForm } from '~/hooks';
import { LoginData } from '~/types';

interface LoginFormProps {
  onLogin?: () => void;
  onLoginError?: () => void;
}

export const LoginForm: FC<LoginFormProps> = ({ onLogin = () => {} }) => {
  const [show, setShow] = useState(false);

  const { login } = useAuth();
  const form = useForm<LoginData>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: () => {
      login({
        data: form.values,
        callback: onLogin,
      });
    },
    validate: () => {
      let isValid = true;
      if (!form.values.email) {
        form.setFieldError('email', 'This is a required field');
        isValid = false;
      }
      if (!form.values.password) {
        form.setFieldError('password', 'This is a required field');
        isValid = false;
      }

      return isValid;
    },
  });

  return (
    <VStack justify='start' align='start'>
      <VStack mt={4} spacing={4} w='100%'>
        <FormControl isInvalid={!!form.errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            type='email'
            value={form.values.email}
            onChange={(e) => form.setFieldValue('email', e.target.value)}
          />
          <FormErrorMessage>{form.errors.email}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!form.errors.password}>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? 'text' : 'password'}
              value={form.values.password}
              onChange={(e) => form.setFieldValue('password', e.target.value)}
            />
            <InputRightElement mr={1.5}>
              <Button variant='ghost' size='sm' onClick={() => setShow((show) => !show)}>
                {show ? <Eye strokeWidth={1.5} /> : <EyeOff strokeWidth={1.5} />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{form.errors.password}</FormErrorMessage>
        </FormControl>
      </VStack>
      <VStack align='start' w='100%' mt={4}>
        <Button colorScheme='blue' w='100%' onClick={form.handleSubmit} loadingText='loading'>
          Log In
        </Button>
        <Button variant='outline' colorScheme='blue' w='100%' onClick={() => redirect('/register')}>
          Sign Up
        </Button>
      </VStack>
    </VStack>
  );
};
