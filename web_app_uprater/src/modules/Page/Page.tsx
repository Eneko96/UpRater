import { useEffect, useState } from 'react';
import { useTriggers } from '../../store/triggers';
import { CreateRate } from '../CreateRate/CreateRate';
import { NavBar } from '../NavBar/NavBar';
import { Notification } from '../Notification/Notification';

export const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Notification msg="test" type="danger" />
      <NavBar />
      {children}
      <CreateRate />
    </>
  );
};
