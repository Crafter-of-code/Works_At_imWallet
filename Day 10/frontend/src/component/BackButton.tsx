import React, { ReactElement } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import lightTheme from '../theme/lightTheme';

const { spacing, radius, colors, shadow, typography } = lightTheme;

const BackButton = (): ReactElement => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.backButton}
    >
      {/* <View style={{ height:  }}> */}
      <Text style={[styles.backIcon, { marginTop: 4 }]}>‹</Text>
      {/* </View> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.small,
  },

  backIcon: {
    fontFamily: typography.fontFamily.medium,
    fontSize: 30,
    lineHeight: 32,
    color: colors.text,
    marginTop: -3,
  },
});

export default BackButton;
