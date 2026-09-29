import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import StackNavigation from './routes/StackNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthContextProvider from './store/AuthContextProvider';
function Layout() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <StackNavigation />
      </AuthContextProvider>
    </NavigationContainer>
  );
}
export default Layout;
