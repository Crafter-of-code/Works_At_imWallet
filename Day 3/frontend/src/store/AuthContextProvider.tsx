import React, { SetStateAction } from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';

import { server_url } from './Config';
import { mainContext } from './MainContextProvider';

type AuthContextType = {
  userName: string;
  userEmail: string;
  userPassword: string;
  userConfirmPassword: string;

  userNameError: string;
  userEmailError: string;
  userPasswordError: string;
  userConfirmPasswordError: string;

  userOtp: string;

  handleRegister: () => void;
  handleLogin: () => void;
  verifyOtp: () => Promise<void>;

  setUserNameError: React.Dispatch<React.SetStateAction<string>>;
  setUserEmailError: React.Dispatch<React.SetStateAction<string>>;
  setUserPasswordError: React.Dispatch<React.SetStateAction<string>>;
  setUserConfirmPasswordError: React.Dispatch<React.SetStateAction<string>>;

  setUserName: React.Dispatch<React.SetStateAction<string>>;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
  setUserPassword: React.Dispatch<React.SetStateAction<string>>;
  setUserConfirmPassword: React.Dispatch<React.SetStateAction<string>>;

  setUserOtp: React.Dispatch<SetStateAction<string>>;
};

const authContext = React.createContext<AuthContextType>({
  userName: '',
  userEmail: '',
  userPassword: '',
  userConfirmPassword: '',

  userNameError: '',
  userEmailError: '',
  userPasswordError: '',
  userConfirmPasswordError: '',

  userOtp: '',

  setUserNameError: () => {},
  setUserEmailError: () => {},
  setUserPasswordError: () => {},
  setUserConfirmPasswordError: () => {},

  setUserName: () => {},
  setUserEmail: () => {},
  setUserPassword: () => {},
  setUserConfirmPassword: () => {},

  handleRegister: () => {},
  handleLogin: () => {},
  verifyOtp: async () => {},

  setUserOtp: () => {},
});

function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const { serverResponseHandler, setAccessToken } =
    React.useContext(mainContext);

  const [userName, setUserName] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');
  const [userConfirmPassword, setUserConfirmPassword] = React.useState('');

  const [userNameError, setUserNameError] = React.useState('');

  const [userEmailError, setUserEmailError] = React.useState('');

  const [userPasswordError, setUserPasswordError] = React.useState('');

  const [userConfirmPasswordError, setUserConfirmPasswordError] =
    React.useState('');

  const [userOtp, setUserOtp] = React.useState('');

  const nav = useNavigation<any>();
  const handleRegister = (): void => {
    let isValid = true;

    setUserNameError('');
    setUserEmailError('');
    setUserPasswordError('');
    setUserConfirmPasswordError('');

    // Name validation
    if (!userName.trim()) {
      setUserNameError('Please enter your full name.');

      isValid = false;
    } else if (userName.trim().length < 3) {
      setUserNameError('Name must be at least 3 characters.');

      isValid = false;
    }

    // Email validation
    if (!userEmail.trim()) {
      setUserEmailError('Please enter your email address.');

      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail.trim())) {
      setUserEmailError('Please enter a valid email address.');

      isValid = false;
    }

    // Password validation
    if (!userPassword) {
      setUserPasswordError('Please enter a password.');

      isValid = false;
    } else if (userPassword.length < 8) {
      setUserPasswordError('Password must be at least 8 characters.');

      isValid = false;
    } else if (!/^(?=.*@)(?=.*#)(?=.*\d).{8,}$/.test(userPassword)) {
      setUserPasswordError(
        'Password must contain @, #, and at least one number (0-9), and be at least 8 characters.',
      );

      isValid = false;
    }

    // Confirm password
    if (!userConfirmPassword) {
      setUserConfirmPasswordError('Please confirm your password.');

      isValid = false;
    } else if (userPassword !== userConfirmPassword) {
      setUserConfirmPasswordError('Passwords do not match.');

      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const data = {
      userName: userName.trim(),
      userEmail: userEmail.trim(),
      userPassword,
    };

    fetch(`${server_url}/signin`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      credentials: 'include',

      body: JSON.stringify(data),
    })
      .then(async response => {
        const result = await response.json();

        console.log('Register response:', result);

        if (!response.ok) {
          throw new Error(result.message || 'Registration failed');
        }

        return result;
      })

      .then(result => {
        serverResponseHandler(result.message, result.status);

        /*
         * Backend has already generated and sent OTP.
         *
         * Therefore:
         *
         * DO NOT call /send-otp here.
         */

        if (result.status) {
          // OTP screen needs the email
          setUserEmail(userEmail.trim());

          nav.dispatch(StackActions.replace('otp'));
        }
      })

      .catch(error => {
        console.log('Registration error:', error);

        serverResponseHandler(error.message || 'Registration failed', false);
      });
  };
  const handleLogin = (): void => {
    let isValid = true;

    setUserEmailError('');
    setUserPasswordError('');

    // Email validation
    if (!userEmail.trim()) {
      setUserEmailError('Please enter your email address.');

      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail.trim())) {
      setUserEmailError('Please enter a valid email address.');

      isValid = false;
    }

    // Password validation
    if (!userPassword) {
      setUserPasswordError('Please enter your password.');

      isValid = false;
    } else if (userPassword.length < 8) {
      setUserPasswordError('Password must be at least 8 characters.');

      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const data = {
      userEmail: userEmail.trim(),
      userPassword,
    };

    fetch(`${server_url}/login`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      credentials: 'include',

      body: JSON.stringify(data),
    })
      .then(async response => {
        const result = await response.json();

        console.log('Login response:', result);

        /*
         * IMPORTANT:
         *
         * Do not immediately throw on !response.ok.
         *
         * Your backend may return HTTP 400/401 for
         * an unverified user while still giving us
         * a useful message.
         */

        return {
          response,
          result,
        };
      })

      .then(({ response, result }) => {
        console.log('Login result:', result);

        serverResponseHandler(result.message, result.status);

        /*
         * ============================================
         * USER IS VERIFIED
         * ============================================
         */

        if (response.ok && result.status) {
          const token = result.data?.token;

          if (!token) {
            console.log('JWT token missing from login response');

            serverResponseHandler(
              'Login successful but token was not received.',
              false,
            );

            return;
          }

          /*
           * Store JWT in MainContext.
           *
           * Your MainContext can then save it
           * securely using Keychain.
           */
          setAccessToken(token);

          /*
           * Clear OTP because verification
           * is no longer required.
           */
          setUserOtp('');

          nav.dispatch(StackActions.replace('home'));

          return;
        }
        if (
          !result.status &&
          (result.message?.toLowerCase().includes('not verified') ||
            result.message?.toLowerCase().includes('otp'))
        ) {
          nav.dispatch(StackActions.replace('otp'));

          return;
        }
        if (!response.ok) {
          serverResponseHandler(result.message || 'Login failed', false);
        }
      })

      .catch(error => {
        console.log('Login error:', error);

        serverResponseHandler(error.message || 'Unable to login', false);
      });
  };
  const verifyOtp = async (): Promise<void> => {
    if (!userEmail.trim()) {
      serverResponseHandler('Email is required for OTP verification.', false);

      return;
    }

    if (!userOtp.trim()) {
      serverResponseHandler('Please enter the OTP.', false);

      return;
    }

    if (userOtp.trim().length !== 6) {
      serverResponseHandler('OTP must be 6 digits.', false);

      return;
    }

    const data = {
      userEmail: userEmail.trim(),
      userOtp: userOtp.trim(),
    };

    try {
      const response = await fetch(`${server_url}/verify-otp`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(data),
      });

      const result = await response.json();

      console.log('Verify OTP response:', result);

      serverResponseHandler(result.message, result.status);

      if (!response.ok || !result.status) {
        return;
      }
      const loginData = {
        userEmail: userEmail.trim(),
        userPassword,
      };

      const loginResponse = await fetch(`${server_url}/login`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        credentials: 'include',

        body: JSON.stringify(loginData),
      });

      const loginResult = await loginResponse.json();

      console.log('Login after OTP response:', loginResult);

      if (!loginResponse.ok || !loginResult.status) {
        serverResponseHandler(
          loginResult.message || 'Verification successful, but login failed.',
          false,
        );

        return;
      }

      /*
       * Get JWT
       */
      const token = loginResult.data?.token;

      if (!token) {
        serverResponseHandler(
          'Verification successful but token was not received.',
          false,
        );

        return;
      }
      setAccessToken(token);
      setUserOtp('');
      nav.dispatch(StackActions.replace('home'));
    } catch (error) {
      console.log('Verify OTP error:', error);
      serverResponseHandler('Unable to verify OTP.', false);
    }
  };

  return (
    <authContext.Provider
      value={{
        userName,
        setUserName,

        userEmail,
        setUserEmail,

        userPassword,
        setUserPassword,

        userConfirmPassword,
        setUserConfirmPassword,

        userNameError,
        setUserNameError,

        userEmailError,
        setUserEmailError,

        userPasswordError,
        setUserPasswordError,

        userConfirmPasswordError,
        setUserConfirmPasswordError,

        userOtp,
        setUserOtp,

        handleRegister,
        handleLogin,
        verifyOtp,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export { authContext };

export default AuthContextProvider;
