import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  SimpleGrid,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';

import { RoomCard } from '~/components';
import { Room } from '~/types';
import { useApi } from '~/utils/hooks';

interface RoomsResopnse {
  rooms: Room[];
}

export const RoomsList = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoadingCards, setIsLoadingCards] = useState(true);
  const { api } = useApi();

  useEffect(() => {
    api
      .get<RoomsResopnse>('/room')
      .then((res) => {
        setRooms(res.data.rooms);
      })
      .catch((error) => {
        console.log(error.response.data);
      })
      .finally(() => {
        setIsLoadingCards(false);
      });
  }, []);

  if (isLoadingCards) {
    return (
      <SimpleGrid
        columns={{
          sm: 2,
          md: 3,
        }}
        spacing={4}
      >
        <Skeleton>
          <Card size='lg'>
            <CardHeader>Some text</CardHeader>
            <CardBody>Another text</CardBody>
            <CardFooter>Why are you watching?</CardFooter>
          </Card>
        </Skeleton>
        <Skeleton>
          <Card size='lg'>
            <CardHeader>No, I'm serious.</CardHeader>
            <CardBody>Stop looking</CardBody>
            <CardFooter>Believe me there is nothing interesting here</CardFooter>
          </Card>
        </Skeleton>
      </SimpleGrid>
    );
  }

  if (!rooms.length) {
    return (
      <Flex height='sm' >
          <VStack m='auto'>
            <Heading size='md'>You don't have any created rooms yet</Heading>
            <Text>Rather, create your first room and enjoy watching together</Text>
            <Button as={Link} to='/create'>
              Create room
            </Button>
          </VStack>
      </Flex>
    );
  }

  return (
    <SimpleGrid
      columns={{
        sm: 2,
        md: 3,
      }}
      spacing={4}
    >
      {rooms.map((room) => (
        <RoomCard key={room.id} name={room.name} createdAt={room.createdAt} roomId={room.id} />
      ))}
    </SimpleGrid>
  );
};
