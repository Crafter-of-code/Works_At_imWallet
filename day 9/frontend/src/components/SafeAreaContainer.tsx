import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
type containerProp = {
  children: React.ReactNode;
};
const SafeAreaContainer = (props: containerProp) => {
  return (
    <>
      <SafeAreaView style={style.mainContainer}>{props.children}</SafeAreaView>
    </>
  );
};
const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // padding: 20,
    backgroundColor: '#FAFAF8',
    // paddingHorizontal: 25,
    // paddingVertical: 25,
  },
});
export default SafeAreaContainer;
