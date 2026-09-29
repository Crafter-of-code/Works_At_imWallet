import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SafeAreaContainer from '../components/SafeAreaContainer';
import { mainContext } from '../store/MainContextProvider';
import lightTheme from '../theme/lightTheme';
import darkTheme from '../theme/darkTheme';

type Transaction = {
  transactionId: string;
  transactionName: string;
  transactionType: 'incoming' | 'outgoing';
  transactionAmount: number;
  transactionDate: string;
};

const homeData = {
  userName: 'Uzair',
  userAccountBalance: 12500.5,
  userWalletBalance: 8250.75,

  financialOverview: {
    income: 35000,
    expense: 18250,
    monthlySpend: 9250,
  },

  recentTransactions: [
    {
      transactionId: 'TXN001',
      transactionName: 'Salary',
      transactionType: 'incoming',
      transactionAmount: 30000,
      transactionDate: '10 Sep 2026',
    },
    {
      transactionId: 'TXN002',
      transactionName: 'Amazon',
      transactionType: 'outgoing',
      transactionAmount: 2499,
      transactionDate: '09 Sep 2026',
    },
    {
      transactionId: 'TXN003',
      transactionName: 'Money Received',
      transactionType: 'incoming',
      transactionAmount: 1500,
      transactionDate: '08 Sep 2026',
    },
    {
      transactionId: 'TXN004',
      transactionName: 'Electricity Bill',
      transactionType: 'outgoing',
      transactionAmount: 1850,
      transactionDate: '07 Sep 2026',
    },
    {
      transactionId: 'TXN005',
      transactionName: 'Food',
      transactionType: 'outgoing',
      transactionAmount: 650,
      transactionDate: '06 Sep 2026',
    },
  ] as Transaction[],
};

function HomeScreen(): React.ReactElement {
  const { isDarkModel } = React.useContext(mainContext);

  const theme = isDarkModel ? darkTheme : lightTheme;

  const { colors, effects } = theme;

  const [balanceVisible, setBalanceVisible] = React.useState(true);

  const formatAmount = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const spendingPercentage = Math.round(
    (homeData.financialOverview.monthlySpend / 30000) * 100,
  );

  return (
    <SafeAreaContainer>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <View
          pointerEvents="none"
          style={[
            styles.ambientGlow,
            {
              backgroundColor: colors.ambientTop,
              opacity: effects.ambientTopOpacity,
            },
          ]}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}

          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.avatarWrapper}>
                <View
                  style={[
                    styles.avatarOuter,
                    {
                      backgroundColor: colors.brandPrimary,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.avatarInner,
                      {
                        backgroundColor: colors.surface,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.avatarText,
                        {
                          color: colors.brandPrimary,
                        },
                      ]}
                    >
                      UK
                    </Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.verificationDot,
                    {
                      backgroundColor: colors.brandPrimary,
                      borderColor: colors.surface,
                    },
                  ]}
                />
              </View>

              <View>
                <View style={styles.greetingRow}>
                  <Text
                    style={[
                      styles.greeting,
                      {
                        color: colors.textSecondary,
                      },
                    ]}
                  >
                    GOOD MORNING
                  </Text>

                  <Text
                    style={[
                      styles.sunIcon,
                      {
                        color: colors.brandPrimary,
                      },
                    ]}
                  >
                    ☀
                  </Text>
                </View>

                <Text
                  style={[
                    styles.userName,
                    {
                      color: colors.textPrimary,
                    },
                  ]}
                >
                  {homeData.userName} Khan
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.notificationButton,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.progressTrack,
                },
              ]}
              accessibilityLabel="Notifications"
            >
              <Text
                style={[
                  styles.notificationIcon,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                ♢
              </Text>

              <View
                style={[
                  styles.notificationBadge,
                  {
                    backgroundColor: colors.brandPrimary,
                  },
                ]}
              />
            </TouchableOpacity>
          </View>

          {/* Wallet Card */}

          <View
            style={[
              styles.walletCard,
              {
                backgroundColor: colors.textPrimary,
              },
            ]}
          >
            <View
              style={[
                styles.walletGlowRight,
                {
                  backgroundColor: colors.brandPrimary,
                },
              ]}
            />

            <View
              style={[
                styles.walletGlowLeft,
                {
                  backgroundColor: colors.brandSecondary,
                },
              ]}
            />

            <View style={styles.walletHeader}>
              <View style={styles.walletHeaderLeft}>
                <View
                  style={[
                    styles.walletLogoBox,
                    {
                      backgroundColor: colors.brandPrimary,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.walletLogoText,
                      {
                        color: colors.surface,
                      },
                    ]}
                  >
                    V
                  </Text>
                </View>

                <Text style={styles.walletLabel}>Total Balance</Text>

                <View
                  style={[
                    styles.secureBadge,
                    {
                      backgroundColor: colors.surface,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.secureDot,
                      {
                        backgroundColor: colors.brandPrimary,
                      },
                    ]}
                  />

                  <Text
                    style={[
                      styles.secureText,
                      {
                        color: colors.textPrimary,
                      },
                    ]}
                  >
                    Secure
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.balanceToggle,
                  {
                    backgroundColor: colors.toggleBackground,
                  },
                ]}
                onPress={() => setBalanceVisible(previous => !previous)}
              >
                <Text
                  style={[
                    styles.eyeIcon,
                    {
                      color: colors.toggleText,
                    },
                  ]}
                >
                  ◉
                </Text>

                <Text
                  style={[
                    styles.balanceToggleText,
                    {
                      color: colors.toggleText,
                    },
                  ]}
                >
                  {balanceVisible ? 'Hide' : 'Show'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.mainBalanceContainer}>
              <Text style={styles.mainBalance}>
                {balanceVisible
                  ? formatAmount(homeData.userAccountBalance)
                  : '₹ ••••••'}
              </Text>
            </View>

            <View
              style={[
                styles.walletDivider,
                {
                  backgroundColor: colors.textSecondary,
                },
              ]}
            />

            <View style={styles.walletDetails}>
              <View>
                <Text style={styles.walletDetailLabel}>
                  Available in Wallet
                </Text>

                <Text style={styles.walletAvailable}>
                  {balanceVisible
                    ? formatAmount(homeData.userWalletBalance)
                    : '₹ ••••••'}
                </Text>
              </View>

              <View style={styles.protectionContainer}>
                <Text style={styles.walletDetailLabel}>Vault Protection</Text>

                <View style={styles.protectionRow}>
                  <Text style={styles.protectionText}>Biometric</Text>

                  <Text
                    style={[
                      styles.protectionIcon,
                      {
                        color: colors.brandSecondary,
                      },
                    ]}
                  >
                    ✓
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Primary Actions */}

          <View style={styles.primaryActions}>
            <TouchableOpacity
              style={[
                styles.sendButton,
                {
                  backgroundColor: colors.brandPrimary,
                },
              ]}
            >
              <View>
                <Text
                  style={[
                    styles.sendTitle,
                    {
                      color: colors.surface,
                    },
                  ]}
                >
                  Send
                </Text>

                <Text
                  style={[
                    styles.sendSubtitle,
                    {
                      color: colors.surface,
                    },
                  ]}
                >
                  Pay someone
                </Text>
              </View>

              <View
                style={[
                  styles.sendIconContainer,
                  {
                    backgroundColor: colors.brandAccent,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.sendIcon,
                    {
                      color: colors.surface,
                    },
                  ]}
                >
                  ↗
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.receiveButton,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.progressTrack,
                },
              ]}
            >
              <View>
                <Text
                  style={[
                    styles.receiveTitle,
                    {
                      color: colors.textPrimary,
                    },
                  ]}
                >
                  Receive
                </Text>

                <Text
                  style={[
                    styles.receiveSubtitle,
                    {
                      color: colors.textSecondary,
                    },
                  ]}
                >
                  Get money
                </Text>
              </View>

              <View
                style={[
                  styles.receiveIconContainer,
                  {
                    backgroundColor: colors.backgroundSecondary,
                    borderColor: colors.progressTrack,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.receiveIcon,
                    {
                      color: colors.brandPrimary,
                    },
                  ]}
                >
                  ↙
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Quick Actions */}

          <View style={styles.quickActions}>
            <TouchableOpacity
              style={[
                styles.quickAction,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.progressTrack,
                },
              ]}
            >
              <View
                style={[
                  styles.quickIcon,
                  {
                    backgroundColor: colors.backgroundSecondary,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.quickIconText,
                    {
                      color: colors.brandPrimary,
                    },
                  ]}
                >
                  ↓
                </Text>
              </View>

              <Text
                style={[
                  styles.quickActionText,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                Request
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.quickAction,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.progressTrack,
                },
              ]}
            >
              <View
                style={[
                  styles.quickIcon,
                  {
                    backgroundColor: colors.backgroundSecondary,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.quickIconText,
                    {
                      color: colors.brandPrimary,
                    },
                  ]}
                >
                  +
                </Text>
              </View>

              <Text
                style={[
                  styles.quickActionText,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                Add Money
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.quickAction,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.progressTrack,
                },
              ]}
            >
              <View
                style={[
                  styles.quickIcon,
                  {
                    backgroundColor: colors.backgroundSecondary,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.quickIconText,
                    {
                      color: colors.brandPrimary,
                    },
                  ]}
                >
                  ⚡
                </Text>
              </View>

              <Text
                style={[
                  styles.quickActionText,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                Pay Bills
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.quickAction,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.progressTrack,
                },
              ]}
            >
              <View
                style={[
                  styles.quickIcon,
                  {
                    backgroundColor: colors.backgroundSecondary,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.quickIconText,
                    {
                      color: colors.brandPrimary,
                    },
                  ]}
                >
                  ▦
                </Text>
              </View>

              <Text
                style={[
                  styles.quickActionText,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                Scan & Pay
              </Text>
            </TouchableOpacity>
          </View>

          {/* Pending Request */}

          <View
            style={[
              styles.pendingCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.progressTrack,
              },
            ]}
          >
            <View style={styles.pendingHeader}>
              <View style={styles.pendingTitleRow}>
                <View
                  style={[
                    styles.pendingDot,
                    {
                      backgroundColor: colors.brandPrimary,
                    },
                  ]}
                />

                <Text
                  style={[
                    styles.pendingTitle,
                    {
                      color: colors.textPrimary,
                    },
                  ]}
                >
                  PENDING REQUEST
                </Text>
              </View>

              <View
                style={[
                  styles.actionRequiredBadge,
                  {
                    backgroundColor: colors.backgroundSecondary,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.actionRequiredText,
                    {
                      color: colors.brandPrimary,
                    },
                  ]}
                >
                  1 action required
                </Text>
              </View>
            </View>

            <View style={styles.requestRow}>
              <View style={styles.requestUser}>
                <View
                  style={[
                    styles.requestAvatar,
                    {
                      backgroundColor: colors.backgroundSecondary,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.requestAvatarText,
                      {
                        color: colors.brandPrimary,
                      },
                    ]}
                  >
                    RS
                  </Text>
                </View>

                <View>
                  <View style={styles.requestNameRow}>
                    <Text
                      style={[
                        styles.requestName,
                        {
                          color: colors.textPrimary,
                        },
                      ]}
                    >
                      Rahul Sharma
                    </Text>

                    <Text
                      style={[
                        styles.requestedText,
                        {
                          color: colors.textSecondary,
                        },
                      ]}
                    >
                      requested
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.requestNote,
                      {
                        color: colors.textSecondary,
                      },
                    ]}
                  >
                    "Your share of dinner"
                  </Text>
                </View>
              </View>

              <Text
                style={[
                  styles.requestAmount,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                ₹1,500
              </Text>
            </View>

            <View style={styles.requestActions}>
              <TouchableOpacity
                style={[
                  styles.declineButton,
                  {
                    backgroundColor: colors.backgroundSecondary,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.declineText,
                    {
                      color: colors.textSecondary,
                    },
                  ]}
                >
                  Decline
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.payRequestButton,
                  {
                    backgroundColor: colors.brandPrimary,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.payRequestText,
                    {
                      color: colors.surface,
                    },
                  ]}
                >
                  Pay ₹1,500
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Financial Overview */}

          <View
            style={[
              styles.overviewCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.progressTrack,
              },
            ]}
          >
            <View style={styles.overviewHeader}>
              <Text
                style={[
                  styles.overviewTitle,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                Financial Overview
              </Text>

              <Text
                style={[
                  styles.overviewDate,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                September 2026
              </Text>
            </View>

            <View style={styles.metricsRow}>
              <View style={styles.metricCard}>
                <Text
                  style={[
                    styles.metricLabel,
                    {
                      color: colors.textMuted,
                    },
                  ]}
                >
                  INCOME
                </Text>

                <Text
                  style={[
                    styles.metricValue,
                    {
                      color: colors.brandPrimary,
                    },
                  ]}
                >
                  +₹
                  {homeData.financialOverview.income.toLocaleString('en-IN')}
                </Text>
              </View>

              <View style={styles.metricCard}>
                <Text
                  style={[
                    styles.metricLabel,
                    {
                      color: colors.textMuted,
                    },
                  ]}
                >
                  SPENT
                </Text>

                <Text
                  style={[
                    styles.metricValue,
                    {
                      color: colors.textPrimary,
                    },
                  ]}
                >
                  -₹
                  {homeData.financialOverview.expense.toLocaleString('en-IN')}
                </Text>
              </View>

              <View style={styles.metricCard}>
                <Text
                  style={[
                    styles.metricLabel,
                    {
                      color: colors.textMuted,
                    },
                  ]}
                >
                  THIS MONTH
                </Text>

                <Text
                  style={[
                    styles.metricValue,
                    {
                      color: colors.brandPrimary,
                    },
                  ]}
                >
                  ₹
                  {homeData.financialOverview.monthlySpend.toLocaleString(
                    'en-IN',
                  )}
                </Text>
              </View>
            </View>

            <View style={styles.spendingContainer}>
              <View style={styles.spendingHeader}>
                <Text
                  style={[
                    styles.spendingLabel,
                    {
                      color: colors.textSecondary,
                    },
                  ]}
                >
                  Monthly spending
                </Text>

                <Text
                  style={[
                    styles.spendingAmount,
                    {
                      color: colors.textPrimary,
                    },
                  ]}
                >
                  ₹
                  {homeData.financialOverview.monthlySpend.toLocaleString(
                    'en-IN',
                  )}{' '}
                  <Text
                    style={[
                      styles.spendingLimit,
                      {
                        color: colors.textMuted,
                      },
                    ]}
                  >
                    of ₹30,000 ({spendingPercentage}%)
                  </Text>
                </Text>
              </View>

              <View
                style={[
                  styles.progressTrack,
                  {
                    backgroundColor: colors.progressTrack,
                  },
                ]}
              >
                <View
                  style={[
                    styles.progressFill,
                    {
                      backgroundColor: colors.progressFill,
                      width: `${spendingPercentage}%`,
                    },
                  ]}
                />
              </View>
            </View>
          </View>

          {/* Recent Transactions */}

          <View style={styles.transactionsSection}>
            <View style={styles.transactionsHeader}>
              <Text
                style={[
                  styles.transactionsTitle,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                Recent transactions
              </Text>

              <TouchableOpacity>
                <Text
                  style={[
                    styles.viewAll,
                    {
                      color: colors.brandPrimary,
                    },
                  ]}
                >
                  View all
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.transactionsCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.progressTrack,
                },
              ]}
            >
              {homeData.recentTransactions.map(transaction => {
                const isIncoming = transaction.transactionType === 'incoming';

                const initials = transaction.transactionName
                  .split(' ')
                  .map(word => word.charAt(0))
                  .slice(0, 2)
                  .join('')
                  .toUpperCase();

                return (
                  <TouchableOpacity
                    key={transaction.transactionId}
                    style={styles.transaction}
                  >
                    <View style={styles.transactionLeft}>
                      <View
                        style={[
                          styles.transactionAvatar,
                          {
                            backgroundColor: colors.backgroundSecondary,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.transactionAvatarText,
                            {
                              color: colors.brandPrimary,
                            },
                          ]}
                        >
                          {initials}
                        </Text>
                      </View>

                      <View style={styles.transactionInfo}>
                        <Text
                          numberOfLines={1}
                          style={[
                            styles.transactionName,
                            {
                              color: colors.textPrimary,
                            },
                          ]}
                        >
                          {transaction.transactionName}
                        </Text>

                        <Text
                          numberOfLines={1}
                          style={[
                            styles.transactionDescription,
                            {
                              color: colors.textSecondary,
                            },
                          ]}
                        >
                          {isIncoming ? 'Received money' : 'Sent money'} ·{' '}
                          {transaction.transactionDate}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.transactionRight}>
                      <Text
                        style={[
                          styles.transactionAmount,
                          {
                            color: isIncoming
                              ? colors.brandPrimary
                              : colors.textPrimary,
                          },
                        ]}
                      >
                        {isIncoming ? '+' : '-'}
                        {formatAmount(transaction.transactionAmount)}
                      </Text>

                      <Text
                        style={[
                          styles.completedText,
                          {
                            color: colors.textMuted,
                          },
                        ]}
                      >
                        Completed
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Security Footer */}

          <View style={styles.securityFooter}>
            <Text
              style={[
                styles.securityFooterIcon,
                {
                  color: colors.brandPrimary,
                },
              ]}
            >
              ✓
            </Text>

            <Text
              style={[
                styles.securityFooterText,
                {
                  color: colors.footerText,
                },
              ]}
            >
              VaultPay 256-bit bank-grade encryption
            </Text>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Bottom Navigation */}

        <View
          style={[
            styles.bottomNavigation,
            {
              backgroundColor: colors.surface,
              borderTopColor: colors.progressTrack,
            },
          ]}
        >
          <TouchableOpacity style={styles.navItem}>
            <Text
              style={[
                styles.navIcon,
                {
                  color: colors.brandPrimary,
                },
              ]}
            >
              ⌂
            </Text>

            <Text
              style={[
                styles.navLabel,
                {
                  color: colors.brandPrimary,
                },
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Text
              style={[
                styles.navIcon,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              ▥
            </Text>

            <Text
              style={[
                styles.navLabel,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              Activity
            </Text>
          </TouchableOpacity>

          <View style={styles.scanNavContainer}>
            <TouchableOpacity
              style={[
                styles.scanButton,
                {
                  backgroundColor: colors.brandPrimary,
                  borderColor: colors.surface,
                },
              ]}
            >
              <Text
                style={[
                  styles.scanIcon,
                  {
                    color: colors.surface,
                  },
                ]}
              >
                ▦
              </Text>
            </TouchableOpacity>

            <Text
              style={[
                styles.scanLabel,
                {
                  color: colors.textPrimary,
                },
              ]}
            >
              Scan
            </Text>
          </View>

          <TouchableOpacity style={styles.navItem}>
            <Text
              style={[
                styles.navIcon,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              ▣
            </Text>

            <Text
              style={[
                styles.navLabel,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              Payments
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Text
              style={[
                styles.navIcon,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              ◯
            </Text>

            <Text
              style={[
                styles.navLabel,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  ambientGlow: {
    position: 'absolute',
    top: -160,
    left: -80,
    right: -80,
    height: 360,
    borderRadius: 240,
  },

  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 30,
  },

  header: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatarWrapper: {
    width: 48,
    height: 48,
    marginRight: 12,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarOuter: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    fontSize: 13,
    fontWeight: '800',
  },

  verificationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },

  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  greeting: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },

  sunIcon: {
    fontSize: 12,
    marginLeft: 5,
  },

  userName: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 2,
  },

  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  notificationIcon: {
    fontSize: 20,
    fontWeight: '600',
  },

  notificationBadge: {
    width: 7,
    height: 7,
    borderRadius: 4,
    position: 'absolute',
    top: 10,
    right: 10,
  },

  walletCard: {
    minHeight: 205,
    borderRadius: 26,
    padding: 20,
    overflow: 'hidden',
    marginBottom: 16,
  },

  walletGlowRight: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    right: -90,
    top: -80,
    opacity: 0.2,
  },

  walletGlowLeft: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    left: -80,
    bottom: -80,
    opacity: 0.12,
  },

  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  walletHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },

  walletLogoBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 9,
  },

  walletLogoText: {
    fontSize: 15,
    fontWeight: '900',
  },

  walletLabel: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    marginRight: 8,
  },

  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 8,
  },

  secureDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginRight: 4,
  },

  secureText: {
    fontSize: 9,
    fontWeight: '700',
  },

  balanceToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 9,
  },

  eyeIcon: {
    fontSize: 12,
    marginRight: 4,
  },

  balanceToggleText: {
    fontSize: 10,
    fontWeight: '700',
  },

  mainBalanceContainer: {
    marginTop: 20,
  },

  mainBalance: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -1,
  },

  walletDivider: {
    height: 1,
    opacity: 0.2,
    marginVertical: 17,
  },

  walletDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  walletDetailLabel: {
    color: '#CBD5E1',
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 4,
  },

  walletAvailable: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  protectionContainer: {
    alignItems: 'flex-end',
  },

  protectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  protectionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  protectionIcon: {
    fontSize: 14,
    fontWeight: '900',
    marginLeft: 5,
  },

  primaryActions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },

  sendButton: {
    flex: 1,
    minHeight: 82,
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sendTitle: {
    fontSize: 17,
    fontWeight: '800',
  },

  sendSubtitle: {
    fontSize: 11,
    opacity: 0.8,
    marginTop: 3,
  },

  sendIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sendIcon: {
    fontSize: 19,
    fontWeight: '800',
  },

  receiveButton: {
    flex: 1,
    minHeight: 82,
    borderRadius: 20,
    borderWidth: 1,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  receiveTitle: {
    fontSize: 17,
    fontWeight: '800',
  },

  receiveSubtitle: {
    fontSize: 11,
    marginTop: 3,
  },

  receiveIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },

  receiveIcon: {
    fontSize: 19,
    fontWeight: '800',
  },

  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 16,
  },

  quickAction: {
    flex: 1,
    minHeight: 86,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 11,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  quickIcon: {
    width: 35,
    height: 35,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 7,
  },

  quickIconText: {
    fontSize: 18,
    fontWeight: '800',
  },

  quickActionText: {
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },

  pendingCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },

  pendingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  pendingTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  pendingDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 7,
  },

  pendingTitle: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },

  actionRequiredBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
  },

  actionRequiredText: {
    fontSize: 9,
    fontWeight: '700',
  },

  requestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  requestUser: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  requestAvatar: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  requestAvatarText: {
    fontSize: 12,
    fontWeight: '800',
  },

  requestNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  requestName: {
    fontSize: 13,
    fontWeight: '800',
    marginRight: 5,
  },

  requestedText: {
    fontSize: 11,
  },

  requestNote: {
    fontSize: 10,
    marginTop: 3,
  },

  requestAmount: {
    fontSize: 16,
    fontWeight: '800',
    marginLeft: 10,
  },

  requestActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 15,
  },

  declineButton: {
    flex: 1,
    minHeight: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  declineText: {
    fontSize: 12,
    fontWeight: '700',
  },

  payRequestButton: {
    flex: 1.5,
    minHeight: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  payRequestText: {
    fontSize: 12,
    fontWeight: '800',
  },

  overviewCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginBottom: 18,
  },

  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 17,
  },

  overviewTitle: {
    fontSize: 16,
    fontWeight: '800',
  },

  overviewDate: {
    fontSize: 10,
    fontWeight: '600',
  },

  metricsRow: {
    flexDirection: 'row',
    gap: 8,
  },

  metricCard: {
    flex: 1,
  },

  metricLabel: {
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.6,
    marginBottom: 5,
  },

  metricValue: {
    fontSize: 13,
    fontWeight: '800',
  },

  spendingContainer: {
    marginTop: 20,
  },

  spendingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  spendingLabel: {
    fontSize: 10,
    fontWeight: '600',
  },

  spendingAmount: {
    fontSize: 10,
    fontWeight: '700',
  },

  spendingLimit: {
    fontWeight: '500',
  },

  progressTrack: {
    width: '100%',
    height: 7,
    borderRadius: 5,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 5,
  },

  transactionsSection: {
    marginBottom: 10,
  },

  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  transactionsTitle: {
    fontSize: 17,
    fontWeight: '800',
  },

  viewAll: {
    fontSize: 11,
    fontWeight: '800',
  },

  transactionsCard: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },

  transaction: {
    minHeight: 74,
    paddingHorizontal: 13,
    paddingVertical: 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'transparent',
  },

  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
  },

  transactionAvatar: {
    width: 42,
    height: 42,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  transactionAvatarText: {
    fontSize: 11,
    fontWeight: '800',
  },

  transactionInfo: {
    flex: 1,
    minWidth: 0,
  },

  transactionName: {
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 3,
  },

  transactionDescription: {
    fontSize: 9,
  },

  transactionRight: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },

  transactionAmount: {
    fontSize: 13,
    fontWeight: '800',
  },

  completedText: {
    fontSize: 9,
    fontWeight: '600',
    marginTop: 3,
  },

  securityFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },

  securityFooterIcon: {
    fontSize: 12,
    fontWeight: '900',
    marginRight: 5,
  },

  securityFooterText: {
    fontSize: 9,
    fontWeight: '600',
  },

  bottomSpacing: {
    height: 90,
  },

  bottomNavigation: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 72,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 6,
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  navIcon: {
    fontSize: 20,
    marginBottom: 3,
  },

  navLabel: {
    fontSize: 9,
    fontWeight: '600',
  },

  scanNavContainer: {
    width: 62,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -22,
  },

  scanButton: {
    width: 54,
    height: 54,
    borderRadius: 18,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scanIcon: {
    fontSize: 22,
    fontWeight: '800',
  },

  scanLabel: {
    fontSize: 9,
    fontWeight: '700',
    marginTop: 3,
  },
});

export default HomeScreen;
