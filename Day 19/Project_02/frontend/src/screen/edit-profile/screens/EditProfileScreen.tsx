import React, { useState } from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import SafeAreaContainer from '../../../component/SafeAreaContainer';
import lightTheme from '../../../theme/lightTheme';

function EditProfileScreen(): React.ReactElement {
  const [firstName, setFirstName] = useState('Uzair');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('Khan');
  const [email, setEmail] = useState('uzair@example.com');
  const [phoneNumber, setPhoneNumber] = useState('+91 98765 43210');

  return (
    <SafeAreaContainer>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Edit Profile</Text>
              <Text style={styles.subtitle}>
                Keep your travel profile up to date
              </Text>
            </View>
          </View>

          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {firstName.charAt(0).toUpperCase()}
              </Text>
            </View>

            <Pressable style={styles.changePhotoButton}>
              <Text style={styles.changePhotoText}>Change photo</Text>
            </Pressable>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Personal information</Text>

            <View style={styles.row}>
              <View style={styles.halfInputContainer}>
                <Text style={styles.label}>First name</Text>

                <TextInput
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="First name"
                  placeholderTextColor={lightTheme.colors.textTertiary}
                  style={styles.input}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.halfInputContainer}>
                <Text style={styles.label}>Middle name</Text>

                <TextInput
                  value={middleName}
                  onChangeText={setMiddleName}
                  placeholder="Middle name"
                  placeholderTextColor={lightTheme.colors.textTertiary}
                  style={styles.input}
                  autoCapitalize="words"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Last name</Text>

              <TextInput
                value={lastName}
                onChangeText={setLastName}
                placeholder="Last name"
                placeholderTextColor={lightTheme.colors.textTertiary}
                style={styles.input}
                autoCapitalize="words"
              />
            </View>

            <Text style={styles.sectionTitle}>Contact information</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email address</Text>

              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor={lightTheme.colors.textTertiary}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone number</Text>

              <TextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Enter your phone number"
                placeholderTextColor={lightTheme.colors.textTertiary}
                style={styles.input}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.infoContainer}>
              <View style={styles.infoIcon}>
                <Text style={styles.infoIconText}>i</Text>
              </View>

              <Text style={styles.infoText}>
                Your contact information may be used for booking updates, travel
                notifications and account security.
              </Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Pressable style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save changes</Text>
            </Pressable>

            <Pressable style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },

  contentContainer: {
    paddingHorizontal: lightTheme.spacing.xl,
    paddingTop: lightTheme.spacing.xl,
    paddingBottom: lightTheme.spacing.huge,
  },

  header: {
    marginBottom: lightTheme.spacing.xxl,
  },

  title: {
    fontFamily: lightTheme.typography.fontFamily.bold,
    fontSize: lightTheme.typography.fontSize.xxxl,
    color: lightTheme.colors.text,
  },

  subtitle: {
    marginTop: lightTheme.spacing.xs,
    fontFamily: lightTheme.typography.fontFamily.regular,
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.textSecondary,
  },

  avatarContainer: {
    alignItems: 'center',
    marginBottom: lightTheme.spacing.xxl,
  },

  avatar: {
    width: 92,
    height: 92,
    borderRadius: lightTheme.radius.pill,
    backgroundColor: lightTheme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...lightTheme.shadow.medium,
  },

  avatarText: {
    fontFamily: lightTheme.typography.fontFamily.extraBold,
    fontSize: lightTheme.typography.fontSize.xxxl,
    color: lightTheme.colors.textOnPrimary,
  },

  changePhotoButton: {
    marginTop: lightTheme.spacing.md,
    paddingHorizontal: lightTheme.spacing.md,
    paddingVertical: lightTheme.spacing.sm,
    borderRadius: lightTheme.radius.pill,
    backgroundColor: lightTheme.colors.surfaceSecondary,
  },

  changePhotoText: {
    fontFamily: lightTheme.typography.fontFamily.semiBold,
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.primary,
  },

  formContainer: {
    width: '100%',
  },

  sectionTitle: {
    marginBottom: lightTheme.spacing.md,
    fontFamily: lightTheme.typography.fontFamily.bold,
    fontSize: lightTheme.typography.fontSize.lg,
    color: lightTheme.colors.text,
  },

  row: {
    flexDirection: 'row',
    gap: lightTheme.spacing.md,
  },

  halfInputContainer: {
    flex: 1,
  },

  inputGroup: {
    marginTop: lightTheme.spacing.lg,
  },

  label: {
    marginBottom: lightTheme.spacing.sm,
    fontFamily: lightTheme.typography.fontFamily.semiBold,
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.text,
  },

  input: {
    height: 54,
    paddingHorizontal: lightTheme.spacing.md,
    borderRadius: lightTheme.radius.md,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    backgroundColor: lightTheme.colors.surface,
    fontFamily: lightTheme.typography.fontFamily.regular,
    fontSize: lightTheme.typography.fontSize.md,
    color: lightTheme.colors.text,
    ...lightTheme.shadow.small,
  },

  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: lightTheme.spacing.xxl,
    padding: lightTheme.spacing.md,
    borderRadius: lightTheme.radius.md,
    backgroundColor: lightTheme.colors.surfaceSecondary,
  },

  infoIcon: {
    width: 22,
    height: 22,
    borderRadius: lightTheme.radius.pill,
    backgroundColor: lightTheme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: lightTheme.spacing.sm,
  },

  infoIconText: {
    fontFamily: lightTheme.typography.fontFamily.bold,
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.white,
  },

  infoText: {
    flex: 1,
    fontFamily: lightTheme.typography.fontFamily.regular,
    fontSize: lightTheme.typography.fontSize.xs,
    lineHeight: 18,
    color: lightTheme.colors.textSecondary,
  },

  buttonContainer: {
    marginTop: lightTheme.spacing.xxl,
  },

  saveButton: {
    height: 54,
    borderRadius: lightTheme.radius.lg,
    backgroundColor: lightTheme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...lightTheme.shadow.small,
  },

  saveButtonText: {
    fontFamily: lightTheme.typography.fontFamily.bold,
    fontSize: lightTheme.typography.fontSize.md,
    color: lightTheme.colors.textOnPrimary,
  },

  cancelButton: {
    height: 54,
    marginTop: lightTheme.spacing.md,
    borderRadius: lightTheme.radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightTheme.colors.surface,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
  },

  cancelButtonText: {
    fontFamily: lightTheme.typography.fontFamily.semiBold,
    fontSize: lightTheme.typography.fontSize.md,
    color: lightTheme.colors.textSecondary,
  },
});

export default EditProfileScreen;
