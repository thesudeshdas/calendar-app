import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Calendar, Home } from './pages';
import App from './App';

import { ChakraProvider } from '@chakra-ui/react';
import Layout from './Layout/Layout';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/app', element: <App /> },
      { path: '/calendar', element: <Calendar /> },
    ],
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();