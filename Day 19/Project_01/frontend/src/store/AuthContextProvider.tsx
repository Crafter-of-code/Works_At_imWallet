import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { registerEventHandler } from 'react-native-reanimated/lib/typescript/core';
type authContextPropType = {
  children: ReactNode;
};
type authContextType = {
  loginHandler: () => void;
  registerHandler: () => void;
  logoutHandler: () => void;
  userFirstName: string;
  userLastName: string;
  userPhoneNumber: string;
  userEmail: string;
  setUserFirstName: Dispatch<SetStateAction<string>>;
  setUserLastName: Dispatch<SetStateAction<string>>;
  setUserPhoneNumber: Dispatch<SetStateAction<string>>;
  setUserEmail: Dispatch<SetStateAction<string>>;
  phoneNumberError: string;
  setPhoneNumberError: Dispatch<SetStateAction<string>>;
  userMiddleName: string;
  setUserMiddleName: React.Dispatch<SetStateAction<string>>;
  userFirstNameError: string;
  setUserFirstNameError: React.Dispatch<SetStateAction<string>>;
  userMiddleNameError: string;
  setUserMiddleNameError: React.Dispatch<SetStateAction<string>>;
  userLastNameError: string;
  setUserLastNameError: React.Dispatch<SetStateAction<string>>;
  userEmailError: string;
  setUserEmailError: React.Dispatch<SetStateAction<string>>;
};

export const authContext = createContext<authContextType>({
  loginHandler: () => {},
  logoutHandler: () => {},
  registerHandler: () => {},
  userFirstName: '',
  userLastName: '',
  userPhoneNumber: '',
  userEmail: '',
  setUserFirstName: () => {},
  setUserLastName: () => {},
  setUserPhoneNumber: () => {},
  setUserEmail: () => {},
  phoneNumberError: '',
  setPhoneNumberError: () => {},
  userMiddleName: '',
  setUserMiddleName: () => {},
  userFirstNameError: '',
  setUserFirstNameError: () => {},
  userMiddleNameError: '',
  setUserMiddleNameError: () => {},
  userLastNameError: '',
  setUserLastNameError: () => {},
  userEmailError: '',
  setUserEmailError: () => {},
});
const AuthContextProvider = (
  props: authContextPropType,
): React.ReactElement => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;
  const [userFirstName, setUserFirstName] = useState('');
  const [userMiddleName, setUserMiddleName] = useState<string>('');
  const [userLastName, setUserLastName] = useState<string>('');
  const [userPhoneNumber, setUserPhoneNumber] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [phoneNumberError, setPhoneNumberError] = useState<string>('');
  const [userFirstNameError, setUserFirstNameError] = useState<string>('');
  const [userMiddleNameError, setUserMiddleNameError] = useState<string>('');
  const [userLastNameError, setUserLastNameError] = useState<string>('');
  const [userEmailError, setUserEmailError] = useState<string>('');

  function registerHandler() {
    // if(){}
  }
  function loginHandler() {
    const result = phoneRegex.test(userPhoneNumber);
    if (!result) return setPhoneNumberError('Enter a valid phone number');
    console.log(userPhoneNumber);
  }
  function logoutHandler() {}
  return (
    <>
      <authContext.Provider
        value={{
          loginHandler,
          logoutHandler,
          registerHandler,
          setUserEmail,
          setUserFirstName,
          setUserLastName,
          setUserPhoneNumber,
          userEmail,
          userFirstName,
          userLastName,
          userPhoneNumber,
          phoneNumberError,
          setPhoneNumberError,
          userMiddleName,
          setUserMiddleName,
          userFirstNameError,
          setUserFirstNameError,
          userMiddleNameError,
          setUserMiddleNameError,
          userLastNameError,
          setUserLastNameError,
          userEmailError,
          setUserEmailError,
        }}
      >
        {props.children}
      </authContext.Provider>
    </>
  );
};
export default AuthContextProvider;
