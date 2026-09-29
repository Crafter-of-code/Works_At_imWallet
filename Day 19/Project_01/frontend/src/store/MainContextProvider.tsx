import React, { SetStateAction, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { appName } from './appConfig';
import * as keychain from 'react-native-keychain';
import { StackActions, useNavigation } from '@react-navigation/native';
type mainContextProviderPropType = {
  children: React.ReactNode;
};
type mainContextType = {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<SetStateAction<boolean>>;
  fetchDarkMode: () => void;
  appName: string;
  checkIsUserloggedIn: () => void;
};
export const mainContext = React.createContext<mainContextType>({
  isDarkMode: false,
  setIsDarkMode: () => {},
  fetchDarkMode: () => {},
  appName: '',
  checkIsUserloggedIn: () => {},
});
const MainContextProvider = (
  props: mainContextProviderPropType,
): React.ReactElement => {
  const nav = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  function fetchDarkMode(): void {
    setIsDarkMode(useColorScheme() == 'dark');
  }
  async function checkIsUserloggedIn() {
    const token = await keychain.getGenericPassword();
    if (!token) return nav.dispatch(StackActions.replace('Login'));
    else return nav.dispatch(StackActions.replace('Home'));
  }
  return (
    <mainContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
        fetchDarkMode,
        appName,
        checkIsUserloggedIn,
      }}
    >
      {props.children}
    </mainContext.Provider>
  );
};

export default MainContextProvider;
