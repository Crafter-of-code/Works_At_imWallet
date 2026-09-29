import React from 'react';
import SafeAreaContainer from '../../../component/SafeAreaContainer';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import GlassContainer from '../../../component/GlassContainer';
import SolidButton from '../../../component/SolidButton';
import OtpComponent from '../components/OtpComponent';
import lightTheme from '../../../theme/lightTheme';
import { authContext } from '../../../store/AuthContextProvider';
function OtpScreen(): React.ReactElement {
  const { optVerifyForAuth, userEmail, userPhoneNumber } =
    React.useContext(authContext);
  React.useEffect(() => {});
  const [otp, setOtp] = React.useState<string>('');
  function handlerOtpLogin() {
    optVerifyForAuth(otp);
  }
  return (
    <>
      <SafeAreaContainer>
        <View style={style.mainContainer}>
          <GlassContainer>
            <View style={style.subContainer}>
              <View
                style={{
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <Text style={style.headingText}>Verify OTP</Text>
                <Text style={style.paragraphText}>
                  Enter the 6-digit verification code sent to your email address
                  to continue. {userPhoneNumber}
                </Text>
                <OtpComponent onOtpChange={setOtp} />
              </View>
              <View>
                <SolidButton
                  title="Verify"
                  onPress={(event: Event) => {
                    handlerOtpLogin();
                  }}
                >
                  {}
                </SolidButton>
              </View>
            </View>
          </GlassContainer>
        </View>
      </SafeAreaContainer>
    </>
  );
}
const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headingText: {
    color: lightTheme.colors.primary,
    fontFamily: lightTheme.typography.fontFamily.bold,
  },
  paragraphText: {
    color: lightTheme.colors.black,
    fontFamily: lightTheme.typography.fontFamily.semiBold,
    textAlign: 'center',
  },
  subContainer: {
    gap: 10,
    margin: 20,
  },
});
export default OtpScreen;
