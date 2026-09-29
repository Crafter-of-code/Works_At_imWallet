import React, { Dispatch, SetStateAction, useState } from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';
import lightTheme from '../themes/lightTheme';
type CustomInputPropType = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeHolder: string;
  keyboardType: 'email-address' | 'number-pad';
  error: string;
};
const CustomInput = (props: CustomInputPropType): React.ReactElement => {
  const [focus, setFocus] = useState<boolean>(false);
  return (
    <>
      <TextInput
        value={props.value}
        onChangeText={text => props.setValue(text)}
        placeholder={props.placeHolder}
        style={[
          style.inputStyle,
          focus ? style.onFocusStyling : style.inputStyle,
        ]}
        keyboardType={props.keyboardType}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      <Text style={{ color: 'red', paddingHorizontal: 5 }}>{props.error}</Text>
    </>
  );
};
const style = StyleSheet.create({
  inputStyle: {
    padding: 10,
    borderWidth: 2,
    fontSize: lightTheme.typography.h4.fontSize,
    borderColor: lightTheme.colors.border,
    borderRadius: lightTheme.radius.lg,
    width: '100%',
  },
  onFocusStyling: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: lightTheme.radius.full,
  },
});
export default CustomInput;
