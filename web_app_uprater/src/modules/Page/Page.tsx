import { RootContextProvider } from '../../contexts/RootContext';
import { CreateRate } from '../CreateRate/CreateRate';
import { NavBar } from '../NavBar/NavBar';
import { Notification } from '../Notification/Notification';

export const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <RootContextProvider>
      <Notification />
      <NavBar />
      {children}
      <CreateRate />
    </RootContextProvider>
  );
};
