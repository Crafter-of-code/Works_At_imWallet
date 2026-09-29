/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Layout from './src/Layout';
import AuthContextProvider from './src/store/AuthContextProvider';
import MainContextProvider from './src/store/MainContextProvider';
import Toaster from './src/components/Toaster';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <MainContextProvider>
        <Toaster />
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
