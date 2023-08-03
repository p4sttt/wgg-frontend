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
} from '@chakra-ui/react';

interface formState<T> {
  value: T;
  error: string;
}

type lifetime = '1' | '3' | '7' | 'inf';

function Create() {
  const [roomName, setRoomName] = useState<formState<string>>({
    value: '',
    error: '',
  });
  const [maxUsersCount, setMaxUsersCount] = useState<formState<number>>({
    value: 10,
    error: '',
  });
  const [lifetime, setLifetime] = useState<formState<lifetime>>({
    value: '1',
    error: '',
  });

  const linkColor = useColorModeValue('teal.500', 'teal.400');
  const textColor = useColorModeValue('blackAlpha.500', 'whiteAlpha.500');

  const validate = () => {
    let isValid = true;
    if (!roomName.value) {
      setRoomName({ ...roomName, error: 'This field is required' });
      isValid = false;
    }

    return isValid;
  };

  const createRoom = () => {
    const isValid = validate();

    if (isValid) {
      console.log({
        roomName,
        maxUsersCount,
        lifetime,
      });
    }
  };

  return (
    <Container maxW={400}>
      <VStack justify='start' align='start'>
        <Heading size='lg'>Create own room</Heading>
        <Text color={textColor}>
          Create and customize your own room, invite friends and enjoy watching together
        </Text>
        <VStack mt={4} spacing={2} w='100%'>
          <FormControl isInvalid={!!roomName.error.length}>
            <FormLabel>Room Name</FormLabel>
            <Input
              type='text'
              value={roomName.value}
              onChange={(e) => setRoomName({ ...roomName, value: e.target.value })}
            />
            {!roomName.error.length && (
              <FormHelperText>
                Only you and the members of the room will see the name of the room.
              </FormHelperText>
            )}
            <FormErrorMessage>{roomName.error}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!maxUsersCount.error.length}>
            <FormLabel>Max Users Count</FormLabel>
            <NumberInput
              defaultValue={maxUsersCount.value}
              max={20}
              min={2}
              clampValueOnBlur={true}
              onChange={(count) => setMaxUsersCount({ ...maxUsersCount, value: Number(count) })}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {!maxUsersCount.error.length && (
              <FormHelperText>
                Only you and the members of the room will see the name of the room.
              </FormHelperText>
            )}
            <FormErrorMessage>{maxUsersCount.error}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!lifetime.error.length}>
            <FormLabel>Delete Room After</FormLabel>
            <RadioGroup
              defaultValue={lifetime.value}
              onChange={(value) => setLifetime({ ...lifetime, value: value as lifetime })}
            >
              <VStack justify='start' align='start'>
                <Radio value='1'>1 day</Radio>
                <Radio value='3'>3 days</Radio>
                <Radio value='7'>7 days</Radio>
                <Radio value='inf'>do not delete</Radio>
              </VStack>
            </RadioGroup>
            {!lifetime.error.length && (
              <FormHelperText>
                This room will be automatically deleted after the selected period and you will not
                be able to access it
              </FormHelperText>
            )}
            <FormErrorMessage>{lifetime.error}</FormErrorMessage>
          </FormControl>
        </VStack>
        <VStack align='start' w='100%' mt={4}>
          <Button colorScheme='blue' w='100%' onClick={createRoom}>
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
  );
}

export default Create;
