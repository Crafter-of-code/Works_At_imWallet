import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ToasterProvider = (): React.ReactElement => {
  return (
    <>
      <View style={style.mainContainer}>
        <Text>this is toaster</Text>
      </View>
    </>
  );
};
const style = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
export default ToasterProvider;
