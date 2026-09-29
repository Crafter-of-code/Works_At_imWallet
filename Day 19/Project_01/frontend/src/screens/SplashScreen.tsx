import React, { useContext, useEffect, useState } from 'react';
import SafeAreaContainer from '../components/SafeAreaContainer';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import lightTheme from '../themes/lightTheme';
import { mainContext } from '../store/MainContextProvider';
const SplashScreen = (): React.ReactElement => {
  const { appName, fetchDarkMode, checkIsUserloggedIn } =
    useContext(mainContext);
  useEffect(() => {
    checkIsUserloggedIn();
  }, []);
  return (
    <>
      <SafeAreaContainer>
        <View style={style.mainContainer}>
          <Text style={style.headingStyle}>{appName}</Text>
        </View>
      </SafeAreaContainer>
    </>
  );
};
const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingStyle: {
    fontSize: lightTheme.typography.h1.fontSize,
    textTransform: 'uppercase',
  },
});
export default SplashScreen;
