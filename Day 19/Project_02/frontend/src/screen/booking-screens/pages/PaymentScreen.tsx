import { StyleSheet } from 'react-native';
import lightTheme from '../../../theme/lightTheme';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';

import SafeAreaContainer from '../../../component/SafeAreaContainer';
import SolidButton from '../../../component/SolidButton';
import BackButton from '../../../component/BackButton';
import CustomInput from '../../../component/CustomInput';

type PaymentMethod = 'upi' | 'card' | 'netBanking' | 'wallet';

interface PaymentScreenProps {
  navigation?: any;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ navigation }) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');

  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const baseFare = 4999;
  const convenienceFee = 149;
  const taxes = 312;

  const discount = couponApplied ? 500 : 0;

  const totalAmount = useMemo(() => {
    return baseFare + convenienceFee + taxes - discount;
  }, [discount]);

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const handleApplyCoupon = () => {
    if (!coupon.trim()) {
      Alert.alert('Enter coupon', 'Please enter a coupon code.');
      return;
    }

    if (coupon.trim().toUpperCase() === 'TRAVEL500') {
      setCouponApplied(true);
      Alert.alert('Coupon applied', '₹500 has been deducted from your fare.');
      return;
    }

    setCouponApplied(false);
    Alert.alert('Invalid coupon', 'This coupon code is not valid.');
  };

  const validatePayment = () => {
    if (paymentMethod === 'upi') {
      if (!upiId.trim()) {
        Alert.alert('UPI ID required', 'Please enter your UPI ID.');
        return false;
      }
    }

    if (paymentMethod === 'card') {
      if (
        !cardNumber.trim() ||
        !cardHolderName.trim() ||
        !expiryDate.trim() ||
        !cvv.trim()
      ) {
        Alert.alert(
          'Incomplete card details',
          'Please enter all card details.',
        );
        return false;
      }
    }

    return true;
  };

  const handlePayment = () => {
    if (!validatePayment()) {
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      Alert.alert(
        'Payment successful',
        `Your payment of ${formatCurrency(
          totalAmount,
        )} has been processed successfully.`,
        [
          {
            text: 'Continue',
            onPress: () => {
              navigation?.navigate('booking-confirmation');
            },
          },
        ],
      );
    }, 1500);
  };

  const renderPaymentMethod = (
    method: PaymentMethod,
    title: string,
    subtitle: string,
    icon: string,
  ) => {
    const selected = paymentMethod === method;

    return (
      <Pressable
        onPress={() => setPaymentMethod(method)}
        style={[styles.paymentMethod, selected && styles.paymentMethodSelected]}
      >
        <View
          style={[
            styles.paymentIconContainer,
            selected && styles.paymentIconContainerSelected,
          ]}
        >
          <Text style={styles.paymentIcon}>{icon}</Text>
        </View>

        <View style={styles.paymentMethodContent}>
          <Text style={styles.paymentMethodTitle}>{title}</Text>
          <Text style={styles.paymentMethodSubtitle}>{subtitle}</Text>
        </View>

        <View
          style={[styles.radioOuter, selected && styles.radioOuterSelected]}
        >
          {selected && <View style={styles.radioInner} />}
        </View>
      </Pressable>
    );
  };

  const renderPaymentDetails = () => {
    if (paymentMethod === 'upi') {
      return (
        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>UPI Payment</Text>

          <Text style={styles.inputLabel}>UPI ID</Text>

          <TextInput
            value={upiId}
            onChangeText={setUpiId}
            placeholder="example@upi"
            placeholderTextColor={lightTheme.colors.textTertiary}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />
          {/* <CustomInput /> */}
          <Text style={styles.inputHint}>
            You will receive a payment request on your UPI app.
          </Text>
        </View>
      );
    }

    if (paymentMethod === 'card') {
      return (
        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Card Details</Text>

          <Text style={styles.inputLabel}>Card Number</Text>

          <TextInput
            value={cardNumber}
            onChangeText={setCardNumber}
            placeholder="1234 5678 9012 3456"
            placeholderTextColor={lightTheme.colors.textTertiary}
            keyboardType="number-pad"
            maxLength={19}
            style={styles.input}
          />

          <Text style={styles.inputLabel}>Card Holder Name</Text>

          <TextInput
            value={cardHolderName}
            onChangeText={setCardHolderName}
            placeholder="Name on card"
            placeholderTextColor={lightTheme.colors.textTertiary}
            autoCapitalize="words"
            style={styles.input}
          />

          <View style={styles.cardRow}>
            <View style={styles.cardHalf}>
              <Text style={styles.inputLabel}>Expiry</Text>

              <TextInput
                value={expiryDate}
                onChangeText={setExpiryDate}
                placeholder="MM/YY"
                placeholderTextColor={lightTheme.colors.textTertiary}
                keyboardType="number-pad"
                maxLength={5}
                style={styles.input}
              />
            </View>

            <View style={styles.cardHalf}>
              <Text style={styles.inputLabel}>CVV</Text>

              <TextInput
                value={cvv}
                onChangeText={setCvv}
                placeholder="•••"
                placeholderTextColor={lightTheme.colors.textTertiary}
                keyboardType="number-pad"
                secureTextEntry
                maxLength={4}
                style={styles.input}
              />
            </View>
          </View>
        </View>
      );
    }

    if (paymentMethod === 'netBanking') {
      return (
        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Net Banking</Text>

          <Pressable style={styles.bankSelector}>
            <Text style={styles.bankIcon}>🏦</Text>

            <Text style={styles.bankSelectorText}>Select your bank</Text>

            <Text style={styles.bankArrow}>›</Text>
          </Pressable>
        </View>
      );
    }

    return (
      <View style={styles.detailsCard}>
        <Text style={styles.detailsTitle}>Wallet</Text>

        <Pressable style={styles.walletOption}>
          <View style={styles.walletLogo}>
            <Text style={styles.walletLogoText}>W</Text>
          </View>

          <View style={styles.walletContent}>
            <Text style={styles.walletTitle}>Travel Wallet</Text>
            <Text style={styles.walletSubtitle}>Use your wallet balance</Text>
          </View>

          <Text style={styles.walletArrow}>›</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <BackButton />
          <View>
            <Text style={styles.headerTitle}>Payment</Text>
            <Text style={styles.headerSubtitle}>Complete your booking</Text>
          </View>
        </View>

        <View style={styles.bookingCard}>
          <View style={styles.bookingHeader}>
            <View>
              <Text style={styles.bookingLabel}>FLIGHT BOOKING</Text>
              <Text style={styles.bookingTitle}>New Delhi → Mumbai</Text>
            </View>

            <View style={styles.bookingBadge}>
              <Text style={styles.bookingBadgeText}>Economy</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.bookingDetails}>
            <View>
              <Text style={styles.detailLabel}>Departure</Text>
              <Text style={styles.detailValue}>24 Sep 2026</Text>
            </View>

            <View>
              <Text style={styles.detailLabel}>Passengers</Text>
              <Text style={styles.detailValue}>1 Adult</Text>
            </View>

            <View>
              <Text style={styles.detailLabel}>Trip</Text>
              <Text style={styles.detailValue}>One Way</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Offers & Coupons</Text>

          <View style={styles.couponContainer}>
            <TextInput
              value={coupon}
              onChangeText={setCoupon}
              placeholder="Enter coupon code"
              placeholderTextColor={lightTheme.colors.textTertiary}
              autoCapitalize="characters"
              style={styles.couponInput}
              editable={!couponApplied}
            />

            <Pressable
              onPress={handleApplyCoupon}
              style={[
                styles.applyButton,
                couponApplied && styles.appliedButton,
              ]}
            >
              <Text style={styles.applyButtonText}>
                {couponApplied ? 'Applied' : 'Apply'}
              </Text>
            </Pressable>
          </View>

          <View style={styles.offerHint}>
            <Text style={styles.offerIcon}>%</Text>
            <Text style={styles.offerText}>Use TRAVEL500 and get ₹500 off</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>

          {renderPaymentMethod(
            'upi',
            'UPI',
            'Google Pay, PhonePe, Paytm & more',
            'UPI',
          )}

          {renderPaymentMethod(
            'card',
            'Credit / Debit Card',
            'Visa, Mastercard, RuPay & more',
            '▣',
          )}

          {renderPaymentMethod(
            'netBanking',
            'Net Banking',
            'Pay directly from your bank',
            '⌘',
          )}

          {renderPaymentMethod(
            'wallet',
            'Wallet',
            'Use your travel wallet balance',
            '◉',
          )}
        </View>

        {renderPaymentDetails()}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fare Summary</Text>

          <View style={styles.fareCard}>
            <View style={styles.fareRow}>
              <Text style={styles.fareLabel}>Base Fare</Text>
              <Text style={styles.fareValue}>{formatCurrency(baseFare)}</Text>
            </View>

            <View style={styles.fareRow}>
              <Text style={styles.fareLabel}>Convenience Fee</Text>
              <Text style={styles.fareValue}>
                {formatCurrency(convenienceFee)}
              </Text>
            </View>

            <View style={styles.fareRow}>
              <Text style={styles.fareLabel}>Taxes & Fees</Text>
              <Text style={styles.fareValue}>{formatCurrency(taxes)}</Text>
            </View>

            {couponApplied && (
              <View style={styles.fareRow}>
                <Text style={styles.discountLabel}>Coupon Discount</Text>
                <Text style={styles.discountValue}>
                  -{formatCurrency(discount)}
                </Text>
              </View>
            )}

            <View style={styles.fareDivider} />

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>
                {formatCurrency(totalAmount)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.securityCard}>
          <View style={styles.securityIconContainer}>
            <Text style={styles.securityIcon}>✓</Text>
          </View>

          <View style={styles.securityContent}>
            <Text style={styles.securityTitle}>Secure Payment</Text>

            <Text style={styles.securityText}>
              Your payment information is encrypted and securely processed.
            </Text>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.paySummary}>
            <Text style={styles.payLabel}>Total Payable</Text>
            <Text style={styles.payAmount}>{formatCurrency(totalAmount)}</Text>
          </View>

          <SolidButton
            title={
              isProcessing
                ? 'Processing...'
                : `Pay ${formatCurrency(totalAmount)}`
            }
            onPress={handlePayment}
            // disabled={isProcessing}
          />
        </View>

        <Text style={styles.termsText}>
          By continuing, you agree to our Terms & Conditions and Privacy Policy.
        </Text>
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default PaymentScreen;

const { colors, typography, spacing, radius, shadow } = lightTheme;

const styles = StyleSheet.create({
  content: {
    // paddingHorizontal: spacing.lg,
    // paddingTop: spacing.md,
    paddingBottom: spacing.xxxl,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  headerTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    lineHeight: typography.fontSize.xl * typography.lineHeight.tight,
    color: colors.text,
  },

  headerSubtitle: {
    marginTop: spacing.xs,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.xs,
    lineHeight: typography.fontSize.xs * typography.lineHeight.normal,
    color: colors.textSecondary,
  },

  // Booking Summary
  bookingCard: {
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderRadius: radius.xl,
    backgroundColor: colors.primary,
    ...shadow.medium,
  },

  bookingHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  bookingLabel: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xs,
    lineHeight: typography.fontSize.xs * typography.lineHeight.tight,
    letterSpacing: 1,
    color: colors.secondaryLight,
  },

  bookingTitle: {
    marginTop: spacing.xs,
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    lineHeight: typography.fontSize.lg * typography.lineHeight.tight,
    color: colors.textOnPrimary,
  },

  bookingBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: colors.primaryLight,
  },

  bookingBadgeText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.xs,
    color: colors.textOnPrimary,
  },

  divider: {
    height: 1,
    marginVertical: spacing.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
  },

  bookingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  detailLabel: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.xs,
    color: colors.primaryLight,
  },

  detailValue: {
    marginTop: spacing.xs,
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.xs,
    color: colors.textOnPrimary,
  },

  // Sections
  section: {
    marginBottom: spacing.xl,
  },

  sectionTitle: {
    marginBottom: spacing.md,
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.lg,
    lineHeight: typography.fontSize.lg * typography.lineHeight.tight,
    color: colors.text,
  },

  // Coupon
  couponContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
    padding: spacing.xs,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.small,
  },

  couponInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: spacing.md,
    paddingVertical: 0,
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.text,
  },

  applyButton: {
    minWidth: 78,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
  },

  appliedButton: {
    backgroundColor: colors.success,
  },

  applyButtonText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.xs,
    color: colors.textOnPrimary,
  },

  offerHint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },

  offerIcon: {
    width: 20,
    height: 20,
    marginRight: spacing.sm,
    borderRadius: radius.pill,
    textAlign: 'center',
    lineHeight: 20,
    backgroundColor: colors.secondaryLight,
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xs,
    color: colors.primaryDark,
  },

  offerText: {
    flex: 1,
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },

  // Payment Methods
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 72,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  paymentMethodSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceSecondary,
    ...shadow.small,
  },

  paymentIconContainer: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.surfaceSecondary,
  },

  paymentIconContainerSelected: {
    backgroundColor: colors.primary,
  },

  paymentIcon: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.primary,
  },

  paymentMethodContent: {
    flex: 1,
    marginHorizontal: spacing.md,
  },

  paymentMethodTitle: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
    color: colors.text,
  },

  paymentMethodSubtitle: {
    marginTop: spacing.xs,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.xs,
    lineHeight: typography.fontSize.xs * typography.lineHeight.normal,
    color: colors.textSecondary,
  },

  radioOuter: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderRadius: radius.pill,
    borderColor: colors.border,
  },

  radioOuterSelected: {
    borderColor: colors.primary,
  },

  radioInner: {
    width: 11,
    height: 11,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },

  // Payment Details
  detailsCard: {
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.small,
  },

  detailsTitle: {
    marginBottom: spacing.lg,
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.text,
  },

  inputLabel: {
    marginBottom: spacing.xs,
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },

  input: {
    height: 50,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: colors.border,
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.text,
  },

  inputHint: {
    marginTop: -spacing.xs,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.xs,
    lineHeight: typography.fontSize.xs * typography.lineHeight.relaxed,
    color: colors.textTertiary,
  },

  cardRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },

  cardHalf: {
    flex: 1,
  },

  // Net Banking
  bankSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: colors.border,
  },

  bankIcon: {
    marginRight: spacing.md,
    fontSize: typography.fontSize.xl,
  },

  bankSelectorText: {
    flex: 1,
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },

  bankArrow: {
    fontFamily: typography.fontFamily.medium,
    fontSize: 26,
    color: colors.textTertiary,
  },

  // Wallet
  walletOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  walletLogo: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.primary,
  },

  walletLogoText: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.textOnPrimary,
  },

  walletContent: {
    flex: 1,
    marginLeft: spacing.md,
  },

  walletTitle: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm,
    color: colors.text,
  },

  walletSubtitle: {
    marginTop: spacing.xs,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },

  walletArrow: {
    fontFamily: typography.fontFamily.medium,
    fontSize: 26,
    color: colors.textTertiary,
  },

  // Fare Summary
  fareCard: {
    padding: spacing.lg,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.small,
  },

  fareRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },

  fareLabel: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },

  fareValue: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.text,
  },

  discountLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.success,
  },

  discountValue: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm,
    color: colors.success,
  },

  fareDivider: {
    height: 1,
    marginVertical: spacing.sm,
    backgroundColor: colors.divider,
  },

  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },

  totalLabel: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.md,
    color: colors.text,
  },

  totalValue: {
    fontFamily: typography.fontFamily.extraBold,
    fontSize: typography.fontSize.xl,
    color: colors.primary,
  },

  // Security
  securityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    marginBottom: spacing.xl,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: colors.border,
  },

  securityIconContainer: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
    backgroundColor: colors.success,
  },

  securityIcon: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.md,
    color: colors.textOnPrimary,
  },

  securityContent: {
    flex: 1,
    marginLeft: spacing.md,
  },

  securityTitle: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm,
    color: colors.text,
  },

  securityText: {
    marginTop: spacing.xs,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.xs,
    lineHeight: typography.fontSize.xs * typography.lineHeight.normal,
    color: colors.textSecondary,
  },

  // Bottom Payment
  bottomContainer: {
    padding: spacing.md,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.medium,
  },

  paySummary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },

  payLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },

  payAmount: {
    fontFamily: typography.fontFamily.extraBold,
    fontSize: typography.fontSize.xl,
    color: colors.primary,
  },

  termsText: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
    textAlign: 'center',
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.xs,
    lineHeight: typography.fontSize.xs * typography.lineHeight.normal,
    color: colors.textTertiary,
  },
});
