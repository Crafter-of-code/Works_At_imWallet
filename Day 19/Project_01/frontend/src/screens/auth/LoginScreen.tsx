import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import SafeAreaContainer from '../../components/SafeAreaContainer';
import { useContext } from 'react';
import { authContext } from '../../store/AuthContextProvider';
import CustomInput from '../../components/CustomInput';
import SolidButton from '../../components/SolidButton';
import lightTheme from '../../themes/lightTheme';
import { useNavigation } from '@react-navigation/native';
const LoginScreen = (): React.ReactElement => {
  const {
    userPhoneNumber,
    setUserPhoneNumber,
    loginHandler,
    phoneNumberError,
  } = useContext(authContext);
  const nav = useNavigation<any>();
  return (
    <>
      <SafeAreaContainer>
        <View style={style.mainContainer}>
          <View style={style.innerContainer}>
            <Text style={style.headingText}>Login</Text>
            <Text>
              Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit
            </Text>
            <CustomInput
              value={userPhoneNumber}
              setValue={setUserPhoneNumber}
              placeHolder="Enter you phone number"
              keyboardType="number-pad"
              error={phoneNumberError}
            />
            <SolidButton
              tittle="Login"
              onPress={(event: Event) => loginHandler()}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
                gap: 5,
              }}
            >
              <Text>New here?</Text>
              <Pressable onPress={() => nav.navigate('register')} style={{}}>
                <Text style={{ color: lightTheme.colors.accentDark }}>
                  Register
                </Text>
              </Pressable>
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
    alignItems: 'center',
    flexDirection: 'row',
  },
  innerContainer: {
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)',
    padding: 20,
    borderRadius: lightTheme.radius.md,
    gap: 5,
    // flex: 1,
  },
  headingText: {
    fontSize: lightTheme.typography.h1.fontSize,
    fontWeight: 900,
    color: lightTheme.colors.accentDark,
  },
});
export default LoginScreen;
