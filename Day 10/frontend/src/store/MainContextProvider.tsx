import { StackActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import * as keychain from 'react-native-keychain';

type mainContextType = {
  isUserAuthenticated: () => void;
  clearKeychain: () => void;

  message: string;
  status: boolean;
  clearToast: () => void;
  showNotificaiton: (status: boolean, message: string) => void;
};

export const mainContext = React.createContext<mainContextType>({
  isUserAuthenticated: () => {},
  clearKeychain: () => {},

  message: '',
  status: false,
  clearToast: () => {},
  showNotificaiton: () => {},
});

function MainContextProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const nav = useNavigation();

  const [message, setMessage] = React.useState<string>('');
  const [status, setStatus] = React.useState<boolean>(false);

  const toastTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  async function isUserAuthenticated() {
    const isAlreadyLogin = await keychain.getGenericPassword();

    setTimeout(() => {
      if (isAlreadyLogin) {
        return nav.dispatch(StackActions.replace('Home'));
      } else {
        nav.dispatch(StackActions.replace('Login'));
      }
    }, 0);
  }

  async function clearKeychain() {
    const result = await keychain.resetGenericPassword();

    console.log('Keychain cleared:', result);
  }

  const clearToast = () => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
      toastTimer.current = null;
    }

    setMessage('');
    setStatus(false);
  };

  const showNotificaiton = (status: boolean, message: string) => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    setStatus(status);
    setMessage(message);

    toastTimer.current = setTimeout(() => {
      setStatus(false);
      setMessage('');
      toastTimer.current = null;
    }, 3000);
  };

  React.useEffect(() => {
    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
      }
    };
  }, []);

  return (
    <mainContext.Provider
      value={{
        isUserAuthenticated,
        clearKeychain,
        message,
        status,
        clearToast,
        showNotificaiton,
      }}
    >
      {children}
    </mainContext.Provider>
  );
}

export default MainContextProvider;
