import React, { Children } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
type QuntitySelectorButtonType = {
  onPress: (event: Event) => void;
  children: React.ReactNode;
};
import lightTheme from '../../../theme/lightTheme';
const QuantitySelectorButton = (props: QuntitySelectorButtonType) => {
  return (
    <TouchableOpacity
      onPress={(event: Event) => props.onPress(event)}
      style={style.buttonStyle}
    >
      {props.children}
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  buttonStyle: {
    backgroundColor: lightTheme.colors.primaryLight,
    borderRadius: lightTheme.radius.xs,
    padding: 0.5,
    paddingHorizontal: 4,
    borderColor: lightTheme.colors.primaryLight,
    borderWidth: 2,
    borderStyle: 'solid',
  },
});
export default QuantitySelectorButton;
