import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SolidButton from '../../ui/SolidButton';
import OutlineButton from '../../ui/OutlineButton';
import { authContext } from '../../store/AuthContextProvider';
import { useNavigation } from '@react-navigation/native';
function LoginPage(): React.ReactElement {
  const nav = useNavigation<any>();
  const {
    userEmail,
    userPassword,
    setUserEmail,
    setUserPassword,
    handleLogin,
  } = React.useContext(authContext);

  const [userEmailError, setUserEmailError] = React.useState<string>('');
  const [userPasswordError, setUserPasswordError] = React.useState<string>('');
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

          <Text style={styles.title}>Welcome Back</Text>

          <Text style={styles.description}>
            Sign in to your account and continue where you left off.
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
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
              placeholder="Enter your password"
              placeholderTextColor="#A0A0A0"
              secureTextEntry
            />

            {userPasswordError ? (
              <Text style={styles.errorText}>{userPasswordError}</Text>
            ) : null}
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <SolidButton style={styles.loginButton} onPress={handleLogin}>
            Login
          </SolidButton>

          <View style={styles.registerSection}>
            <Text style={styles.registerText}>Don't have an account?</Text>

            <OutlineButton
              style={styles.registerButton}
              onPress={() => {
                nav.navigate('signin');
              }}
            >
              Register
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
    paddingTop: 50,
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

  loginButton: {
    width: '100%',
  },

  registerSection: {
    alignItems: 'center',
    marginTop: 18,
  },

  registerText: {
    fontSize: 13,
    color: '#777777',
    marginBottom: 10,
  },

  registerButton: {
    width: '100%',
  },
});

export default LoginPage;
