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
  useToast,
} from '@chakra-ui/react';

import { useAuth, useForm } from '~/utils/hooks';

interface RegisterData {
  email: string;
  username: string;
  password: string;
}

interface LoginFormProps {
  onSuccess?: () => void;
}

export const RegisterForm: FC<LoginFormProps> = ({ onSuccess = () => {} }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const { signup } = useAuth();
  const toast = useToast();

  const form = useForm<RegisterData>({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    onSubmit: async () => {
      setIsLoading(true);

      const registerData = {
        email: form.values.email,
        username: form.values.username,
        password: form.values.password,
      };
      signup(registerData)
        .then(() => {
          onSuccess();
          toast({
            title: 'You have successfully registered',
            status: 'success',
            duration: 2500,
            isClosable: true,
          });
        })
        .catch((error) => {
          toast({
            title: `Registration error, ${error.response.data.message}`,
            status: 'error',
            duration: 2500,
            isClosable: true,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    validate: () => {
      let isValid = true;
      if (!form.values.username) {
        form.setFieldError('username', 'This is a required field');
        isValid = false;
      }
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
        <FormControl isInvalid={!!form.errors.username}>
          <FormLabel>Username</FormLabel>
          <Input
            type='text'
            value={form.values.username}
            onChange={(e) => form.setFieldValue('username', e.target.value)}
          />
          <FormErrorMessage>{form.errors.username}</FormErrorMessage>
        </FormControl>
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
        <Button
          colorScheme='blue'
          w='100%'
          onClick={form.handleSubmit}
          isLoading={isLoading}
          loadingText='loading'
        >
          Sign Up
        </Button>
        <Button variant='outline' colorScheme='blue' w='100%' onClick={() => redirect('/login')}>
          Log In
        </Button>
      </VStack>
    </VStack>
  );
};
