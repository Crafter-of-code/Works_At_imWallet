import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { mainContext } from '../store/MainContextProvider';

export default function Toast(): React.ReactElement | null {
  const { message, status, clearToast, showNotificaiton } =
    React.useContext(mainContext);

  if (!message) {
    return null;
  }

  return (
    <View style={[styles.container, status ? styles.success : styles.failure]}>
      <View style={styles.content}>
        <Text style={styles.message}>{message}</Text>
      </View>

      <TouchableOpacity
        style={styles.closeButton}
        onPress={clearToast}
        activeOpacity={0.7}
      >
        <Text style={styles.closeText}>×</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 55,
    left: 16,
    right: 16,
    minHeight: 60,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 10,
    zIndex: 9999,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },

  success: {
    backgroundColor: '#E8F7EE',
  },

  failure: {
    backgroundColor: '#FDECEC',
  },

  content: {
    flex: 1,
    paddingVertical: 12,
  },

  message: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },

  closeButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeText: {
    fontSize: 25,
    fontWeight: '400',
    color: '#6B7280',
  },
});
