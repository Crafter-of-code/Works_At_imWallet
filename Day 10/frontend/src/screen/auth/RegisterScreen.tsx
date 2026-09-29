import React from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import SafeAreaContainer from '../../component/SafeAreaContainer';
import GlassContainer from '../../component/GlassContainer';
import SolidButton from '../../component/SolidButton';
import CustomInput from '../../component/CustomInput';
import { authContext } from '../../store/AuthContextProvider';
import lightTheme from '../../theme/lightTheme';

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

function RegisterScreen(): React.ReactElement {
  const {
    userPhoneNumber,
    setUserPhoneNumber,
    userFirstName,
    setUserFirstName,
    userMiddleName,
    setUserMiddleName,
    userLastName,
    setUserLastName,
    userEmail,
    setUserEmail,
    registerHandler,
  } = React.useContext(authContext);

  return (
    <SafeAreaContainer>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainContainer}>
            <GlassContainer>
              <View style={styles.cardContainer}>
                <View style={styles.headerContainer}>
                  <Text style={styles.eyebrow}>GET STARTED</Text>

                  <Text style={styles.title}>Create Account</Text>

                  <Text style={styles.subtitle}>
                    Enter your details to get started with your account.
                  </Text>
                </View>

                <View style={styles.formContainer}>
                  <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Phone Number</Text>

                    <CustomInput
                      onChange={setUserPhoneNumber}
                      placeHolder="Enter your phone number"
                      value={userPhoneNumber}
                      keyboardType={EnumKeyboardType.PHONE_PAD}
                    />
                  </View>

                  <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Email</Text>

                    <CustomInput
                      onChange={setUserEmail}
                      placeHolder="Enter your email"
                      value={userEmail}
                      keyboardType={EnumKeyboardType.EMAIL_ADDRESS}
                    />
                  </View>

                  <View style={styles.fieldContainer}>
                    <Text style={styles.label}>First Name</Text>

                    <CustomInput
                      onChange={setUserFirstName}
                      placeHolder="Enter your first name"
                      value={userFirstName}
                      keyboardType={EnumKeyboardType.DEFAULT}
                    />
                  </View>

                  <View style={styles.fieldContainer}>
                    <Text style={styles.label}>
                      Middle Name
                      <Text style={styles.optional}> (Optional)</Text>
                    </Text>

                    <CustomInput
                      onChange={setUserMiddleName}
                      placeHolder="Enter your middle name"
                      value={userMiddleName}
                      keyboardType={EnumKeyboardType.DEFAULT}
                    />
                  </View>

                  <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Last Name</Text>

                    <CustomInput
                      onChange={setUserLastName}
                      placeHolder="Enter your last name"
                      value={userLastName}
                      keyboardType={EnumKeyboardType.DEFAULT}
                    />
                  </View>

                  <View style={styles.buttonContainer}>
                    <SolidButton
                      title="Register"
                      onPress={() => registerHandler()}
                    />
                  </View>
                </View>

                <View style={styles.bottomContainer}>
                  <Text style={styles.bottomText}>
                    Already have an account?
                  </Text>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.loginButton}
                  >
                    <Text style={styles.loginText}>Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </GlassContainer>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: lightTheme.colors.background,
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: lightTheme.spacing.xl,
    paddingVertical: lightTheme.spacing.xl,
  },

  mainContainer: {
    width: '100%',
    alignItems: 'center',
  },

  cardContainer: {
    width: '100%',
    maxWidth: 460,
    paddingHorizontal: lightTheme.spacing.lg,
    paddingVertical: lightTheme.spacing.xl,
  },

  headerContainer: {
    marginBottom: lightTheme.spacing.xxl,
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
    marginBottom: lightTheme.spacing.sm,
  },

  subtitle: {
    fontFamily: lightTheme.typography.fontFamily.regular,
    fontSize: lightTheme.typography.fontSize.md,
    lineHeight:
      lightTheme.typography.fontSize.md *
      lightTheme.typography.lineHeight.relaxed,
    color: lightTheme.colors.textSecondary,
    maxWidth: 350,
  },

  formContainer: {
    width: '100%',
  },

  fieldContainer: {
    width: '100%',
    marginBottom: lightTheme.spacing.lg,
  },

  label: {
    fontFamily: lightTheme.typography.fontFamily.semiBold,
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.text,
    marginBottom: lightTheme.spacing.sm,
  },

  optional: {
    fontFamily: lightTheme.typography.fontFamily.regular,
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.textTertiary,
  },

  buttonContainer: {
    width: '100%',
    marginTop: lightTheme.spacing.xs,
  },

  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: lightTheme.spacing.xl,
    paddingTop: lightTheme.spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: lightTheme.colors.border,
  },

  bottomText: {
    fontFamily: lightTheme.typography.fontFamily.regular,
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.textSecondary,
  },

  loginButton: {
    marginLeft: lightTheme.spacing.xs,
    paddingVertical: lightTheme.spacing.xs,
    paddingHorizontal: lightTheme.spacing.xs,
  },

  loginText: {
    fontFamily: lightTheme.typography.fontFamily.semiBold,
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.secondary,
  },
});

export default RegisterScreen;
