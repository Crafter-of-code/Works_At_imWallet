import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import StackNavigation from './Navigation/StackNavigation';
import SafeAreaContainer from './components/SafeAreaContainer';
import MainContextProvider from './store/MainContextProvider';
import AuthContextProvider from './store/AuthContextProvider';
import AppContextProvider from './store/AppContextProvider';
const Layout = (): React.ReactElement => {
  return (
    <NavigationContainer>
      <MainContextProvider>
        <AuthContextProvider>
          <AppContextProvider>
            <StackNavigation />
          </AppContextProvider>
        </AuthContextProvider>
      </MainContextProvider>
    </NavigationContainer>
  );
};
export default Layout;
