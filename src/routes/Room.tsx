import { useState, ChangeEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { Link } from 'tabler-icons-react';

import { Box, Button, Heading, Input, InputGroup, InputRightElement } from '@chakra-ui/react';

import { useSocket } from '~/utils/hooks';

export const Room = () => {
  const { room, exit, changeLink } = useSocket();
  const handleLinkInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeLink(e.target.value)
  }

  if (!room?.id) {
    return <Navigate to='/' />;
  }

  return (
    <Box>
      <Heading>Room: {room?.id}</Heading>
      <InputGroup>
        <InputRightElement>
          <Link strokeWidth={1.5} width={24} height={24} />
        </InputRightElement>
        <Input
          placeholder='paste your URL here'
          value={room.link || ''}
          onChange={handleLinkInputChange}
        />
      </InputGroup>
      <Button onClick={() => exit()}>Leave room</Button>
    </Box>
  );
};
