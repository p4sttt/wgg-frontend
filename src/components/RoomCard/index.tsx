import { FC } from 'react';

import { Card, CardBody, Heading, Text } from '@chakra-ui/react';

interface RoomCardProps {
  roomName: string;
  createdAt: Date;
}

export const RoomCard: FC<RoomCardProps> = ({ roomName, createdAt }) => {
  return (
    <Card>
      <CardBody>
        <Heading size='xs' textTransform='uppercase'>
          {roomName}
        </Heading>
        <Text>some message</Text>
      </CardBody>
    </Card>
  );
};
