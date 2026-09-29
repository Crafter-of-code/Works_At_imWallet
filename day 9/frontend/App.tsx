/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import Layout from './src/Layout';
import MainContextProvider from './src/store/MainContextProvider';
import ToastManager from 'toastify-react-native/components/ToastManager';
import MyToaster from './src/components/MyToaster';

function App() {
  return (
    <>
      <MainContextProvider>
        <MyToaster />
        <Layout />
      </MainContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
