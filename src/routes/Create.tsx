import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

import { useApi, useAuth, useForm } from '~/utils/hooks';
import { LoginForm } from '~/widgets';

type Lifetime = '1' | '3' | '7' | 'inf';

interface CreateRoomForm {
  roomName: string;
  maxUsersCount: number;
  lifetime: Lifetime;
}

export const Create = () => {
  const linkColor = useColorModeValue('teal.500', 'teal.400');
  const textColor = useColorModeValue('blackAlpha.500', 'whiteAlpha.500');

  const [isLoading, setIsLoading] = useState(false);
  const { api } = useApi();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthorized } = useAuth();

  const form = useForm<CreateRoomForm>({
    initialValues: {
      roomName: '',
      maxUsersCount: 5,
      lifetime: '1',
    },
    onSubmit: () => {
      setIsLoading(true);

      api
        .post('/room', {
          name: form.values.roomName,
          maxUsersCount: form.values.maxUsersCount,
          lifetime: form.values.lifetime,
        })
        .then((res) => {
          console.log(res.data.roomId);
        })
        .catch((error) => {
          console.log(error.response.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    validate: () => {
      let isValid = true;
      if (!form.values.roomName) {
        form.setFieldError('roomName', 'This is a required field');
        isValid = false;
      }
      if (!form.values.maxUsersCount) {
        form.setFieldError('maxUsersCount', 'This is a required field');
        isValid = false;
      }
      if (!form.values.lifetime) {
        form.setFieldError('lifetime', 'This is a required field');
        isValid = false;
      }

      return isValid;
    },
  });

  const handleRadioChange = (value: Lifetime) => {
    if (value == 'inf' && !isAuthorized) {
      onOpen();
    } else {
      form.setFieldValue('lifetime', value);
    }
  };

  return (
    <>
      <Container maxW={400}>
        <VStack justify='start' align='start'>
          <Heading size='lg'>Create room</Heading>
          <Text color={textColor}>
            Create and customize your own room, invite friends and enjoy watching together
          </Text>
          <VStack mt={4} spacing={2} w='100%'>
            <FormControl isInvalid={!!form.errors.roomName}>
              <FormLabel>Room Name</FormLabel>
              <Input
                type='text'
                value={form.values.roomName}
                onChange={(e) => form.setFieldValue('roomName', e.target.value)}
              />
              {!form.errors.roomName && (
                <FormHelperText>
                  Only you and the members of the room will see the name of the room.
                </FormHelperText>
              )}
              <FormErrorMessage>{form.errors.roomName}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!form.errors.maxUsersCount}>
              <FormLabel>Max Users Count</FormLabel>
              <NumberInput
                defaultValue={form.values.maxUsersCount}
                max={20}
                min={2}
                clampValueOnBlur={true}
                onChange={(count) => form.setFieldValue('maxUsersCount', Number(count))}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {!form.errors.maxUsersCount && (
                <FormHelperText>
                  Only you and the members of the room will see the name of the room.
                </FormHelperText>
              )}
              <FormErrorMessage>{form.errors.maxUsersCount}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!form.errors.lifetime}>
              <FormLabel>Delete Room After</FormLabel>
              <RadioGroup value={form.values.lifetime} onChange={handleRadioChange}>
                <VStack justify='start' align='start'>
                  <Radio value='1'>1 day</Radio>
                  <Radio value='3'>3 days</Radio>
                  <Radio value='7'>7 days</Radio>
                  <Radio value='inf'>do not delete</Radio>
                </VStack>
              </RadioGroup>
              {!form.errors.lifetime && (
                <FormHelperText>
                  This room will be automatically deleted after the selected period and you will not
                  be able to access it
                </FormHelperText>
              )}
              <FormErrorMessage>{form.errors.lifetime}</FormErrorMessage>
            </FormControl>
          </VStack>
          <VStack align='start' w='100%' mt={4}>
            <Button colorScheme='blue' w='100%' onClick={form.handleSubmit} isLoading={isLoading}>
              Create room
            </Button>
            <Text fontSize='sm'>
              Need to connect to an existing room?{' '}
              <Link as='span' color={linkColor}>
                <RouterLink to='/'>Join Room</RouterLink>
              </Link>
            </Text>
          </VStack>
        </VStack>
      </Container>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size='lg'>You not authorized</Heading>
            <Text color={textColor} fontWeight='normal' fontSize='md'>
              to create a room that does not have an unlimited lifetime, you need to log in
            </Text>
          </ModalHeader>
          <ModalBody>
            <LoginForm />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Create;
