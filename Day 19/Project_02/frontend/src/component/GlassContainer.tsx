import React, { useEffect } from 'react';

import { StyleSheet, View } from 'react-native';

import { BlurView } from '@react-native-community/blur';

import lightTheme from '../theme/lightTheme';
interface GlassContainerProps {
  children: React.ReactNode;
}

function GlassContainer({ children }: GlassContainerProps): React.ReactElement {
  return (
    <View style={styles.container}>
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="light"
        blurAmount={15}
        reducedTransparencyFallbackColor="rgba(255, 255, 255, 0.7)"
      />

      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: lightTheme.radius.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    width: '100%',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  content: {
    padding: 10,
  },
});

export default GlassContainer;
