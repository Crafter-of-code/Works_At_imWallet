import { useNavigation } from '@react-navigation/native';
import axios, { AxiosResponse } from 'axios';
import React from 'react';
import * as keychain from 'react-native-keychain';

type appContextType = {
  getUserDetail: () => void;
  getRequest: (url: string) => Promise<AxiosResponse<any> | undefined>;
  postRequest: (
    url: string,
    data: any,
  ) => Promise<AxiosResponse<any> | undefined>;
};

export const appContext = React.createContext<appContextType>({
  getUserDetail: () => {},
  getRequest: async (url: string) => undefined,
  postRequest: async (url: string, data: any) => undefined,
});

function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const nav = useNavigation();
  async function getRequest(
    url: string,
  ): Promise<AxiosResponse<any> | undefined> {
    return await axios.get(url);
  }
  async function postRequest(
    url: string,
    data: any,
  ): Promise<AxiosResponse<any> | undefined> {
    const credentials = await keychain.getGenericPassword();
    if (!credentials) return;

    return await axios.post(url, data, {
      headers: { Authorization: `Bearer ${credentials.password}` },
    });
  }

  function getUserDetail() {}

  return (
    <appContext.Provider value={{ getUserDetail, getRequest, postRequest }}>
      {children}
    </appContext.Provider>
  );
}

export default AppContextProvider;
