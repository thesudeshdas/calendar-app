import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages';

import { ChakraProvider } from '@chakra-ui/react';
import Layout from './Layout/Layout';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [{ path: '/', element: <Home /> }],
  },
]);

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
