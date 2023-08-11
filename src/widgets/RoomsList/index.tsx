import { useEffect, useState } from 'react';
import { Box } from 'tabler-icons-react';

import { Center, SimpleGrid, Skeleton, Text, VStack } from '@chakra-ui/react';

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
      <VStack>
        <Skeleton>some text here ahahahah gay</Skeleton>
      </VStack>
    );
  }

  if (!rooms.length) {
    return (
      <Box>
        <Center>
          <Text>Nothing interesting there</Text>
        </Center>
      </Box>
    );
  }

  return (
    <SimpleGrid
      columns={{
        sm: 2,
        md: 3,
      }}
      spacing={10}
    >
      {rooms.map((room) => (
        <RoomCard name={room.name} createdAt={room.createdAt} />
      ))}
    </SimpleGrid>
  );
};
