import React, { SetStateAction } from 'react';
import * as Keychain from 'react-native-keychain';
import { createBlake3 } from 'react-native-quick-crypto';
type mainContextType = {
  successStatus: boolean | null;
  successMessage: string;
  serverResponseHandler: (message: string, status: boolean | null) => void;
  setAccessToken: (token: string) => void;
  getAccessToken: () => Promise<string>;
};
type mainContextProviderPropsType = {
  children: React.ReactNode;
};
const mainContext = React.createContext<mainContextType>({
  successStatus: false,
  successMessage: '',
  serverResponseHandler: (message: string, status: boolean | null) => {},
  setAccessToken: (token: string) => {},
  getAccessToken: async () => '',
});
function MainContextProvider(
  props: mainContextProviderPropsType,
): React.ReactElement {
  const [successStatus, setSuccessStatus] = React.useState<boolean | null>(
    false,
  );
  const [encryptionKey, setEncryptionKey] = React.useState();
  const [successMessage, setSuccessMessage] = React.useState<string>('');
  function serverResponseHandler(message: string, status: boolean | null) {
    setSuccessMessage(message);
    setSuccessStatus(status);
    setTimeout(() => {
      if (message != '') {
        serverResponseHandler('', false);
      } else {
        return;
      }
    }, 2000);
  }
  async function setAccessToken(token: string) {
    await Keychain.setGenericPassword('authToken', token);
  }
  async function getAccessToken(): Promise<string> {
    try {
      const credentials = await Keychain.getGenericPassword();
      return credentials ? credentials.password : '';
    } catch (e) {
      console.error('enable to find the requised token');
      return '';
    }
  }
  return (
    <>
      <mainContext.Provider
        value={{
          serverResponseHandler,
          successStatus,
          successMessage,
          setAccessToken,
          getAccessToken,
        }}
      >
        {props.children}
      </mainContext.Provider>
    </>
  );
}
export { mainContext };
export default MainContextProvider;
