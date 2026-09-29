import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import StackNavigation from './routes/StackNavgation';
import AuthContextProvider from './store/AuthContextProvider';
import AppContextProvider from './store/AppContextProvider';
import { ChatContextProvider } from './store/ChatContextProvider';
class Layout extends React.Component {
  render(): React.ReactElement {
    return (
      <>
        <NavigationContainer>
          <AuthContextProvider>
            <AppContextProvider>
              <ChatContextProvider>
                <StackNavigation />
              </ChatContextProvider>
            </AppContextProvider>
          </AuthContextProvider>
        </NavigationContainer>
      </>
    );
  }
}
export default Layout;
