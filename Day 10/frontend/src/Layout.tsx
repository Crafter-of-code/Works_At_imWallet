import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import StackNavigation from './nav/StackNavigation';
import MainContextProvider from './store/MainContextProvider';
import AuthContextProvider from './store/AuthContextProvider';
import AppContextProvider from './store/AppContextProvider';
import Toast from './component/Toaster';
function Layout(): React.ReactElement {
  return (
    <>
      <NavigationContainer>
        <MainContextProvider>
          <AuthContextProvider>
            <AppContextProvider>
              <Toast />
              <StackNavigation />
            </AppContextProvider>
          </AuthContextProvider>
        </MainContextProvider>
      </NavigationContainer>
    </>
  );
}
export default Layout;
