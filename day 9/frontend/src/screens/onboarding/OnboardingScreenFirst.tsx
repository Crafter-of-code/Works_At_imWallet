import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import SafeAreaContainer from '../../components/SafeAreaContainer';
import { mainContext } from '../../store/MainContextProvider';
import { useNavigation } from '@react-navigation/native';

const OnboardingScreenFirst = () => {
  const { isDarkModel } = React.useContext(mainContext);
  const { height, width } = useWindowDimensions();
  const nav = useNavigation();
  const isSmallScreen = height < 700;
  const isVerySmallScreen = height < 620;
  const hello = () => {
    console.log('hello world');
  };
  return (
    <SafeAreaContainer>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.brandContainer}>
          <View style={styles.brandMark}>
            <Image
              source={require('../../assets/vaultpay_logo_extracted.png')}
              style={styles.brandLogo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.brandName}>
            <Text style={styles.vault}>Vault</Text>
            <Text style={styles.pay}>Pay</Text>
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.6}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Hero */}
        <View
          style={[
            styles.heroContainer,
            isSmallScreen && styles.heroContainerSmall,
            isVerySmallScreen && styles.heroContainerVerySmall,
          ]}
        >
          {/* Ambient background */}
          <View style={styles.glowLarge} />
          <View style={styles.glowSmall} />

          {/* Decorative circles */}
          <View style={styles.circleOne} />
          <View style={styles.circleTwo} />

          {/* Floating card - top left */}
          <View style={[styles.floatingCard, styles.cardTopLeft]}>
            <View style={styles.cardIconBlue}>
              <Text style={styles.cardIconText}>↗</Text>
            </View>

            <View>
              <Text style={styles.cardLabel}>Send</Text>
              <Text style={styles.cardValue}>₹2,500</Text>
            </View>
          </View>

          {/* Floating card - bottom right */}
          <View style={[styles.floatingCard, styles.cardBottomRight]}>
            <View style={styles.cardIconGreen}>
              <Text style={styles.cardIconTextGreen}>✓</Text>
            </View>

            <View>
              <Text style={styles.cardLabel}>Payment</Text>
              <Text style={styles.cardValue}>Successful</Text>
            </View>
          </View>

          {/* Main Logo */}
          <View style={styles.logoOrb}>
            <View style={styles.logoInner}>
              <Image
                source={require('../../assets/vaultpay_logo_extracted.png')}
                style={styles.heroImage}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        {/* Badge */}
        <View style={styles.badge}>
          <View style={styles.statusDot} />

          <Text style={styles.badgeText}>ZERO FEES</Text>

          <View style={styles.badgeDivider} />

          <Text style={styles.badgeText}>INSTANT SETTLEMENT</Text>
        </View>

        {/* Typography */}
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              isSmallScreen && styles.titleSmall,
              isVerySmallScreen && styles.titleVerySmall,
            ]}
          >
            Your money.
            {'\n'}
            <Text style={styles.titleAccent}>Beautifully simple.</Text>
          </Text>

          <Text
            style={[
              styles.description,
              isSmallScreen && styles.descriptionSmall,
            ]}
          >
            Send, receive and manage your money effortlessly — all in one secure
            wallet.
          </Text>
        </View>

        {/* Pagination */}
        <View style={styles.pagination}>
          <View style={styles.activeDot} />
          <View style={styles.inactiveDot} />
          <View style={styles.inactiveDot} />
        </View>

        {/* Trust points */}
        <View
          style={[
            styles.trustContainer,
            isSmallScreen && styles.trustContainerSmall,
          ]}
        >
          <View style={styles.trustItem}>
            <View style={styles.trustIcon}>
              <Text style={styles.trustIconText}>⌁</Text>
            </View>

            <View>
              <Text style={styles.trustTitle}>Instant</Text>
              <Text style={styles.trustSubtitle}>Transfers</Text>
            </View>
          </View>

          <View style={styles.verticalDivider} />

          <View style={styles.trustItem}>
            <View style={styles.trustIcon}>
              <Text style={styles.trustIconText}>✓</Text>
            </View>

            <View>
              <Text style={styles.trustTitle}>Secure</Text>
              <Text style={styles.trustSubtitle}>Biometric access</Text>
            </View>
          </View>
        </View>
      </View>

      {/* CTA */}
      <View style={styles.ctaContainer}>
        <TouchableOpacity
          style={[styles.nextButton, isSmallScreen && styles.nextButtonSmall]}
          activeOpacity={0.88}
          onPress={() => {}}
        >
          <Text style={styles.nextText}>Get started</Text>

          <View style={styles.arrowContainer}>
            <Text style={styles.arrow}>→</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.footerText}>Your money, your control.</Text>
      </View>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#FAFAF8',
    paddingHorizontal: 25,
    paddingVertical: 25,
  },

  /* ---------------- Header ---------------- */

  header: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  brandMark: {
    width: 34,
    height: 34,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#1E293B',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },

  brandLogo: {
    width: 25,
    height: 25,
  },

  brandName: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginLeft: 9,
  },

  vault: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.7,
  },

  pay: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2563EB',
    letterSpacing: -0.7,
  },

  skip: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },

  /* ---------------- Content ---------------- */

  content: {
    flex: 1,
    justifyContent: 'center',
  },

  /* ---------------- Hero ---------------- */

  heroContainer: {
    width: '100%',
    height: 310,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 2,
    marginBottom: 4,
  },

  heroContainerSmall: {
    height: 235,
  },

  heroContainerVerySmall: {
    height: 195,
  },

  glowLarge: {
    position: 'absolute',
    width: 245,
    height: 245,
    borderRadius: 130,
    backgroundColor: '#E8F0FF',
    opacity: 0.9,
  },

  glowSmall: {
    position: 'absolute',
    width: 175,
    height: 175,
    borderRadius: 100,
    backgroundColor: '#DCE8FF',
    opacity: 0.55,
  },

  circleOne: {
    position: 'absolute',
    width: 230,
    height: 230,
    borderRadius: 120,
    borderWidth: 1,
    borderColor: '#D9E5FF',
    opacity: 0.7,
  },

  circleTwo: {
    position: 'absolute',
    width: 285,
    height: 285,
    borderRadius: 150,
    borderWidth: 1,
    borderColor: '#E7EDFA',
  },

  logoOrb: {
    width: 154,
    height: 154,
    borderRadius: 77,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#2563EB',
    shadowOffset: {
      width: 0,
      height: 14,
    },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 8,
    zIndex: 3,
  },

  logoInner: {
    width: 130,
    height: 130,
    borderRadius: 65,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F9FF',
    borderWidth: 1,
    borderColor: '#E8EEFF',
  },

  heroImage: {
    width: 88,
    height: 88,
  },

  /* ---------------- Floating Cards ---------------- */

  floatingCard: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 11,
    paddingVertical: 9,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,

    shadowColor: '#0F172A',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.1,
    shadowRadius: 14,

    elevation: 5,

    zIndex: 5,
  },

  cardTopLeft: {
    left: 6,
    top: 54,
  },

  cardBottomRight: {
    right: 4,
    bottom: 42,
  },

  cardIconBlue: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    marginRight: 8,
  },

  cardIconGreen: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECFDF5',
    marginRight: 8,
  },

  cardIconText: {
    color: '#2563EB',
    fontSize: 16,
    fontWeight: '800',
  },

  cardIconTextGreen: {
    color: '#059669',
    fontSize: 15,
    fontWeight: '800',
  },

  cardLabel: {
    fontSize: 9,
    fontWeight: '500',
    color: '#94A3B8',
    marginBottom: 1,
  },

  cardValue: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },

  /* ---------------- Badge ---------------- */

  badge: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 30,
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 7,
  },

  badgeText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.7,
    color: '#047857',
  },

  badgeDivider: {
    width: 1,
    height: 10,
    backgroundColor: '#A7F3D0',
    marginHorizontal: 8,
  },

  /* ---------------- Typography ---------------- */

  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 8,
    marginTop: 14,
  },

  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    letterSpacing: -1,
  },

  titleSmall: {
    fontSize: 26,
    lineHeight: 32,
  },

  titleVerySmall: {
    fontSize: 23,
    lineHeight: 29,
  },

  titleAccent: {
    color: '#2563EB',
  },

  description: {
    maxWidth: 315,
    marginTop: 9,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400',
    color: '#64748B',
    textAlign: 'center',
  },

  descriptionSmall: {
    fontSize: 13,
    lineHeight: 19,
    marginTop: 7,
    maxWidth: 290,
  },

  /* ---------------- Pagination ---------------- */

  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },

  activeDot: {
    width: 25,
    height: 7,
    borderRadius: 5,
    backgroundColor: '#2563EB',
    marginHorizontal: 4,
  },

  inactiveDot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: '#DCE3EF',
    marginHorizontal: 4,
  },

  /* ---------------- Trust ---------------- */

  trustContainer: {
    width: '100%',
    maxWidth: 330,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 19,
    paddingHorizontal: 6,
  },

  trustContainerSmall: {
    marginTop: 12,
  },

  trustItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  trustIcon: {
    width: 31,
    height: 31,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    marginRight: 8,
  },

  trustIconText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2563EB',
  },

  trustTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },

  trustSubtitle: {
    fontSize: 9,
    fontWeight: '500',
    color: '#94A3B8',
    marginTop: 1,
  },

  verticalDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 8,
  },

  /* ---------------- CTA ---------------- */

  ctaContainer: {
    width: '100%',
    paddingTop: 12,
  },

  nextButton: {
    width: '100%',
    height: 58,
    borderRadius: 18,
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#2563EB',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.22,
    shadowRadius: 14,

    elevation: 6,
  },

  nextButtonSmall: {
    height: 53,
    borderRadius: 16,
  },

  nextText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.1,
    marginRight: 10,
  },

  arrowContainer: {
    width: 28,
    height: 28,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.16)',
  },

  arrow: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    marginTop: -1,
  },

  footerText: {
    textAlign: 'center',
    marginTop: 9,
    fontSize: 10,
    fontWeight: '500',
    color: '#94A3B8',
  },
});

export default OnboardingScreenFirst;
