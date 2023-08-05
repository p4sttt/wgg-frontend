import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';

import { RequireAuth } from '~/hoc';
import { Create, ErrorPage, Home, Layout, Login, Profile, Register } from '~/routes';

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
    ],
  },
]);

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
