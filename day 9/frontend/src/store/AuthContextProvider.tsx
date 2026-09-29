import React, { SetStateAction, useSyncExternalStore } from 'react';
import { serverUrl } from './config';
import { StackActions, useNavigation } from '@react-navigation/native';
import { Toast } from 'toastify-react-native';
import { mainContext } from './MainContextProvider';
import * as keychain from 'react-native-keychain';
type authContextType = {
  userName: string;
  setUserName: React.Dispatch<SetStateAction<string>>;
  userEmail: string;
  setUserEmail: React.Dispatch<SetStateAction<string>>;
  userPassword: string;
  setUserPassword: React.Dispatch<SetStateAction<string>>;
  handlerRegister: () => void;
  handleLogin: () => void;
  isUserLoggedIn: boolean;
  logoutHandler: () => void;
  checkedUserLoggedIn: () => void;
};
export const authContext = React.createContext<authContextType>({
  userName: '',
  setUserName: () => {},
  userEmail: '',
  setUserEmail: () => {},
  userPassword: '',
  setUserPassword: () => {},
  handlerRegister: () => {},
  handleLogin: () => {},
  isUserLoggedIn: false,
  logoutHandler: () => {},
  checkedUserLoggedIn: () => {},
});
function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const nav = useNavigation();
  const [userName, setUserName] = React.useState<string>('');
  const [userEmail, setUserEmail] = React.useState<string>('');
  const [userPassword, setUserPassword] = React.useState<string>('');
  const { setToasterNotification } = React.useContext(mainContext);
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState<boolean>(false);
  const checkedUserLoggedIn = async (): Promise<boolean> => {
    try {
      const credentials = await keychain.getGenericPassword();
      if (credentials) {
        setIsUserLoggedIn(false);
        return true;
      }
      setIsUserLoggedIn(false);
      return false;
    } catch (error) {
      setIsUserLoggedIn(false);
      return false;
    }
  };

  function handlerRegister() {
    const data = {
      userName,
      userEmail,
      userPassword,
    };

    fetch(`${serverUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.status) {
          setToasterNotification(data.status, data.message);
        }
        console.log('Register response:', data);
      })
      .catch(err => {
        setToasterNotification(err.status, err.message);
      });
  }
  function handleLogin() {
    const data = {
      userEmail,
      userPassword,
    };
    fetch(`${serverUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(async data => {
        if (data.status) {
          console.log(data);
          setToasterNotification(true, data.message);
          try {
            const result = await keychain.setGenericPassword(
              'token',
              'test-token-123',
            );

            console.log('KEYCHAIN SAVE:', result);

            const credentials = await keychain.getGenericPassword();

            console.log('KEYCHAIN READ:', credentials);
          } catch (error) {
            console.log('KEYCHAIN ERROR:', error);
          }
          nav.dispatch(StackActions.replace('home'));
        } else {
          setToasterNotification(false, data.message);
          Toast.error(data.message);
        }
      })
      .catch(err => {
        console.log('facing error');
        setToasterNotification(false, 'err.message');
      });
  }
  const logoutHandler = () => {
    console.log('logout handler');
  };
  return (
    <authContext.Provider
      value={{
        userName,
        userEmail,
        userPassword,
        setUserName,
        setUserPassword,
        setUserEmail,
        handlerRegister,
        handleLogin,
        isUserLoggedIn,
        logoutHandler,
        checkedUserLoggedIn,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
export default AuthContextProvider;
