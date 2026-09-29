import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SolidButton from '../../ui/SolidButton';
import { authContext } from '../../store/AuthContextProvider';

function OtpPage(): React.ReactElement {
  const { verifyOtp, userOtp, setUserOtp, userEmail } =
    React.useContext(authContext);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerSection}>
          <Text style={styles.smallTitle}>VERIFICATION</Text>

          <Text style={styles.title}>Verify OTP</Text>

          <Text style={styles.description}>
            Enter the 6-digit OTP sent to your email address.
          </Text>
        </View>
        <View style={styles.formSection}>
          <Text style={styles.label}>OTP</Text>

          <TextInput
            value={userOtp}
            onChangeText={text => {
              setUserOtp(text);
            }}
            keyboardType="number-pad"
            maxLength={6}
            placeholder="Enter OTP"
            placeholderTextColor="#999999"
            style={styles.input}
          />

          <SolidButton style={styles.button} onPress={verifyOtp}>
            Verify OTP
          </SolidButton>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },

  headerSection: {
    alignItems: 'center',
    marginBottom: 40,
  },

  smallTitle: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 2,
    color: '#B08A18',
    marginBottom: 8,
  },

  title: {
    fontSize: 38,
    fontWeight: '800',
    color: '#171717',
    letterSpacing: -0.5,
    marginBottom: 14,
  },

  description: {
    fontSize: 15,
    lineHeight: 23,
    color: '#777777',
    textAlign: 'center',
    maxWidth: 320,
  },

  formSection: {
    width: '100%',
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#171717',
    marginBottom: 8,
  },

  input: {
    height: 55,
    borderWidth: 1,
    borderColor: '#D1D1D1',
    borderRadius: 8,

    paddingHorizontal: 16,

    fontSize: 20,
    letterSpacing: 6,
    textAlign: 'center',

    color: '#171717',
    backgroundColor: '#FFFFFF',

    marginBottom: 20,
  },

  button: {
    width: '100%',
  },
});

export default OtpPage;
