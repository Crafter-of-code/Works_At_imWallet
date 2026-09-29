import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function EmptyTransactions(): React.ReactElement {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>₹</Text>
      </View>

      <Text style={styles.title}>No transactions</Text>

      <Text style={styles.description}>
        Your transactions will appear here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 100,
  },

  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E2E8F0',
  },

  icon: {
    fontSize: 24,
    fontWeight: '700',
    color: '#64748B',
  },

  title: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },

  description: {
    marginTop: 6,
    fontSize: 14,
    color: '#64748B',
  },
});

export default EmptyTransactions;
