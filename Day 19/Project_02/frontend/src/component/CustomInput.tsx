import React, { SetStateAction } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import lightTheme from '../theme/lightTheme';
enum EnumKeyboardType {
  DEFAULT = 'default',
  EMAIL_ADDRESS = 'email-address',
  NUMERIC = 'numeric',
  PHONE_PAD = 'phone-pad',
  DECIMAL_PAD = 'decimal-pad',
  NUMBER_PAD = 'number-pad',
  ASCII_CAPABLE = 'ascii-capable',
  NUMBERS_AND_PUNCTUATION = 'numbers-and-punctuation',
  URL = 'url',
  NAME_PHONE_PAD = 'name-phone-pad',
  TWITTER = 'twitter',
  WEB_SEARCH = 'web-search',
  VISIBLE_PASSWORD = 'visible-password',
}
type CustomInputPropType = {
  onChange: React.Dispatch<SetStateAction<string>>;
  value: string;
  placeHolder: string;
  keyboardType: EnumKeyboardType;
};

function CustomInput(props: CustomInputPropType): React.ReactElement {
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  return (
    <TextInput
      onChangeText={text => props.onChange(text)}
      placeholder={props.placeHolder}
      value={props.value}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={[style.textInput, isFocused && style.focusedInput]}
      keyboardType={props.keyboardType}
    />
  );
}

const style = StyleSheet.create({
  textInput: {
    padding: 5,
    paddingHorizontal: 10,
    fontFamily: lightTheme.typography.fontFamily.regular,
    fontSize: lightTheme.typography.fontSize.lg,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: lightTheme.radius.pill,
    minHeight: 20,
    minWidth: 20,
  },

  focusedInput: {
    borderColor: lightTheme.colors.secondary,
    borderWidth: 2,
  },
});

export default CustomInput;
