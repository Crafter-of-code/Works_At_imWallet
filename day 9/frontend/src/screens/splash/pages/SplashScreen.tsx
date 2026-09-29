import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import lightTheme from '../../../theme/lightTheme.ts';
import darkTheme from '../../../theme/darkTheme.ts';
import { mainContext } from '../../../store/MainContextProvider';

const SplashScreen = () => {
  const { isDarkModel } = React.useContext(mainContext);

  const progress = useSharedValue(0);

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value}%`,
    };
  });

  React.useEffect(() => {
    progress.value = withTiming(100, {
      duration: 1000,
    });
  }, []);

  const theme = isDarkModel ? darkTheme : lightTheme;

  const { colors, effects } = theme;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <View style={styles.logoContainer}>
        <View
          style={[
            styles.logoGlow,
            {
              backgroundColor: colors.logoGlow,
              opacity: effects.logoGlowOpacity,
            },
          ]}
        />

        <Image
          source={{
            uri: isDarkModel
              ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfbqaNulxSEAghVdwNsJBAeeNSzKY7ptu_zM2_QYFYa8pr8TIwyYJibOy-B-E2mrDF19IZg-8mDvlZRfgDXTO-z-NGx0FBmzkFaAEaTBXxYM6itp94AMqFYGFLbqAnnzK4Yx9HVjsbPVavp-MKi-EcK6_4QShkaN_k83kaDBnCfWBpFwybI6dBe08y1nnpn3fYXqKDsQzGs3669wt0oB__SD_oF_GfqHhiFHn6USyPRrxkS_P471ygHqBN1V-4sYy1xA'
              : 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfbqaNulxSEAghVdwNsJBAeeNSzKY7ptu_zM2_QYFYa8pr8TIwyYJibOy-B-E2mrDF19IZg-8mDvlZRfgDXTO-z-NGx0FBmzkFaAEaTBXxYM6itp94AMqFYGFLbqAnnzK4Yx9HVjsbPVavp-MKi-EcK6_4QShkaN_k83kaDBnCfWBpFwybI6dBe08y1nnpn3fYXqKDsQzGs3669wt0oB__SD_oF_GfqHhiFHn6USyPRrxkS_P471ygHqBN1V-4sYy1xA',
          }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={[styles.wordmark, { color: colors.textPrimary }]}>
        Vault
        <Text style={[styles.pay, { color: colors.brandPrimary }]}>Pay</Text>
      </Text>

      <Text style={[styles.tagline, { color: colors.textSecondary }]}>
        Simple money. Smarter life.
      </Text>

      <View
        style={[
          styles.progressTrack,
          {
            backgroundColor: colors.progressTrack,
          },
        ]}
      >
        <Animated.View style={[styles.progressFill, progressStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: -40,
  },

  logoContainer: {
    width: 112,
    height: 112,
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  logoGlow: {
    position: 'absolute',
    width: 112,
    height: 112,
    borderRadius: 56,
  },

  logo: {
    width: 80,
    height: 80,
    zIndex: 2,
  },

  wordmark: {
    fontSize: 44,
    lineHeight: 48,
    fontWeight: '700',
    letterSpacing: -1.4,
    marginBottom: 2,
  },

  pay: {
    fontWeight: '800',
  },

  tagline: {
    fontSize: 17,
    fontWeight: '400',
    letterSpacing: 0.4,
    textAlign: 'center',
  },

  progressTrack: {
    width: 112,
    height: 4,
    borderRadius: 10,
    marginTop: 16,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#2563EB',
  },
});

export default SplashScreen;
