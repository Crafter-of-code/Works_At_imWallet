import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import SafeAreaContainer from '../../component/SafeAreaContainer';
import GlassContainer from '../../component/GlassContainer';
import CustomInput from '../../component/CustomInput';
import { authContext } from '../../store/AuthContextProvider';
import SolidButton from '../../component/SolidButton';
import lightTheme from '../../theme/lightTheme';
import { useNavigation } from '@react-navigation/native';

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

function LoginScreen(): React.ReactElement {
  const { userPhoneNumber, setUserPhoneNumber, loginHandler } =
    React.useContext(authContext);

  const nav = useNavigation<any>();

  return (
    <SafeAreaContainer>
      <View style={styles.mainContainer}>
        <GlassContainer>
          <View style={styles.formContainer}>
            <Text style={styles.eyebrow}>WELCOME BACK</Text>

            <Text style={styles.title}>Login</Text>

            <Text style={styles.subtitle}>
              Enter your phone number to login to your account
            </Text>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Phone Number</Text>

              <CustomInput
                onChange={setUserPhoneNumber}
                placeHolder="Enter your phone number"
                value={userPhoneNumber}
                keyboardType={EnumKeyboardType.PHONE_PAD}
              />

              <View style={styles.buttonContainer}>
                <SolidButton title="Login" onPress={loginHandler} />
              </View>
            </View>
          </View>

          <View style={styles.bottomContainer}>
            <Text style={styles.bottomText}>Don't have an account?</Text>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => nav.navigate('register')}
            >
              <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>
          </View>
        </GlassContainer>
      </View>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: lightTheme.spacing.xl,
    backgroundColor: lightTheme.colors.background,
  },

  formContainer: {
    width: '100%',
    padding: lightTheme.spacing.lg,
    paddingBottom: lightTheme.spacing.sm,
  },

  eyebrow: {
    marginBottom: lightTheme.spacing.sm,
    fontFamily: lightTheme.typography.fontFamily.bold,
    fontSize: lightTheme.typography.fontSize.xs,
    letterSpacing: 1.4,
    color: lightTheme.colors.secondary,
  },

  title: {
    fontFamily: lightTheme.typography.fontFamily.extraBold,
    fontSize: lightTheme.typography.fontSize.xxxl,
    color: lightTheme.colors.text,
    letterSpacing: -0.8,
  },

  subtitle: {
    marginTop: lightTheme.spacing.xs,
    marginBottom: lightTheme.spacing.xxl,
    fontFamily: lightTheme.typography.fontFamily.regular,
    fontSize: lightTheme.typography.fontSize.md,
    lineHeight:
      lightTheme.typography.fontSize.md *
      lightTheme.typography.lineHeight.relaxed,
    color: lightTheme.colors.textSecondary,
  },

  fieldContainer: {
    width: '100%',
    marginBottom: lightTheme.spacing.lg,
  },

  label: {
    marginBottom: lightTheme.spacing.sm,
    fontFamily: lightTheme.typography.fontFamily.semiBold,
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.text,
  },

  buttonContainer: {
    width: '100%',
    marginTop: lightTheme.spacing.md,
  },

  bottomContainer: {
    paddingHorizontal: lightTheme.spacing.lg,
    paddingTop: lightTheme.spacing.lg,
    paddingBottom: lightTheme.spacing.xxl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: lightTheme.spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: lightTheme.colors.border,
  },

  bottomText: {
    fontFamily: lightTheme.typography.fontFamily.regular,
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.textSecondary,
  },

  registerText: {
    marginLeft: lightTheme.spacing.xs,
    fontFamily: lightTheme.typography.fontFamily.semiBold,
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.secondary,
  },
});

export default LoginScreen;
