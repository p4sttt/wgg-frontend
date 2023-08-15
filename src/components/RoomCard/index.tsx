import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
} from '@chakra-ui/react';

import { useAuth, useSocket } from '~/utils/hooks';

interface RoomCardProps {
  name: string;
  createdAt: string;
  roomId: string;
}

export const RoomCard: FC<RoomCardProps> = ({ name, createdAt, roomId }) => {
  const createdAtDate = new Date(createdAt);
  const navigate = useNavigate();
  const { join } = useSocket();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const handleJoinRoom = async () => {
    setIsLoading(true);

    await join(
      {
        username: user!.username,
        roomId: roomId,
      },
      () => navigate('/wgg'),
    );

    setIsLoading(false);
  };

  return (
    <>
      <Modal isOpen={isLoading} onClose={() => {}}>
        <ModalOverlay />
        <ModalContent w='fit-content' p={4}>
          <ModalBody>
            <Center>
              <Spinner />
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Card cursor='pointer' size='lg' onClick={handleJoinRoom}>
        <CardHeader>{roomId}</CardHeader>
        <CardBody>
          <Heading size='xs' textTransform='uppercase'>
            {name}
          </Heading>
        </CardBody>
        <CardFooter>
          <Text>{createdAtDate.toLocaleDateString()}</Text>
        </CardFooter>
      </Card>
    </>
  );
};
