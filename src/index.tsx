import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Calendar, Home } from './pages';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/app', element: <App /> },
  { path: '/calendar', element: <Calendar /> },
]);

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='986741280832-e719osmsgs3ck3csktejng81onkdvdd0.apps.googleusercontent.com'>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
