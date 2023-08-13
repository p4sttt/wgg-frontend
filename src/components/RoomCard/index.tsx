import { FC } from 'react';

import { Card, CardBody, CardFooter, CardHeader, Heading, Text } from '@chakra-ui/react';

interface RoomCardProps {
  name: string;
  createdAt: string;
  roomId: string;
}

export const RoomCard: FC<RoomCardProps> = ({ name, createdAt, roomId }) => {
  const createdAtDate = new Date(createdAt);

  return (
    <Card size='lg'>
      <CardHeader>
        {roomId}
      </CardHeader>
      <CardBody>
        <Heading size='xs' textTransform='uppercase'>
          {name}
        </Heading>
      </CardBody>
      <CardFooter>
        <Text>{createdAtDate.toLocaleDateString()}</Text>
      </CardFooter>
    </Card>
  );
};
