import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { mainContext } from '../store/MainContextProvider';

function MyToaster(): React.ReactElement | null {
  const { status, message, setMessage } = React.useContext(mainContext);

  React.useEffect(() => {
    if (!message) {
      return;
    }

    const timer = setTimeout(() => {
      setMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, setMessage]);
  if (!message) {
    return null;
  }

  const closeToaster = () => {
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.toaster, status ? styles.success : styles.error]}>
        <Text style={styles.message}>{message}</Text>

        <TouchableOpacity onPress={closeToaster} style={styles.closeButton}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 9999,
    elevation: 9999,
  },

  toaster: {
    minHeight: 55,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    elevation: 5,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  success: {
    backgroundColor: '#16a34a',
  },

  error: {
    backgroundColor: '#dc2626',
  },

  message: {
    flex: 1,
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '500',
  },

  closeButton: {
    marginLeft: 12,
    paddingHorizontal: 5,
  },

  closeText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '300',
  },
});

export default MyToaster;
