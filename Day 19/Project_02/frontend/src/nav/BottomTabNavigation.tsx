import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import lightTheme from '../theme/lightTheme';
import HomeScreen from '../screen/home/screen/HomeScreen';
import MyTripScreen from '../screen/my-trip/screens/MyTripScreen';
import ProfileScreen from '../screen/profile/screens/ProfileScreen';
type BottomTabType = {
  home: undefined;
  testing2: undefined;
  'my-trip': undefined;
  profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabType>();

const BottomTabBar = ({
  state,
  descriptors,
  insets,
  navigation,
}: BottomTabBarProps) => {
  // const iconArray = [home];
  // style={{ backgroundColor: lightTheme.colors.background }}
  return (
    <>
      <View style={styles.container}>
        {state.routes.map((routes, index) => {
          const isFocused = state.index === index;
          // const icon = iconArray[index];
          const handlePress = () => {
            if (!isFocused) {
              navigation.navigate(routes.name);
            }
          };
          return (
            <Pressable
              key={routes.key}
              onPress={handlePress}
              style={[
                styles.tab,
                isFocused && {
                  backgroundColor: '#F1F6F2',
                },
              ]}
            >
              <Text style={[styles.icon, isFocused && styles.activeIcon]}>
                {routes.name === 'home' && '⌂'}
                {routes.name === 'explore' && '⌕'}
                {routes.name === 'saved' && '♡'}
                {routes.name === 'trips' && '◉'}
                {routes.name === 'profile' && '●'}
                {routes.name === 'my-trip' && '✈︎'}
              </Text>

              <Text style={[styles.label, isFocused && styles.activeLabel]}>
                {routes.name == 'my-trip' ? 'My Trip' : routes.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </>
  );
};

function BottomTabNavigation() {
  return (
    <Tab.Navigator
      tabBar={props => <BottomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen
        name="my-trip"
        component={MyTripScreen}
        options={{ title: 'My Trip' }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 15,
    right: 15,
    bottom: 15,

    height: 70,

    flexDirection: 'row',
    alignItems: 'center',

    padding: 10,

    backgroundColor: '#FFFFFF',

    borderRadius: lightTheme.radius.pill,

    borderWidth: 1,
    borderColor: '#E6E9E5',

    elevation: 8,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,

    zIndex: 100,
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: lightTheme.radius.pill,
  },

  label: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: '500',
    color: '#68716B',
  },

  activeLabel: {
    color: '#1D402D',
    fontWeight: '700',
  },

  icon: {
    fontSize: 15,
    color: '#68716B',
  },

  activeIcon: {
    color: '#1D402D',
  },
});
export default BottomTabNavigation;
