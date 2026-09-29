import axios from 'axios';
import React from 'react';
import { experimental_LayoutConformance } from 'react-native';
import { server_url } from './config';
type appContextType = {
  getUserDetail: () => void;
};
export const appContext = React.createContext<appContextType>({
  getUserDetail: () => {},
});
function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [userPhoneNumber, setUserPhoneNumber] = React.useState<string>('');
  const [userFirstName, setUserFirstName] = React.useState<string>('');
  const [userMiddleName, setUserMiddleName] = React.useState<string>('');
  const [userLastName, setUserLastName] = React.useState<string>('');
  const [userEmail, setUserEmail] = React.useState<string>('');
  function getUserDetail() {
    axios
      .get(`${server_url}/api/profile`)
      .then()
      .catch(response => console.log(response));
  }
  return (
    <>
      <appContext.Provider value={{ getUserDetail }}>
        {children}
      </appContext.Provider>
    </>
  );
}
export default AppContextProvider;
