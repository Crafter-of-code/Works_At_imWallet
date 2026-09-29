import React, { useContext } from 'react';
import SafeAreaContainer from '../../components/SafeAreaContainer';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomInput from '../../components/CustomInput';
import SolidButton from '../../components/SolidButton';
import { authContext } from '../../store/AuthContextProvider';
import lightTheme from '../../themes/lightTheme';
const RegisterScreen = (): React.ReactElement => {
  const {
    registerHandler,
    userEmail,
    userFirstName,
    userLastName,
    userMiddleName,
    setUserFirstName,
    setUserMiddleName,
    setUserLastName,
    setUserEmail,

    userFirstNameError,
    userMiddleNameError,
    userLastNameError,
    userEmailError,
    phoneNumberError,
    userPhoneNumber,
    setUserPhoneNumber,
  } = useContext(authContext);
  return (
    <>
      <SafeAreaContainer>
        <View style={style.mainContainer}>
          <View style={style.subContainer}>
            <Text
              style={{
                fontSize: 30,
                color: lightTheme.colors.accentDark,
                fontWeight: 700,
              }}
            >
              Register
            </Text>
            <View>
              <CustomInput
                value={userFirstName}
                setValue={setUserFirstName}
                error={userFirstNameError}
                keyboardType="email-address"
                placeHolder="Enter your first name"
              />
              <CustomInput
                value={userMiddleName}
                setValue={setUserMiddleName}
                error={userMiddleNameError}
                keyboardType="email-address"
                placeHolder="Enter you middle name"
              />
              <CustomInput
                value={userLastName}
                setValue={setUserLastName}
                error={userLastNameError}
                keyboardType="email-address"
                placeHolder="Enter you last name"
              />
              <CustomInput
                value={userEmail}
                setValue={setUserEmail}
                error={userEmailError}
                keyboardType="email-address"
                placeHolder="Enter you email"
              />
              <CustomInput
                value={userPhoneNumber}
                setValue={setUserPhoneNumber}
                error={phoneNumberError}
                keyboardType="email-address"
                placeHolder="Enter you email"
              />
              <SolidButton onPress={registerHandler} tittle="register" />
            </View>
          </View>
        </View>
      </SafeAreaContainer>
    </>
  );
};
const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  subContainer: {
    padding: 20,
    margin: 20,
    justifyContent: 'center',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)',
    borderRadius: lightTheme.radius.md,
    gap: 10,
  },
});
export default RegisterScreen;
