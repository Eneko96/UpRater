import { useRef } from 'react';

export const useCache = () => {
  const cache = useRef<Record<string, any>>(new Map());

  const get = (key: string) => cache.current[key];

  const set = (key: string, value: any) => {
    cache.current[key] = value;
  };

  return { get, set };
};

// example

const { get, set } = useCache();
