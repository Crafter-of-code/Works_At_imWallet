/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { useEffect } from 'react';
import Layout from './src/Layout';
import { Platform } from 'react-native';
function App() {
  console.log(Platform);
  return (
    <>
      <Layout />
    </>
  );
}

export default App;
