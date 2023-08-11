import { useEffect, useState } from 'react';

import { Heading, Skeleton, VStack } from '@chakra-ui/react';

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

  return (
    <VStack>
      {rooms.length ? (
        rooms.map((room) => <RoomCard key={room.id} roomName={room.name} createdAt={room.createdAt} />)
      ) : (
        <Heading size='sm'>nothing intresting here</Heading>
      )}
    </VStack>
  );
};
