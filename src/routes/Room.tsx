import { Navigate } from 'react-router-dom';

import { Box, Button, Heading } from '@chakra-ui/react';

import { useSocket } from '~/utils/hooks';

export const Room = () => {
  const { room, exit, ping } = useSocket();

  if (!room?.id) {
    return <Navigate to='/' />;
  }

  return (
    <Box>
      <Heading>Room: {room?.id}</Heading>
      <Button onClick={() => exit()}>Leave room</Button>
      <Button onClick={() => ping()}>Ping</Button>
    </Box>
  );
};
