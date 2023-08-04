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
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';

import { useForm } from '~/hooks';

interface JoinRoomForm {
  username: string;
  roomId: string;
}

function Home() {
  const linkColor = useColorModeValue('teal.500', 'teal.400');
  const textColor = useColorModeValue('blackAlpha.500', 'whiteAlpha.500');

  const form = useForm<JoinRoomForm>({
    username: '',
    roomId: '',
  });

  const joinRoom = () => {
    console.log(form.values);
  };

  return (
    <Container maxW={400}>
      <VStack justify='start' align='start'>
        <Heading size='lg'>Start watch together</Heading>
        <Text color={textColor}>
          To start watching baths together, you need to create a room for this
        </Text>
        <VStack mt={4} spacing={2} w='100%'>
          <FormControl isInvalid={!!form.errors.username}>
            <FormLabel>Username</FormLabel>
            <Input
              type='text'
              value={form.values.username}
              onChange={(e) => form.setFieldValue('username', e.target.value)}
            />
            {!form.errors.username && (
              <FormHelperText>
                Your username will be visible to other members of the room.
              </FormHelperText>
            )}
            <FormErrorMessage>{form.errors.username}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!form.errors.roomId}>
            <FormLabel>Room ID</FormLabel>
            <Input
              type='text'
              value={form.values.roomId}
              onChange={(e) => form.setFieldValue('roomId', e.target.value)}
            />
            {!form.values.roomId && (
              <FormHelperText>Enter the id of the room you want to enter.</FormHelperText>
            )}
            <FormErrorMessage>{form.values.roomId}</FormErrorMessage>
          </FormControl>
        </VStack>
        <VStack align='start' mt={4} w='100%'>
          <Button colorScheme='blue' w='100%' onClick={joinRoom}>
            Join room
          </Button>
          <Text fontSize='sm'>
            Do you need your own room?{' '}
            <Link as='span' color={linkColor}>
              <RouterLink to='/create'>Create Room</RouterLink>
            </Link>
          </Text>
        </VStack>
      </VStack>
    </Container>
  );
}

export default Home;
