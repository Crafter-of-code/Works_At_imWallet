import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ToastManager from 'toastify-react-native/components/ToastManager';
import { authContext } from '../store/AuthContextProvider';
import { mainContext } from '../store/MainContextProvider';
import { StackActions, useNavigation } from '@react-navigation/native';

const LoginScreen = (): React.ReactElement => {
  const navigation = useNavigation();

  const {
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,
    handleLogin,
  } = React.useContext(authContext);

  const {} = React.useContext(mainContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>M</Text>
          </View>

          <Text style={styles.appName}>MyApp</Text>

          <Text style={styles.title}>Welcome Back</Text>

          <Text style={styles.subtitle}>
            Sign in to continue your journey with us.
          </Text>
        </View>

        {/* Login Form */}
        <View style={styles.form}>
          <Text style={styles.label}>Email Address</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={userEmail}
            onChangeText={text => setUserEmail(text)}
          />

          <Text style={styles.label}>Password</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            value={userPassword}
            onChangeText={text => setUserPassword(text)}
          />
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account?</Text>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.dispatch(StackActions.push('register'))}
            >
              <Text style={styles.registerLink}> Register</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.footerText}>Secure, simple and made for you.</Text>
      </View>

      <ToastManager />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  header: {
    alignItems: 'center',
    marginBottom: 36,
  },

  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
  },

  appName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2563EB',
    marginBottom: 24,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: '#6B7280',
    textAlign: 'center',
    maxWidth: 300,
  },

  form: {
    width: '100%',
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },

  input: {
    height: 54,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111827',
    marginBottom: 18,
  },

  button: {
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    marginTop: 6,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },

  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  registerText: {
    fontSize: 14,
    color: '#6B7280',
  },

  registerLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2563EB',
  },

  footerText: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 13,
    color: '#9CA3AF',
  },
});

export default LoginScreen;
