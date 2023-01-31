import { Box, Heading, VStack } from '@chakra-ui/layout';
import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <VStack maxW='100vw'>
      <Heading m='2rem auto'>Calendar App</Heading>

      <Box
        w={{ base: '100vw', lg: '90vw', xl: '70vw' }}
        m='2rem auto'
        minH='78vh'
      >
        <Outlet />
      </Box>
    </VStack>
  );
}
