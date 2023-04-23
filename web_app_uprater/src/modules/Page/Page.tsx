import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootContextProvider } from '../../contexts/RootContext';
import { CreateRate } from '../CreateRate/CreateRate';
import { NavBar } from '../NavBar/NavBar';
import { Notification } from '../Notification/Notification';

export const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const ping = async () => {
      const pong = await fetch('http://localhost:3000/ping', {
        credentials: 'include',
      });
      if (pong.status === 401 || pong.status === 302 || pong.status === 403) {
        navigate('/login');
      }
    };
    ping();
  }, []);
  return (
    <RootContextProvider>
      <Notification />
      <NavBar />
      {children}
      <CreateRate />
    </RootContextProvider>
  );
};
