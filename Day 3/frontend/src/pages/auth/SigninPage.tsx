import React from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SolidButton from '../../ui/SolidButton';
import OutlineButton from '../../ui/OutlineButton';
import { authContext } from '../../store/AuthContextProvider';
import { useNavigation } from '@react-navigation/native';

function SigninPage(): React.ReactElement {
  const nav = useNavigation<any>();
  const {
    userName,
    userEmail,
    userPassword,
    userConfirmPassword,
    setUserName,
    setUserEmail,
    setUserPassword,
    setUserConfirmPassword,
    userConfirmPasswordError,
    userEmailError,
    userNameError,
    userPasswordError,
    setUserConfirmPasswordError,
    setUserEmailError,
    setUserNameError,
    setUserPasswordError,
    handleRegister,
  } = React.useContext(authContext);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appName}>APP</Text>

          <Text style={styles.title}>Create Account</Text>

          <Text style={styles.description}>
            Create your account and get started with the app.
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>

            <TextInput
              style={[styles.input, userNameError && styles.inputError]}
              value={userName}
              onChangeText={value => {
                setUserName(value);
                setUserNameError('');
              }}
              placeholder="Enter your full name"
              placeholderTextColor="#A0A0A0"
              autoCapitalize="words"
            />

            {userNameError ? (
              <Text style={styles.errorText}>{userNameError}</Text>
            ) : null}
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>

            <TextInput
              style={[styles.input, userEmailError && styles.inputError]}
              value={userEmail}
              onChangeText={value => {
                setUserEmail(value);
                setUserEmailError('');
              }}
              placeholder="Enter your email"
              placeholderTextColor="#A0A0A0"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            {userEmailError ? (
              <Text style={styles.errorText}>{userEmailError}</Text>
            ) : null}
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>

            <TextInput
              style={[styles.input, userPasswordError && styles.inputError]}
              value={userPassword}
              onChangeText={value => {
                setUserPassword(value);
                setUserPasswordError('');
              }}
              placeholder="Create a password"
              placeholderTextColor="#A0A0A0"
              secureTextEntry
            />

            {userPasswordError ? (
              <Text style={styles.errorText}>{userPasswordError}</Text>
            ) : null}
          </View>

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>

            <TextInput
              style={[
                styles.input,
                userConfirmPasswordError && styles.inputError,
              ]}
              value={userConfirmPassword}
              onChangeText={value => {
                setUserConfirmPassword(value);
                setUserConfirmPasswordError('');
              }}
              placeholder="Confirm your password"
              placeholderTextColor="#A0A0A0"
              secureTextEntry
            />

            {userConfirmPasswordError ? (
              <Text style={styles.errorText}>{userConfirmPasswordError}</Text>
            ) : null}
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.actions}>
          <SolidButton style={styles.registerButton} onPress={handleRegister}>
            Register
          </SolidButton>

          <View style={styles.loginSection}>
            <Text style={styles.loginText}>Already have an account?</Text>

            <OutlineButton
              style={styles.loginButton}
              onPress={() => {
                nav.navigate('login');
              }}
            >
              Login
            </OutlineButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 30,
  },

  header: {
    marginBottom: 30,
  },

  appName: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 3,
    color: '#B08A18',
    marginBottom: 8,
  },

  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#171717',
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#777777',
  },

  form: {
    gap: 16,
  },

  inputGroup: {
    gap: 7,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#292929',
  },

  input: {
    borderWidth: 1,
    borderColor: '#D8C99A',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 16,
    color: '#171717',
    backgroundColor: '#FFFCF4',
  },

  inputError: {
    borderColor: '#D64545',
  },

  errorText: {
    fontSize: 12,
    color: '#D64545',
    marginTop: 1,
  },

  actions: {
    marginTop: 28,
  },

  registerButton: {
    width: '100%',
  },

  loginSection: {
    alignItems: 'center',
    marginTop: 18,
  },

  loginText: {
    fontSize: 13,
    color: '#777777',
    marginBottom: 10,
  },

  loginButton: {
    width: '100%',
  },
});

export default SigninPage;
