import React, { useEffect } from 'react';

import { StyleSheet, View } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import lightTheme from '../theme/lightTheme';

type LoaderPropsType = {
  showLoader: boolean;
  setShowLoader: React.Dispatch<React.SetStateAction<boolean>>;
};

const Loader = ({
  showLoader,
  setShowLoader,
}: LoaderPropsType): React.ReactElement | null => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (showLoader) {
      rotation.value = withRepeat(
        withTiming(360, {
          duration: 800,
        }),
        -1,
        false,
      );
    } else {
      rotation.value = 0;
    }
  }, [showLoader]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotation.value}deg`,
        },
      ],
    };
  });

  if (!showLoader) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.loaderContainer}>
        <Animated.View style={[styles.loader, animatedStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,

    // backgroundColor: lightTheme.colors.overlay,

    alignItems: 'center',
    justifyContent: 'center',

    zIndex: 999,
  },

  loaderContainer: {
    width: 64,
    height: 64,

    borderRadius: 20,

    backgroundColor: lightTheme.colors.surface,

    alignItems: 'center',
    justifyContent: 'center',
  },

  loader: {
    width: 28,
    height: 28,

    borderRadius: 14,

    borderWidth: 3,
    borderColor: lightTheme.colors.border,
    borderTopColor: lightTheme.colors.primary,
  },
});

export default Loader;
