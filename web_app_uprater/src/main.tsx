import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { Login } from './modules/Login';

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "feed",
    element: <App />,
  },
  {
    path: "profile",
    element: <div>Profile</div>,
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)