import React from 'react';

import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import SafeAreaContainer from '../../../component/SafeAreaContainer';
import lightTheme from '../../../theme/lightTheme';
import { mainContext } from '../../../store/MainContextProvider';
import { authContext } from '../../../store/AuthContextProvider';
import { useNavigation } from '@react-navigation/native';
import { appContext } from '../../../store/AppContextProvider';

const MyTripScreen = (): React.ReactElement => {
  const nav = useNavigation<any>();
  const { getUserDetail } = React.useContext(appContext);
  React.useEffect(() => {
    getUserDetail();
  });
  const { logoutHandler } = React.useContext(authContext);
  return (
    <SafeAreaContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.pageTitle}>My Trip</Text>
            <Text style={styles.pageSubtitle}>
              Your journeys, bookings and travel plans
            </Text>
          </View>

          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => {
              nav.navigate('EditProfile');
            }}
          >
            <Text style={styles.settingsIcon}>⚙︎</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>U</Text>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Uzair Khan</Text>
            <Text style={styles.profileEmail}>uzair@example.com</Text>

            <View style={styles.verifiedContainer}>
              <View style={styles.verifiedDot} />
              <Text style={styles.verifiedText}>Verified traveler</Text>
            </View>
          </View>

          <Pressable style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </Pressable>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>08</Text>
            <Text style={styles.statLabel}>Trips</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statValue}>14</Text>
            <Text style={styles.statLabel}>Places</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Days travelled</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Your travel</Text>

        <View style={styles.menuContainer}>
          <Pressable style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>✈</Text>
            </View>

            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Upcoming trips</Text>
              <Text style={styles.menuSubtitle}>
                View your upcoming journeys
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </Pressable>

          <Pressable style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>◷</Text>
            </View>

            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Trip history</Text>
              <Text style={styles.menuSubtitle}>
                Explore your previous trips
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </Pressable>

          <Pressable style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>♡</Text>
            </View>

            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Saved places</Text>
              <Text style={styles.menuSubtitle}>
                Destinations you want to visit
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </Pressable>

          <Pressable style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>▣</Text>
            </View>

            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Travel documents</Text>
              <Text style={styles.menuSubtitle}>
                Manage your travel documents
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>Account</Text>

        <View style={styles.menuContainer}>
          <Pressable style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>◉</Text>
            </View>

            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Personal information</Text>
              <Text style={styles.menuSubtitle}>
                Name, email and phone number
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </Pressable>

          <Pressable style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>▤</Text>
            </View>

            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Payment methods</Text>
              <Text style={styles.menuSubtitle}>
                Manage cards and payment options
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </Pressable>

          <Pressable style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>?</Text>
            </View>

            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Help & support</Text>
              <Text style={styles.menuSubtitle}>Get help with your travel</Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logoutHandler}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    // paddingHorizontal: lightTheme.spacing.xl,
    // paddingTop: lightTheme.spacing.xl,
    paddingBottom: 110,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: lightTheme.spacing.xxl,
  },

  pageTitle: {
    fontFamily: lightTheme.typography.fontFamily.bold,
    fontSize: lightTheme.typography.fontSize.xxxl,
    color: lightTheme.colors.text,
  },

  pageSubtitle: {
    marginTop: lightTheme.spacing.xs,
    fontFamily: lightTheme.typography.fontFamily.regular,
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.textSecondary,
  },

  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: lightTheme.radius.pill,
    backgroundColor: lightTheme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    ...lightTheme.shadow.small,
  },

  settingsIcon: {
    fontSize: 25,
    color: lightTheme.colors.text,
  },

  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: lightTheme.colors.primary,
    borderRadius: lightTheme.radius.xl,
    padding: lightTheme.spacing.lg,
    ...lightTheme.shadow.medium,
  },

  avatar: {
    width: 62,
    height: 62,
    borderRadius: lightTheme.radius.pill,
    backgroundColor: lightTheme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    fontFamily: lightTheme.typography.fontFamily.extraBold,
    fontSize: lightTheme.typography.fontSize.xxl,
    color: lightTheme.colors.primary,
  },

  profileInfo: {
    flex: 1,
    marginLeft: lightTheme.spacing.md,
  },

  profileName: {
    fontFamily: lightTheme.typography.fontFamily.bold,
    fontSize: lightTheme.typography.fontSize.lg,
    color: lightTheme.colors.textOnPrimary,
  },

  profileEmail: {
    marginTop: 2,
    fontFamily: lightTheme.typography.fontFamily.regular,
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.white,
    opacity: lightTheme.opacity.muted,
  },

  verifiedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: lightTheme.spacing.xs,
  },

  verifiedDot: {
    width: 7,
    height: 7,
    borderRadius: lightTheme.radius.pill,
    backgroundColor: lightTheme.colors.secondary,
    marginRight: lightTheme.spacing.xs,
  },

  verifiedText: {
    fontFamily: lightTheme.typography.fontFamily.medium,
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.white,
  },

  editButton: {
    paddingHorizontal: lightTheme.spacing.md,
    paddingVertical: lightTheme.spacing.sm,
    borderRadius: lightTheme.radius.pill,
    backgroundColor: 'rgba(255,255,255,0.14)',
  },

  editButtonText: {
    fontFamily: lightTheme.typography.fontFamily.semiBold,
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.white,
  },

  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: lightTheme.colors.surface,
    borderRadius: lightTheme.radius.lg,
    marginTop: lightTheme.spacing.lg,
    paddingVertical: lightTheme.spacing.lg,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    ...lightTheme.shadow.small,
  },

  statItem: {
    flex: 1,
    alignItems: 'center',
  },

  statValue: {
    fontFamily: lightTheme.typography.fontFamily.bold,
    fontSize: lightTheme.typography.fontSize.xl,
    color: lightTheme.colors.primary,
  },

  statLabel: {
    marginTop: lightTheme.spacing.xs,
    fontFamily: lightTheme.typography.fontFamily.regular,
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.textSecondary,
  },

  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: lightTheme.colors.divider,
  },

  sectionTitle: {
    marginTop: lightTheme.spacing.xxl,
    marginBottom: lightTheme.spacing.md,
    fontFamily: lightTheme.typography.fontFamily.bold,
    fontSize: lightTheme.typography.fontSize.lg,
    color: lightTheme.colors.text,
  },

  menuContainer: {
    backgroundColor: lightTheme.colors.surface,
    borderRadius: lightTheme.radius.lg,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    overflow: 'hidden',
  },

  menuItem: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: lightTheme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: lightTheme.colors.divider,
  },

  menuIconContainer: {
    width: 42,
    height: 42,
    borderRadius: lightTheme.radius.md,
    backgroundColor: lightTheme.colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuIcon: {
    fontSize: 18,
    color: lightTheme.colors.primary,
  },

  menuContent: {
    flex: 1,
    marginLeft: lightTheme.spacing.md,
  },

  menuTitle: {
    fontFamily: lightTheme.typography.fontFamily.semiBold,
    fontSize: lightTheme.typography.fontSize.md,
    color: lightTheme.colors.text,
  },

  menuSubtitle: {
    marginTop: 2,
    fontFamily: lightTheme.typography.fontFamily.regular,
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.textSecondary,
  },

  arrow: {
    fontFamily: lightTheme.typography.fontFamily.medium,
    fontSize: 28,
    color: lightTheme.colors.textTertiary,
  },

  logoutButton: {
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: lightTheme.spacing.xxl,
    borderRadius: lightTheme.radius.lg,
    borderWidth: 1,
    borderColor: lightTheme.colors.error,
  },

  logoutText: {
    fontFamily: lightTheme.typography.fontFamily.semiBold,
    fontSize: lightTheme.typography.fontSize.md,
    color: lightTheme.colors.error,
  },
});

export default MyTripScreen;
