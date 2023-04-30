import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootContextProvider } from '../../contexts/RootContext';
import { fetchProxy } from '../../lib/fetch';
import { CreateRate } from '../CreateRate/CreateRate';
import { NavBar } from '../NavBar/NavBar';
import { Notification } from '../Notification/Notification';

export const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const ping = async () => {
      const { status } = await fetchProxy('/ping');
      if (status === 401 || status === 302 || status === 403) {
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
