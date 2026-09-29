import React, { SetStateAction } from 'react';
type mainContextType = {
  appName: string;
  status: boolean;
  setStatus: React.Dispatch<SetStateAction<boolean>>;
  message: string;
  setMessage: React.Dispatch<SetStateAction<string>>;
  setToasterNotification: (status: boolean, message: string) => void;
  isDarkModel: boolean;
  setIsDarkMode: React.Dispatch<SetStateAction<boolean>>;
};
export const mainContext = React.createContext<mainContextType>({
  appName: '',
  status: false,
  setStatus: () => {},
  message: '',
  setMessage: () => {},
  setToasterNotification: () => {},
  isDarkModel: false,
  setIsDarkMode: () => {},
});
function MainContextProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const appName: string = 'VaultPay';
  const [isDarkModel, setIsDarkMode] = React.useState<boolean>(false);
  const [status, setStatus] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');
  function setToasterNotification(status: boolean, message: string) {
    setStatus(status);
    setMessage(message);
    setTimeout(() => {
      setStatus(false);
      setMessage('');
    }, 3000);
  }
  return (
    <>
      <mainContext.Provider
        value={{
          appName,
          status,
          message,
          setMessage,
          setStatus,
          setToasterNotification,
          isDarkModel,
          setIsDarkMode,
        }}
      >
        {children}
      </mainContext.Provider>
    </>
  );
}
export default MainContextProvider;
