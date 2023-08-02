import { Button, Heading, VStack } from '@chakra-ui/react';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <VStack>
      <Heading>{count}</Heading>
      <Button onClick={() => setCount((prev) => prev + 1)}>Clicl me</Button>
    </VStack>
  );
}

export default App;
