import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = (props: any) => {
  // const { token } = useAuth()
  // check in cookies
  const cookies = document.cookie;
  // check if cookieId with name connect.sid
  const cookieId = cookies
    .split(';')
    .find((cookie) => cookie.includes('connect.sid'));

  return cookieId ? <Outlet /> : <Navigate to="/login" />;
};
