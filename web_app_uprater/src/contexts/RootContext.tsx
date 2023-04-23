import { createContext, useContext, useState } from 'react';

export enum Types {
  INFO = 'info',
  DANGER = 'danger',
  SUCCESS = 'success',
  WARNING = 'warning',
  DARK = 'dark',
}

type RootContextType = {
  rateModal: boolean;
  setRateModal: React.Dispatch<React.SetStateAction<boolean>>;
  notification: { show: boolean; message: string; type: Types };
  setNotification: React.Dispatch<
    React.SetStateAction<{ show: boolean; message: string; type: Types }>
  >;
};

export const RootContext = createContext<RootContextType>({
  rateModal: false,
  setRateModal: () => null,
  notification: { show: false, message: '', type: Types.INFO },
  setNotification: () => null,
});

const RootContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [rateModal, setRateModal] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: Types.INFO,
  });

  return (
    <RootContext.Provider
      value={{ rateModal, setRateModal, notification, setNotification }}
    >
      {children}
    </RootContext.Provider>
  );
};

const useRootContext = () => useContext(RootContext);

export { RootContextProvider, useRootContext };
