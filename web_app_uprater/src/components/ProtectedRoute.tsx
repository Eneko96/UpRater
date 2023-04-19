import { Navigate, Outlet, RouteProps } from 'react-router-dom';
import { useAuth } from '../store/auth';

export const ProtectedRoute = (props: any) => {
  // const { token } = useAuth()
  // check in cookies
  const cookies = document.cookie;
  // check if cookieId with name connect.sid
  const cookieId = cookies
    .split(';')
    .find((cookie) => cookie.includes('connect.sid'));
  console.log(cookieId);
  console.log(cookies);

  return cookieId ? <Outlet /> : <Navigate to="/login" />;
};
