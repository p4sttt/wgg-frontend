import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';

import { Create, ErrorPage, Home, Layout, Login, Profile, Register, Room } from '~/routes';
import { RequireAuth } from '~/utils/hocs';
import { useSocket } from '~/utils/hooks';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        index: true,
        element: <Home />,
      },
      {
        path: 'create',
        element: <Create />,
      },
      {
        path: 'profile',
        element: <RequireAuth withAuth={<Profile />} />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'wgg',
        element: <Room />,
      },
    ],
  },
]);

function App() {
  const { listen } = useSocket();
  useEffect(() => {
    listen();
  }, []);

  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
