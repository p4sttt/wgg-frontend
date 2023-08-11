import { Box, Divider, Heading } from '@chakra-ui/react';

import { RoomsList } from '~/widgets/RoomsList';

export const Profile = () => {
  return (
    <Box>
      <Heading mb={6}>Created rooms</Heading>
      <Divider mb={6} />
      <RoomsList />
    </Box>
  );
};

export default Profile;
