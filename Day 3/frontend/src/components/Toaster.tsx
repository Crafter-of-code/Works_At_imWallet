import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import { mainContext } from '../store/MainContextProvider';

function Toaster(): React.ReactElement | null {
  const { successMessage, successStatus, serverResponseHandler } =
    React.useContext(mainContext);

  if (!successMessage) {
    return null;
  }

  const toasterColor =
    successStatus === true
      ? '#22C55E'
      : successStatus === false
      ? '#EF4444'
      : '#3B82F6';

  const closeToaster = () => {
    serverResponseHandler('', false);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.toaster,
          {
            borderLeftColor: toasterColor,
          },
        ]}
      >
        <View style={styles.textContainer}>
          <Text style={styles.message}>{successMessage}</Text>
        </View>

        <Pressable
          onPress={closeToaster}
          style={styles.closeButton}
          hitSlop={10}
        >
          <Text style={styles.close}>×</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 70,
    left: 16,
    right: 16,
    zIndex: 9999,
    elevation: 9999,
  },

  toaster: {
    minHeight: 60,
    borderRadius: 12,

    paddingHorizontal: 16,
    paddingVertical: 12,

    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#FFFFFF',

    borderLeftWidth: 5,

    elevation: 6,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },

  textContainer: {
    flex: 1,
  },

  message: {
    fontSize: 15,
    fontWeight: '500',
    color: '#222222',
  },

  closeButton: {
    marginLeft: 12,
    padding: 4,
  },

  close: {
    fontSize: 24,
    fontWeight: '400',
    color: '#777777',
  },
});

export default Toaster;
