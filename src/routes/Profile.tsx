import { Box, Button, Heading, Text } from '@chakra-ui/react';

import { useAuth } from '~/utils/hooks';
import { RoomsList } from '~/widgets/RoomsList';

export const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <Box>
      <Heading>Profile</Heading>
      <Text>{user?.username}</Text>
      <Box>
        <Heading size='md'>Your rooms</Heading>
        <RoomsList />
      </Box>
      <Button colorScheme='red' onClick={() => logout()}>
        Log Out
      </Button>
    </Box>
  );
};

export default Profile;
