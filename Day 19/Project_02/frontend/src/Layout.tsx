import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import StackNavigation from './nav/StackNavigation';
import MainContextProvider from './store/MainContextProvider';
import AuthContextProvider from './store/AuthContextProvider';
import AppContextProvider from './store/AppContextProvider';
import Toast from './component/Toaster';
import SearchSelectContextProvider from './store/SearchSelectContextProvider';
import BookingContextProvider from './store/BookingContextProvider';
function Layout(): React.ReactElement {
  return (
    <>
      <NavigationContainer>
        <MainContextProvider>
          <AuthContextProvider>
            <AppContextProvider>
              <SearchSelectContextProvider>
                <BookingContextProvider>
                  <Toast />
                </BookingContextProvider>
                <StackNavigation />
              </SearchSelectContextProvider>
            </AppContextProvider>
          </AuthContextProvider>
        </MainContextProvider>
      </NavigationContainer>
    </>
  );
}
export default Layout;
