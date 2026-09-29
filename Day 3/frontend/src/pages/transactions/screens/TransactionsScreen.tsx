import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';

import TransactionHeader from '../components/TransactionHeader';
import TransactionSummary from '../components/TransactionSummary';
import TransactionCard from '../components/TransactionCard';
import EmptyTransactions from '../components/EmptyTransactions';

export type TransactionType = 'INCOMING' | 'OUTGOING';

export type TransactionStatus =
  | 'PENDING'
  | 'COMPLETED'
  | 'FAILED'
  | 'CANCELLED';

export type Transaction = {
  transactionId: string;
  transactionName: string;
  transactionType: TransactionType;
  transactionAmount: number;
  transactionDate: string;
  transactionStatus: TransactionStatus;
};

const transactions: Transaction[] = [
  {
    transactionId: '1',
    transactionName: 'Salary',
    transactionType: 'INCOMING',
    transactionAmount: 45000,
    transactionDate: '08 Sep 2026',
    transactionStatus: 'COMPLETED',
  },
  {
    transactionId: '2',
    transactionName: 'Amazon',
    transactionType: 'OUTGOING',
    transactionAmount: 2499,
    transactionDate: '07 Sep 2026',
    transactionStatus: 'COMPLETED',
  },
  {
    transactionId: '3',
    transactionName: 'Freelance Payment',
    transactionType: 'INCOMING',
    transactionAmount: 12000,
    transactionDate: '06 Sep 2026',
    transactionStatus: 'COMPLETED',
  },
  {
    transactionId: '4',
    transactionName: 'Electricity Bill',
    transactionType: 'OUTGOING',
    transactionAmount: 1850,
    transactionDate: '05 Sep 2026',
    transactionStatus: 'COMPLETED',
  },
];

function TransactionsScreen(): React.ReactElement {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TransactionHeader transactionCount={transactions.length} />

        <TransactionSummary income={57000} expense={4349} />

        <FlatList
          data={transactions}
          keyExtractor={item => item.transactionId}
          renderItem={({ item }) => <TransactionCard transaction={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={<EmptyTransactions />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  listContent: {
    paddingBottom: 30,
  },

  separator: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginLeft: 61,
  },
});

export default TransactionsScreen;
