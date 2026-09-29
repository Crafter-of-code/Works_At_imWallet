import React, { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appContext } from '../../../store/AppContextProvider';
import { useNavigation } from '@react-navigation/native';

function HomePage(): React.ReactElement {
  const nav = useNavigation<any>();

  const [showBalance, setShowBalance] = useState(true);
  const [loading, setLoading] = useState(true);

  const { homeData, getHomeData } = React.useContext(appContext);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        await getHomeData();

        console.log('Home data fetched');
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    console.log('Home data:', homeData);
  }, [homeData]);

  const formatCurrency = (amount: number | undefined | null): string => {
    if (amount === undefined || amount === null) {
      return '₹0';
    }

    return `₹${amount.toLocaleString('en-IN')}`;
  };

  /*
   * Loading Screen
   */
  if (loading || !homeData) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#B08A18" />

        <Text style={styles.loadingTitle}>Loading your account</Text>

        <Text style={styles.loadingSubtitle}>
          Please wait while we fetch your financial data...
        </Text>
      </SafeAreaView>
    );
  }

  const financialOverview = homeData.financialOverview;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.smallTitle}>WELCOME BACK</Text>

            <Text style={styles.userName}>{homeData.userName}</Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.profile}
              activeOpacity={0.8}
              onPress={() => nav.navigate('search')}
            >
              <Text style={styles.profileText}>T</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.profile}
              activeOpacity={0.8}
              onPress={() => nav.navigate('profile')}
            >
              <Text style={styles.profileText}>
                {homeData.userName
                  ? homeData.userName.charAt(0).toUpperCase()
                  : 'U'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>ACCOUNT BALANCE</Text>

            <TouchableOpacity
              onPress={() => setShowBalance(!showBalance)}
              activeOpacity={0.7}
            >
              <Text style={styles.eyeIcon}>{showBalance ? '◉' : '○'}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.balanceAmount}>
            {showBalance
              ? formatCurrency(homeData.userAccountBalance)
              : '••••••••'}
          </Text>

          <View style={styles.balanceFooter}>
            <View>
              <Text style={styles.balanceChangeLabel}>WALLET BALANCE</Text>

              <Text style={styles.balanceChange}>
                {showBalance
                  ? formatCurrency(homeData.userWalletBalance)
                  : '••••••'}
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.action} activeOpacity={0.7}>
            <View style={styles.actionIcon}>
              <Text style={styles.actionIconText}>+</Text>
            </View>

            <Text style={styles.actionTitle}>Add Money</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} activeOpacity={0.7}>
            <View style={styles.actionIcon}>
              <Text style={styles.actionIconText}>↑</Text>
            </View>

            <Text style={styles.actionTitle}>Send</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} activeOpacity={0.7}>
            <View style={styles.actionIcon}>
              <Text style={styles.actionIconText}>↓</Text>
            </View>

            <Text style={styles.actionTitle}>Receive</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} activeOpacity={0.7}>
            <View style={styles.actionIcon}>
              <Text style={styles.actionIconText}>₹</Text>
            </View>

            <Text style={styles.actionTitle}>Pay Bills</Text>
          </TouchableOpacity>
        </View>

        {/* Financial Overview */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Financial Overview</Text>

          <Text style={styles.monthText}>September</Text>
        </View>

        <View style={styles.overviewContainer}>
          {/* Income */}
          <View style={styles.overviewCard}>
            <View style={styles.overviewTop}>
              <View style={styles.incomeIcon}>
                <Text style={styles.overviewIconText}>↓</Text>
              </View>

              <Text style={styles.overviewType}>INCOME</Text>
            </View>

            <Text style={styles.overviewAmount}>
              {formatCurrency(financialOverview.income)}
            </Text>

            <Text style={styles.overviewDescription}>This month</Text>
          </View>

          {/* Expenses */}
          <View style={styles.overviewCard}>
            <View style={styles.overviewTop}>
              <View style={styles.expenseIcon}>
                <Text style={styles.overviewIconText}>↑</Text>
              </View>

              <Text style={styles.overviewType}>EXPENSES</Text>
            </View>

            <Text style={styles.overviewAmount}>
              {formatCurrency(financialOverview.expense)}
            </Text>

            <Text style={styles.overviewDescription}>This month</Text>
          </View>
        </View>

        {/* Spending */}
        <View style={styles.spendingCard}>
          <View style={styles.spendingHeader}>
            <View>
              <Text style={styles.spendingLabel}>MONTHLY SPENDING</Text>

              <Text style={styles.spendingAmount}>
                {formatCurrency(financialOverview.monthlySpend)}
              </Text>
            </View>

            <Text style={styles.spendingPercentage}>
              {financialOverview.spendingPercentage}%
            </Text>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${Math.min(
                    financialOverview.spendingPercentage,
                    100,
                  )}%`,
                },
              ]}
            />
          </View>

          <View style={styles.spendingFooter}>
            <Text style={styles.spendingFooterText}>
              {formatCurrency(financialOverview.monthlySpend)} spent
            </Text>

            <Text style={styles.spendingFooterText}>
              {formatCurrency(financialOverview.monthlyBudget)} budget
            </Text>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => nav.navigate('transaction')}
          >
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionsContainer}>
          {homeData.recentTransaction.length === 0 ? (
            <View style={styles.emptyTransactions}>
              <Text style={styles.emptyTransactionsTitle}>
                No recent transactions
              </Text>

              <Text style={styles.emptyTransactionsText}>
                Your recent transactions will appear here.
              </Text>
            </View>
          ) : (
            homeData.recentTransaction.map(transaction => (
              <TouchableOpacity
                key={transaction.transactionId}
                style={styles.transaction}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.transactionIcon,
                    transaction.transactionType === 'incoming'
                      ? styles.incomeTransactionIcon
                      : styles.expenseTransactionIcon,
                  ]}
                >
                  <Text style={styles.transactionIconText}>
                    {transaction.transactionType === 'incoming' ? '↓' : '↑'}
                  </Text>
                </View>

                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionTitle}>
                    {transaction.transactionName}
                  </Text>

                  <Text style={styles.transactionCategory}>
                    {new Date(transaction.transactionDate).toLocaleDateString(
                      'en-IN',
                      {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      },
                    )}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.transactionAmount,
                    transaction.transactionType === 'incoming'
                      ? styles.incomeAmount
                      : styles.expenseAmount,
                  ]}
                >
                  {transaction.transactionType === 'incoming' ? '+' : '-'}
                  {formatCurrency(transaction.transactinAmount)}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  contentContainer: {
    paddingTop: 20,
    paddingHorizontal: 24,
    paddingBottom: 30,
  },

  /* Loading */

  loadingContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },

  loadingTitle: {
    marginTop: 18,
    fontSize: 18,
    fontWeight: '800',
    color: '#171717',
  },

  loadingSubtitle: {
    marginTop: 8,
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 18,
  },

  /* Header */

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 28,
  },

  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  smallTitle: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 2,
    color: '#B08A18',
    marginBottom: 6,
  },

  userName: {
    fontSize: 25,
    fontWeight: '800',
    color: '#171717',
    letterSpacing: -0.5,
  },

  profile: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#171717',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  /* Balance */

  balanceCard: {
    backgroundColor: '#171717',
    borderRadius: 22,
    padding: 24,
    marginBottom: 30,
  },

  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  balanceLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 2,
    color: '#B08A18',
  },

  eyeIcon: {
    fontSize: 17,
    color: '#FFFFFF',
  },

  balanceAmount: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
    marginTop: 12,
    marginBottom: 24,
  },

  balanceFooter: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  balanceChangeLabel: {
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1.5,
    color: '#888888',
    marginBottom: 5,
  },

  balanceChange: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  /* Sections */

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#171717',
    letterSpacing: -0.3,
    marginBottom: 15,
  },

  monthText: {
    fontSize: 11,
    color: '#999999',
    marginBottom: 15,
  },

  viewAll: {
    fontSize: 12,
    fontWeight: '600',
    color: '#B08A18',
    marginBottom: 15,
  },

  /* Quick Actions */

  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },

  action: {
    alignItems: 'center',
    width: '23%',
  },

  actionIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  actionIconText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#171717',
  },

  actionTitle: {
    fontSize: 10,
    fontWeight: '600',
    color: '#555555',
    textAlign: 'center',
  },

  /* Overview */

  overviewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  overviewCard: {
    width: '48%',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 17,
    padding: 17,
  },

  overviewTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  incomeIcon: {
    width: 28,
    height: 28,
    borderRadius: 9,
    backgroundColor: '#EFEFEF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  expenseIcon: {
    width: 28,
    height: 28,
    borderRadius: 9,
    backgroundColor: '#EFEFEF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  overviewIconText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#171717',
  },

  overviewType: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#777777',
  },

  overviewAmount: {
    fontSize: 19,
    fontWeight: '800',
    color: '#171717',
    marginBottom: 5,
  },

  overviewDescription: {
    fontSize: 9,
    color: '#999999',
  },

  /* Spending */

  spendingCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 17,
    padding: 18,
    marginBottom: 30,
  },

  spendingHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  spendingLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#888888',
    marginBottom: 6,
  },

  spendingAmount: {
    fontSize: 22,
    fontWeight: '800',
    color: '#171717',
  },

  spendingPercentage: {
    fontSize: 18,
    fontWeight: '800',
    color: '#B08A18',
  },

  progressBackground: {
    height: 7,
    borderRadius: 10,
    backgroundColor: '#EEEEEE',
    overflow: 'hidden',
    marginBottom: 10,
  },

  progressBar: {
    height: '100%',
    backgroundColor: '#171717',
    borderRadius: 10,
  },

  spendingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  spendingFooterText: {
    fontSize: 9,
    color: '#999999',
  },

  /* Transactions */

  transactionsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },

  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  incomeTransactionIcon: {
    backgroundColor: '#F1F1F1',
  },

  expenseTransactionIcon: {
    backgroundColor: '#F8F8F8',
  },

  transactionIconText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#171717',
  },

  transactionInfo: {
    flex: 1,
  },

  transactionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 4,
  },

  transactionCategory: {
    fontSize: 10,
    color: '#999999',
  },

  transactionAmount: {
    fontSize: 13,
    fontWeight: '800',
    marginLeft: 10,
  },

  incomeAmount: {
    color: '#171717',
  },

  expenseAmount: {
    color: '#555555',
  },

  /* Empty Transactions */

  emptyTransactions: {
    alignItems: 'center',
    paddingVertical: 30,
  },

  emptyTransactionsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#555555',
    marginBottom: 5,
  },

  emptyTransactionsText: {
    fontSize: 11,
    color: '#999999',
    textAlign: 'center',
  },

  bottomSpace: {
    height: 20,
  },
});

export default HomePage;
