import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import './index.css';
import { Login } from './modules/Login/Login';
import { Page } from './modules/Page/Page';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <div>Not found</div>,
    element: (
      <Page>
        <Outlet />
      </Page>
    ),
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'feed',
        element: <App />,
      },
      {
        path: 'profile',
        element: <div>Profile</div>,
      },
    ],
  },
]);

// wrap routes in Page
// wrap Page in RouterProvider

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
