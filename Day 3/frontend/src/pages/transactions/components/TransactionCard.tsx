import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Transaction, TransactionStatus } from '../screens/TransactionsScreen';

type Props = {
  transaction: Transaction;
};

function TransactionCard({ transaction }: Props): React.ReactElement {
  const isIncoming = transaction.transactionType === 'INCOMING';

  const formatAmount = (amount: number): string => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getStatusStyle = (status: TransactionStatus) => {
    switch (status) {
      case 'COMPLETED':
        return styles.completedStatus;

      case 'PENDING':
        return styles.pendingStatus;

      case 'FAILED':
        return styles.failedStatus;

      case 'CANCELLED':
        return styles.cancelledStatus;

      default:
        return styles.cancelledStatus;
    }
  };

  return (
    <View style={styles.container}>
      {/* Transaction Icon */}
      <View
        style={[
          styles.iconContainer,
          isIncoming ? styles.incomingIcon : styles.outgoingIcon,
        ]}
      >
        <Text style={styles.icon}>{isIncoming ? '↓' : '↑'}</Text>
      </View>

      {/* Transaction Information */}
      <View style={styles.info}>
        <Text style={styles.name}>{transaction.transactionName}</Text>

        <Text style={styles.date}>{transaction.transactionDate}</Text>

        <Text
          style={[styles.status, getStatusStyle(transaction.transactionStatus)]}
        >
          {transaction.transactionStatus}
        </Text>
      </View>

      {/* Amount */}
      <View style={styles.amountContainer}>
        <Text
          style={[
            styles.amount,
            isIncoming ? styles.incomingAmount : styles.outgoingAmount,
          ]}
        >
          {isIncoming ? '+' : '-'}
          {formatAmount(transaction.transactionAmount)}
        </Text>

        <Text style={styles.type}>{isIncoming ? 'Received' : 'Spent'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  incomingIcon: {
    backgroundColor: '#DCFCE7',
  },

  outgoingIcon: {
    backgroundColor: '#FEE2E2',
  },

  icon: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },

  date: {
    marginTop: 4,
    fontSize: 12,
    color: '#94A3B8',
  },

  status: {
    marginTop: 5,
    fontSize: 10,
    fontWeight: '700',
  },

  completedStatus: {
    color: '#16A34A',
  },

  pendingStatus: {
    color: '#D97706',
  },

  failedStatus: {
    color: '#DC2626',
  },

  cancelledStatus: {
    color: '#64748B',
  },

  amountContainer: {
    alignItems: 'flex-end',
    marginLeft: 10,
  },

  amount: {
    fontSize: 15,
    fontWeight: '700',
  },

  incomingAmount: {
    color: '#16A34A',
  },

  outgoingAmount: {
    color: '#DC2626',
  },

  type: {
    marginTop: 4,
    fontSize: 11,
    color: '#94A3B8',
  },
});

export default TransactionCard;
