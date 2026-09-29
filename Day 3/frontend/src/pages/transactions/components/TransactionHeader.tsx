import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  transactionCount: number;
};

function TransactionHeader({ transactionCount }: Props): React.ReactElement {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Transactions</Text>

        <Text style={styles.subtitle}>Your recent financial activity</Text>
      </View>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>{transactionCount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
  },

  subtitle: {
    marginTop: 5,
    fontSize: 14,
    color: '#64748B',
  },

  badge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E2E8F0',
  },

  badgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
  },
});

export default TransactionHeader;
