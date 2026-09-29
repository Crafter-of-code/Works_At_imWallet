import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import lightTheme from '../themes/lightTheme';
type solidButtonPropType = {
  tittle?: string;
  children?: React.ReactNode;
  onPress: (event: Event) => void;
};
const SolidButton = (props: solidButtonPropType): React.ReactElement => {
  return (
    <>
      <TouchableOpacity
        onPress={(event: Event) => props.onPress(event)}
        activeOpacity={0.7}
        style={style.buttonStyling}
      >
        {props.children ? (
          props.children
        ) : (
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              padding: 10,
              fontSize: 15,
              fontWeight: 700,
            }}
          >
            {props.tittle}
          </Text>
        )}
      </TouchableOpacity>
    </>
  );
};
const style = StyleSheet.create({
  buttonStyling: {
    width: '100%',
    backgroundColor: lightTheme.colors.accent,
    borderRadius: lightTheme.radius.full,
  },
});
export default SolidButton;
