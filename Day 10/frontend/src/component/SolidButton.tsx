import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import lightTheme from '../theme/lightTheme';

type SolidButtonPropType = {
  children?: React.ReactNode;
  title: string;
  onPress: (event: GestureResponderEvent) => void;
};

function SolidButton(props: SolidButtonPropType): React.ReactElement {
  return (
    <TouchableOpacity
      style={styles.buttonStyle}
      activeOpacity={0.6}
      onPress={props.onPress}
    >
      {props.children ? (
        props.children
      ) : (
        <Text style={styles.buttonInTextColor}>{props.title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: lightTheme.colors.primary,
    borderRadius: lightTheme.radius.md,
    paddingVertical: lightTheme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonInTextColor: {
    color: lightTheme.colors.textOnPrimary,
    textAlign: 'center',
    fontFamily: lightTheme.typography.fontFamily.bold,
    fontSize: lightTheme.typography.fontSize.md,
  },
});

export default SolidButton;
