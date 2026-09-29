import React, { SetStateAction } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import lightTheme from '../../../theme/lightTheme';

type OtpComponentProps = {
  onOtpChange: React.Dispatch<SetStateAction<string>>;
};

function OtpComponent({ onOtpChange }: OtpComponentProps): React.ReactElement {
  const firstInput = React.useRef<TextInput>(null);
  const secondInput = React.useRef<TextInput>(null);
  const thirdInput = React.useRef<TextInput>(null);
  const fourthInput = React.useRef<TextInput>(null);
  const fifthInput = React.useRef<TextInput>(null);
  const sixthInput = React.useRef<TextInput>(null);

  const [otp, setOtp] = React.useState<string[]>(['', '', '', '', '', '']);

  const inputArr = [
    firstInput,
    secondInput,
    thirdInput,
    fourthInput,
    fifthInput,
    sixthInput,
  ];

  const handleChange = (text: string, index: number) => {
    const value = text.replace(/[^0-9]/g, '');

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);

    onOtpChange(newOtp.join(''));

    if (value.length === 1 && index < inputArr.length - 1) {
      inputArr[index + 1].current?.focus();
    }
  };

  return (
    <View style={style.mainContainer}>
      {inputArr.map((item, index) => (
        <TextInput
          key={index}
          ref={item}
          style={[style.textInput, style.focusedInput]}
          maxLength={1}
          keyboardType="number-pad"
          value={otp[index]}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={({ nativeEvent }) => {
            if (
              nativeEvent.key === 'Backspace' &&
              otp[index] === '' &&
              index > 0
            ) {
              inputArr[index - 1].current?.focus();
            }
          }}
        />
      ))}
    </View>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
  },

  textInput: {
    width: 40,
    height: 40,
    padding: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: lightTheme.typography.fontFamily.regular,
    fontSize: lightTheme.typography.fontSize.lg,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: lightTheme.radius.sm,
    backgroundColor: '#FFFFFF',
  },

  focusedInput: {
    borderColor: lightTheme.colors.secondary,
    borderWidth: 2,
  },
});

export default OtpComponent;
