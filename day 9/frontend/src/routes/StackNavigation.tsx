import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/splash/pages/SplashScreen';
import OnboardingScreenFirst from '../screens/onboarding/OnboardingScreenFirst';
import OnboardingScreenSecond from '../screens/onboarding/OnboardingScreenSecond';
const stackNavigation = createNativeStackNavigator();
function StackNavigation(): React.ReactElement {
  return (
    <>
      <stackNavigation.Navigator screenOptions={{ headerShown: false }}>
        <stackNavigation.Screen name="splash" component={SplashScreen} />
        <stackNavigation.Screen name="login" component={LoginScreen} />
        <stackNavigation.Screen name="register" component={RegisterScreen} />
        <stackNavigation.Screen name="home" component={HomeScreen} />
        <stackNavigation.Screen
          name="onboardingsecond"
          component={OnboardingScreenSecond}
        />
        <stackNavigation.Screen
          name="onboardingfirst"
          component={OnboardingScreenFirst}
        />
      </stackNavigation.Navigator>
    </>
  );
}
export default StackNavigation;
