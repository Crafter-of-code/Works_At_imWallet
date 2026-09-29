import React, { Children } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import lightTheme from '../theme/lightTheme';
function SafeAreaContainer({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SafeAreaView
        style={style.mainContainer}
        edges={['top', 'left', 'right']}
      >
        {children}
      </SafeAreaView>
    </>
  );
}
const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // padding: 5,
    paddingHorizontal: 10,
    backgroundColor: lightTheme.colors.background,
    paddingBottom: 0,
  },
});
export default SafeAreaContainer;
