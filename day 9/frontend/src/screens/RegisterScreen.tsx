import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackActions, useNavigation } from '@react-navigation/native';
import { authContext } from '../store/AuthContextProvider';

const RegisterScreen = (): React.ReactElement => {
  const navigation = useNavigation();

  const {
    userName,
    userEmail,
    userPassword,
    setUserName,
    setUserEmail,
    setUserPassword,
    handlerRegister,
  } = React.useContext(authContext);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Text style={styles.logoText}>M</Text>
              </View>

              <Text style={styles.appName}>MyApp</Text>

              <Text style={styles.title}>Create Account ✨</Text>

              <Text style={styles.subtitle}>
                Join us today and get started with your account.
              </Text>
            </View>

            <View style={styles.form}>
              <Text style={styles.label}>Full Name</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor="#9CA3AF"
                value={userName}
                onChangeText={setUserName}
                autoCapitalize="words"
                autoCorrect={false}
                returnKeyType="next"
              />

              <Text style={styles.label}>Email Address</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                value={userEmail}
                onChangeText={setUserEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
              />

              <Text style={styles.label}>Password</Text>

              <TextInput
                style={styles.input}
                placeholder="Create a password"
                placeholderTextColor="#9CA3AF"
                value={userPassword}
                onChangeText={setUserPassword}
                secureTextEntry
                returnKeyType="done"
              />

              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={handlerRegister}
              >
                <Text style={styles.buttonText}>Create Account</Text>
              </TouchableOpacity>

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account?</Text>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.dispatch(StackActions.push('login'))
                  }
                >
                  <Text style={styles.loginLink}> Login</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.footerText}>
              Secure, simple and made for you.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  keyboardContainer: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingTop: 30,
    paddingBottom: 40,
  },

  content: {
    paddingHorizontal: 24,
  },

  header: {
    alignItems: 'center',
    marginBottom: 32,
  },

  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,

    shadowColor: '#2563EB',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
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
    marginBottom: 20,
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
    maxWidth: 310,
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
    marginBottom: 16,
  },

  button: {
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    marginTop: 8,

    shadowColor: '#2563EB',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },

  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  loginText: {
    fontSize: 14,
    color: '#6B7280',
  },

  loginLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2563EB',
  },

  footerText: {
    textAlign: 'center',
    marginTop: 28,
    fontSize: 13,
    color: '#9CA3AF',
  },
});

export default RegisterScreen;
