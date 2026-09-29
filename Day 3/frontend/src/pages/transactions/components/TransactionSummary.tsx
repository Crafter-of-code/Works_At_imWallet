import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  income: number;
  expense: number;
};

function TransactionSummary({ income, expense }: Props): React.ReactElement {
  const formatAmount = (amount: number): string => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.label}>Income</Text>

        <Text style={styles.income}>{formatAmount(income)}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.item}>
        <Text style={styles.label}>Expense</Text>

        <Text style={styles.expense}>{formatAmount(expense)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 2,
  },

  item: {
    flex: 1,
  },

  label: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 6,
  },

  income: {
    fontSize: 18,
    fontWeight: '700',
    color: '#16A34A',
  },

  expense: {
    fontSize: 18,
    fontWeight: '700',
    color: '#DC2626',
  },

  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 15,
  },
});

export default TransactionSummary;
