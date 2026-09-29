import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import RootPage from '../pages/root/page/RootPage';
import LoginPage from '../pages/auth/LoginPage';
import SigninPage from '../pages/auth/SigninPage';
import OtpPage from '../pages/auth/OtpPage';
import HomePage from '../pages/home/page/HomePage';
import ProfileScreen from '../pages/profile/screens/ProfileScreen';
import TransactionsPage from '../pages/transactions/screens/TransactionsScreen';
import ChatScreen from '../pages/chat/screens/ChatScreen';
import SearchUserScreen from '../pages/searchuser/pages/SearchUserScreen';
const stackNavigation = createNativeStackNavigator();
class StackNavigation extends React.Component {
  render(): React.ReactElement {
    return (
      <>
        <stackNavigation.Navigator screenOptions={{ headerShown: false }}>
          <stackNavigation.Screen name="root" component={RootPage} />
          <stackNavigation.Screen name="signin" component={SigninPage} />
          <stackNavigation.Screen name="otp" component={OtpPage} />
          <stackNavigation.Screen name="login" component={LoginPage} />
          <stackNavigation.Screen name="home" component={HomePage} />
          <stackNavigation.Screen name="profile" component={ProfileScreen} />
          <stackNavigation.Screen name="search" component={SearchUserScreen} />
          <stackNavigation.Screen
            name="transaction"
            component={TransactionsPage}
          />
          <stackNavigation.Screen name="chat" component={ChatScreen} />
        </stackNavigation.Navigator>
      </>
    );
  }
}
export default StackNavigation;
