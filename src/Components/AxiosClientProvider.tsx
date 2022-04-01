import axios, { Axios } from 'axios';
import { createContext, FC, useContext, useMemo } from 'react';
import { useToken } from '../API/useToken';

const AxiosClientContext = createContext<Axios>(axios.create());

export const AxiosClientProvider: FC = ({ children }) => {
  const { token } = useToken();

  const configuredAxios = useMemo(() => {
    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      : {};
console.log(config)
    const configuredAxios = axios.create(config);
    return configuredAxios;
  }, [token]);

  return (
    <AxiosClientContext.Provider value={configuredAxios}>
      {children}
    </AxiosClientContext.Provider>
  );
};

export const useAxiosClient = () => useContext(AxiosClientContext)