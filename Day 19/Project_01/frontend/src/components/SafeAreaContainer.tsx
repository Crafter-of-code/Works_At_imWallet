import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SafeAreaContainerInterface {
  children: React.ReactElement;
}
import lightTheme from '../themes/lightTheme';
const SafeAreaContainer = (
  props: SafeAreaContainerInterface,
): React.ReactElement => {
  return (
    <>
      <SafeAreaView
        style={style.mainContainer}
        edges={['top', 'left', 'right']}
      >
        {props.children}
      </SafeAreaView>
    </>
  );
};
const style = StyleSheet.create({
  mainContainer: {
    padding: 5,
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: lightTheme.colors.background,
  },
});
export default SafeAreaContainer;
