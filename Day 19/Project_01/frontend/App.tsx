/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import Layout from './src/Layout';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    console.log(isDarkMode);
  });
  return <Layout />;
}

export default App;
