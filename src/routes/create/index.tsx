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

import { useForm } from '~/hooks';

type Lifetime = '1' | '3' | '7' | 'inf';

interface CreateRoomForm {
  roomName: string;
  maxUsetsCount: number;
  lifetime: Lifetime;
}

function Create() {
  const linkColor = useColorModeValue('teal.500', 'teal.400');
  const textColor = useColorModeValue('blackAlpha.500', 'whiteAlpha.500');

  const form = useForm<CreateRoomForm>({
    initialValues: {
      roomName: '',
      maxUsetsCount: 5,
      lifetime: '1',
    },
    onSubmit: () => {
      console.log(form.values);
    },
    validate: () => {
      let isValid = true;
      if (!form.values.roomName) {
        form.setFieldError('roomName', 'This is a required field');
        isValid = false;
      }
      if (!form.values.maxUsetsCount) {
        form.setFieldError('maxUsetsCount', 'This is a required field');
        isValid = false;
      }
      if (!form.values.lifetime) {
        form.setFieldError('lifetime', 'This is a required field');
        isValid = false;
      }

      return isValid;
    },
  });

  return (
    <Container maxW={400}>
      <VStack justify='start' align='start'>
        <Heading size='lg'>Create own room</Heading>
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
          <FormControl isInvalid={!!form.errors.maxUsetsCount}>
            <FormLabel>Max Users Count</FormLabel>
            <NumberInput
              defaultValue={form.values.maxUsetsCount}
              max={20}
              min={2}
              clampValueOnBlur={true}
              onChange={(count) => form.setFieldValue('maxUsetsCount', Number(count))}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {!form.errors.maxUsetsCount && (
              <FormHelperText>
                Only you and the members of the room will see the name of the room.
              </FormHelperText>
            )}
            <FormErrorMessage>{form.errors.maxUsetsCount}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!form.errors.lifetime}>
            <FormLabel>Delete Room After</FormLabel>
            <RadioGroup
              defaultValue={form.values.lifetime}
              onChange={(value) => form.setFieldValue('lifetime', value as Lifetime)}
            >
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
          <Button colorScheme='blue' w='100%' onClick={form.handleSubmit}>
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
