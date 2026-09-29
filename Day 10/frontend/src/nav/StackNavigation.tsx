import { StackActionType } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SplashScreen from '../screen/SplashScreen';
import HomeScreen from '../screen/home/screen/HomeScreen';
import LoginScreen from '../screen/auth/LoginScreen';
import RegisterScreen from '../screen/auth/RegisterScreen';
import OtpScreen from '../screen/otp/page/OtpScreen';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import BottomTabNavigation from './BottomTabNavigation';
import EditProfileScreen from '../screen/edit-profile/screens/EditProfileScreen';

import FlightBookingScreen from '../screen/booking-screens/pages/FlightBookingScreen';
import BusBookingScreen from '../screen/booking-screens/pages/BusBookingScreen';
import HotelBookingScreen from '../screen/booking-screens/pages/HotelBookingScreen';
import PaymentScreen from '../screen/booking-screens/pages/PaymentScreen';
type stackNavigationType = {
  Splash: undefined;
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Otp: undefined;
  EditProfile: undefined;
  FlightBooking: undefined;
  BusBooking: undefined;
  HotelBooking: undefined;
  PaymentScreen: undefined;
};
const stackNavigation = createNativeStackNavigator<stackNavigationType>();
function StackNavigation(): React.ReactElement {
  return (
    <stackNavigation.Navigator screenOptions={{ headerShown: false }}>
      <stackNavigation.Screen name="Splash" component={SplashScreen} />
      <stackNavigation.Screen name="Login" component={LoginScreen} />
      <stackNavigation.Screen name="Register" component={RegisterScreen} />
      <stackNavigation.Screen name="Otp" component={OtpScreen} />
      <stackNavigation.Screen name="Home" component={BottomTabNavigation} />
      <stackNavigation.Screen
        name="FlightBooking"
        component={FlightBookingScreen}
      />
      <stackNavigation.Screen name="BusBooking" component={BusBookingScreen} />
      <stackNavigation.Screen
        name="EditProfile"
        component={EditProfileScreen}
      />
      <stackNavigation.Screen
        name="HotelBooking"
        component={HotelBookingScreen}
      />
      <stackNavigation.Screen name="PaymentScreen" component={PaymentScreen} />
    </stackNavigation.Navigator>
  );
}
export default StackNavigation;
