import { Box, Button, Heading, Text } from '@chakra-ui/react';

import { useAuth } from '~/utils/hooks';

export const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <Box>
      <Heading>Profile</Heading>
      <Text>{user?.username}</Text>
      <Button colorScheme='red' onClick={() => logout()}>
        Log Out
      </Button>
    </Box>
  );
};

export default Profile;
