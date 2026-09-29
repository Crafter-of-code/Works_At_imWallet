import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
type stackType = {
  Splash: undefined;
  Login: undefined;
  register: undefined;
};
const stack = createStackNavigator<stackType>();
const StackNavigation = (): React.ReactElement => {
  return (
    <>
      <stack.Navigator screenOptions={{ headerShown: false }}>
        <stack.Screen name="Splash" component={SplashScreen} />
        <stack.Screen name="Login" component={LoginScreen} />
        <stack.Screen name="register" component={RegisterScreen} />
      </stack.Navigator>
    </>
  );
};
export default StackNavigation;
