import { useState } from 'react';

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

interface formState {
  value: string;
  error: string;
}

function Home() {
  const [username, setUsername] = useState<formState>({
    value: '',
    error: '',
  });
  const [roomId, setRoomId] = useState<formState>({
    value: '',
    error: '',
  });

  const linkColor = useColorModeValue('teal.500', 'teal.400');

  const joinRoom = () => {
    if (!username.value) setUsername({ ...username, error: 'This field is required' });
    if (!roomId.value) setRoomId({ ...roomId, error: 'This field is required' });

    if (!username.error && !roomId.error) {
      console.log({
        username,
        roomId,
      });
    }
  };

  return (
    <Container maxW={400}>
      <VStack justify='start' align='start'>
        <Heading>Start watch together</Heading>
        <Text>To start watching baths together, you need to create a room for this</Text>
        <VStack mt={4} spacing={2} w='100%'>
          <FormControl isInvalid={!!username.error}>
            <FormLabel>Username</FormLabel>
            <Input
              type='text'
              value={username.value}
              onChange={(e) => setUsername({ ...username, value: e.target.value })}
            />
            {!username.error.length && (
              <FormHelperText>
                Your username will be visible to other members of the room.
              </FormHelperText>
            )}
            <FormErrorMessage>{username.error}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!roomId.error}>
            <FormLabel>Room ID</FormLabel>
            <Input
              type='text'
              value={roomId.value}
              onChange={(e) => setRoomId({ ...roomId, value: e.target.value })}
            />
            {!roomId.error.length && (
              <FormHelperText>Enter the id of the room you want to enter.</FormHelperText>
            )}
            <FormErrorMessage>{roomId.error}</FormErrorMessage>
          </FormControl>
        </VStack>
        <VStack align='start' mt={4} w='100%'>
          <Button colorScheme='blue' w='100%' onClick={joinRoom}>
            Join room
          </Button>
          <Text fontSize='sm'>
            Do you need your own room? <Link color={linkColor}>Create room</Link>
          </Text>
        </VStack>
      </VStack>
    </Container>
  );
}

export default Home;