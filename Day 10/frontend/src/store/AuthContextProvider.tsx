import axios from 'axios';
import React, { SetStateAction } from 'react';
import { server_url } from './config';
import { mainContext } from './MainContextProvider';
import { SlideOutDown } from 'react-native-reanimated';
import { StackActions, useNavigation } from '@react-navigation/native';
import * as keychain from 'react-native-keychain';
type authContextType = {
  userPhoneNumber: string;
  setUserPhoneNumber: React.Dispatch<SetStateAction<string>>;
  userFirstName: string;
  setUserFirstName: React.Dispatch<SetStateAction<string>>;
  userMiddleName: string;
  setUserMiddleName: React.Dispatch<SetStateAction<string>>;
  userLastName: string;
  setUserLastName: React.Dispatch<SetStateAction<string>>;
  loginHandler: () => void;
  registerHandler: () => void;
  optVerifyForAuth: (otp: string) => void;
  userEmail: string;
  setUserEmail: React.Dispatch<SetStateAction<string>>;
  logoutHandler: () => void;
};
export const authContext = React.createContext<authContextType>({
  userPhoneNumber: '',
  setUserPhoneNumber: () => {},
  userFirstName: '',
  setUserFirstName: () => {},
  userMiddleName: '',
  setUserMiddleName: () => {},
  userLastName: '',
  setUserLastName: () => {},
  loginHandler: () => {},
  registerHandler: () => {},
  optVerifyForAuth: (otp: string) => {},
  userEmail: '',
  setUserEmail: () => {},
  logoutHandler: () => {},
});
function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const nav = useNavigation<any>();
  const { showNotificaiton } = React.useContext(mainContext);
  const [userPhoneNumber, setUserPhoneNumber] = React.useState<string>('');
  const [userFirstName, setUserFirstName] = React.useState<string>('');
  const [userMiddleName, setUserMiddleName] = React.useState<string>('');
  const [userLastName, setUserLastName] = React.useState<string>('');
  const [userEmail, setUserEmail] = React.useState<string>('');
  function loginHandler() {
    console.log('login handler has been started');

    const phoneNumber = userPhoneNumber?.trim();

    if (!phoneNumber) {
      showNotificaiton(false, 'Phone number is required');
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(phoneNumber)) {
      showNotificaiton(false, 'Please enter a valid 10-digit phone number');
      return;
    }

    const data = {
      userPhoneNumber: phoneNumber,
    };

    axios
      .post(`${server_url}/api/auth/login`, data)
      .then(response => {
        showNotificaiton(response.data.status, response.data.message);
        nav.dispatch(StackActions.replace('Otp'));
      })
      .catch(err => {
        console.log(err);
        showNotificaiton(
          false,
          err.response?.data?.message || 'Something went wrong',
        );
      })
      .finally(() => {
        console.log('the login handler finally run');
      });
  }
  function registerHandler() {
    console.log('register handler runned');

    const firstName = userFirstName?.trim();
    const middleName = userMiddleName?.trim();
    const lastName = userLastName?.trim();
    const phoneNumber = userPhoneNumber?.trim();
    const email = userEmail?.trim();

    if (!firstName) {
      showNotificaiton(false, 'First name is required');
      return;
    }

    if (!lastName) {
      showNotificaiton(false, 'Last name is required');
      return;
    }

    if (!phoneNumber) {
      showNotificaiton(false, 'Phone number is required');
      return;
    }

    if (!email) {
      showNotificaiton(false, 'Email is required');
      return;
    }

    const nameRegex = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;

    if (!nameRegex.test(firstName)) {
      showNotificaiton(false, 'Please enter a valid first name');
      return;
    }

    if (middleName && !nameRegex.test(middleName)) {
      showNotificaiton(false, 'Please enter a valid middle name');
      return;
    }

    if (!nameRegex.test(lastName)) {
      showNotificaiton(false, 'Please enter a valid last name');
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(phoneNumber)) {
      showNotificaiton(false, 'Please enter a valid 10-digit phone number');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      showNotificaiton(false, 'Please enter a valid email address');
      return;
    }

    const data = {
      userFirstName: firstName,
      userMiddleName: middleName || null,
      userLastName: lastName,
      userPhoneNumber: phoneNumber,
      userEmail: email,
    };

    axios
      .post(`${server_url}/api/auth/register`, data)
      .then(response => {
        showNotificaiton(response.data.status, response.data.message);
        if (response.data.token) {
        }
        nav.navigate('otp');
      })
      .catch(error => {
        showNotificaiton(
          false,
          error.response?.data?.message || 'Something went wrong',
        );
      })
      .finally(() => {
        console.log('register handler runned completly');
      });
  }
  function optVerifyForAuth(otp: string) {
    const data = {
      userPhoneNumber,
      otp,
    };
    console.log(data);
    axios
      .post(`${server_url}/api/auth/verify-otp`, data)
      .then(async response => {
        showNotificaiton(response.data.status, response.data.message);
        if (response.data.token) {
          await keychain.setGenericPassword('token', response.data.token);
        }
        nav.dispatch(StackActions.replace('Home'));
      })
      .catch(error => {
        if (error.response) {
          showNotificaiton(
            error.response.data.status,
            error.response.data.message,
          );
        } else if (error.request) {
          showNotificaiton(false, 'Unable to connect to the server');
        } else {
          showNotificaiton(false, 'Something went wrong');
        }
      });
  }
  async function logoutHandler() {
    const isTokenClear = await keychain.resetGenericPassword();
    if (isTokenClear) {
      nav.navigate('Splash');
    } else {
      showNotificaiton(false, 'unable to logout');
    }
  }
  return (
    <>
      <authContext.Provider
        value={{
          loginHandler,
          registerHandler,
          userPhoneNumber,
          userFirstName,
          userMiddleName,
          setUserFirstName,
          setUserLastName,
          setUserMiddleName,
          setUserPhoneNumber,
          userLastName,
          optVerifyForAuth,
          setUserEmail,
          userEmail,
          logoutHandler,
        }}
      >
        {children}
      </authContext.Provider>
    </>
  );
}
export default AuthContextProvider;
