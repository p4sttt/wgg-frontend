import { FC } from 'react';

import { Card, CardBody, CardFooter, Heading, Text } from '@chakra-ui/react';

interface RoomCardProps {
  name: string;
  createdAt: string;
}

export const RoomCard: FC<RoomCardProps> = ({ name, createdAt }) => {
  const createdAtDate = new Date(createdAt);

  return (
    <Card size='lg'>
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
