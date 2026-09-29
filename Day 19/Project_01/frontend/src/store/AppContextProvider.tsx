import { createContext, useState } from 'react';
type AppContextProviderPropType = {
  children: React.ReactNode;
};
type appContexType = {};
const appContext = createContext<appContexType>({});
function AppContextProvider(
  props: AppContextProviderPropType,
): React.ReactElement {
  return <appContext.Provider value={{}}>{props.children}</appContext.Provider>;
}
export default AppContextProvider;
