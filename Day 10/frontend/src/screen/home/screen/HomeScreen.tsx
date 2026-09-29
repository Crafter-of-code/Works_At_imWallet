import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import lightTheme from '../../../theme/lightTheme';
import SafeAreaContainer from '../../../component/SafeAreaContainer';
import { useNavigation } from '@react-navigation/native';

function HomeScreen(): React.ReactElement {
  const nav = useNavigation<any>();
  const hour = new Date().getHours();
  const getGreeting = (hour: number): string => {
    switch (true) {
      case hour >= 5 && hour < 12:
        return 'Good morning';

      case hour >= 12 && hour < 17:
        return 'Good afternoon';

      case hour >= 17 && hour < 21:
        return 'Good evening';

      default:
        return 'Good night';
    }
  };
  return (
    <SafeAreaContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.greeting}>{getGreeting(hour)}</Text>
            <Text style={styles.title}>Where will you go?</Text>
          </View>

          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileText}>U</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>⌕</Text>

          <TextInput
            placeholder="Search destinations"
            placeholderTextColor={lightTheme.colors.textTertiary}
            style={styles.searchInput}
          />
        </View>

        <View style={styles.categories}>
          <TouchableOpacity
            style={styles.category}
            onPress={() => {
              nav.navigate('FlightBooking');
            }}
          >
            <View style={styles.categoryIcon}>
              <Text style={styles.categoryIconText}>✈</Text>
            </View>
            <Text style={styles.categoryText}>Flights</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.category}
            onPress={() => nav.navigate('HotelBooking')}
          >
            <View style={styles.categoryIcon}>
              <Text style={styles.categoryIconText}>⌂</Text>
            </View>
            <Text style={styles.categoryText}>Hotels</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.category}
            onPress={() => nav.navigate('BusBooking')}
          >
            <View style={styles.categoryIcon}>
              <Text style={styles.categoryIconText}>⛟</Text>
            </View>
            <Text style={styles.categoryText}>Bus</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.category}>
            <View style={styles.categoryIcon}>
              <Text style={styles.categoryIconText}>★</Text>
            </View>
            <Text style={styles.categoryText}>Activities</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular destinations</Text>

          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.destinationList}
        >
          <TouchableOpacity style={styles.destinationCard}>
            <View style={styles.destinationImage}>
              <Text style={styles.imagePlaceholder}>PARIS</Text>
            </View>

            <Text style={styles.destinationName}>Paris</Text>
            <Text style={styles.destinationCountry}>France</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.destinationCard}>
            <View style={styles.destinationImage}>
              <Text style={styles.imagePlaceholder}>DUBAI</Text>
            </View>

            <Text style={styles.destinationName}>Dubai</Text>
            <Text style={styles.destinationCountry}>UAE</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.destinationCard}>
            <View style={styles.destinationImage}>
              <Text style={styles.imagePlaceholder}>TOKYO</Text>
            </View>

            <Text style={styles.destinationName}>Tokyo</Text>
            <Text style={styles.destinationCountry}>Japan</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended for you</Text>

          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.recommendedCard}>
          <View style={styles.recommendedImage}>
            <Text style={styles.imagePlaceholder}>GOA</Text>
          </View>

          <View style={styles.recommendedContent}>
            <Text style={styles.recommendedTitle}>Weekend in Goa</Text>

            <Text style={styles.recommendedLocation}>Goa, India</Text>

            <View style={styles.recommendedBottom}>
              <Text style={styles.price}>₹8,999</Text>

              <Text style={styles.rating}>★ 4.8</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Explore experiences</Text>
        </View>

        <View style={styles.experienceGrid}>
          <TouchableOpacity style={styles.experienceCard}>
            <Text style={styles.experienceIcon}>🏔</Text>

            <Text style={styles.experienceTitle}>Adventure</Text>

            <Text style={styles.experienceSubtitle}>Explore the wild</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.experienceCard}>
            <Text style={styles.experienceIcon}>🍜</Text>

            <Text style={styles.experienceTitle}>Food & Culture</Text>

            <Text style={styles.experienceSubtitle}>Taste something new</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.colors.background,
  },

  content: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 110,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: lightTheme.spacing.xxl,
  },

  headerContent: {
    flex: 1,
  },

  greeting: {
    fontFamily: lightTheme.typography.fontFamily.regular,
    fontSize: lightTheme.typography.fontSize.sm,
    lineHeight:
      lightTheme.typography.fontSize.sm *
      lightTheme.typography.lineHeight.normal,
    color: lightTheme.colors.textSecondary,
    marginBottom: lightTheme.spacing.xs,
  },

  title: {
    fontFamily: lightTheme.typography.fontFamily.bold,
    fontSize: lightTheme.typography.fontSize.xxxl,
    lineHeight:
      lightTheme.typography.fontSize.xxxl *
      lightTheme.typography.lineHeight.tight,
    color: lightTheme.colors.primary,
  },

  profileButton: {
    width: 44,
    height: 44,
    borderRadius: lightTheme.radius.pill,
    backgroundColor: lightTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...lightTheme.shadow.small,
  },

  profileText: {
    fontFamily: lightTheme.typography.fontFamily.bold,
    fontSize: lightTheme.typography.fontSize.md,
    color: lightTheme.colors.textOnPrimary,
  },

  searchContainer: {
    height: 56,
    backgroundColor: lightTheme.colors.surface,
    borderRadius: lightTheme.radius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: lightTheme.spacing.lg,
    marginBottom: lightTheme.spacing.xxl,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    ...lightTheme.shadow.small,
  },

  searchIcon: {
    fontSize: lightTheme.typography.fontSize.xxl,
    color: lightTheme.colors.primary,
    marginRight: lightTheme.spacing.sm,
  },

  searchInput: {
    flex: 1,
    fontFamily: lightTheme.typography.fontFamily.regular,
    fontSize: lightTheme.typography.fontSize.md,
    color: lightTheme.colors.text,
    paddingVertical: 0,
  },

  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: lightTheme.spacing.xxxl,
  },

  category: {
    width: '23%',
    alignItems: 'center',
  },

  categoryIcon: {
    width: 54,
    height: 54,
    borderRadius: lightTheme.radius.lg,
    backgroundColor: lightTheme.colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: lightTheme.spacing.sm,
  },

  categoryIconText: {
    fontSize: lightTheme.typography.fontSize.xl,
    color: lightTheme.colors.primary,
  },

  categoryText: {
    fontFamily: lightTheme.typography.fontFamily.semiBold,
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.text,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: lightTheme.spacing.md,
  },

  sectionTitle: {
    fontFamily: lightTheme.typography.fontFamily.semiBold,
    fontSize: lightTheme.typography.fontSize.xl,
    lineHeight:
      lightTheme.typography.fontSize.xl *
      lightTheme.typography.lineHeight.tight,
    color: lightTheme.colors.text,
  },

  seeAll: {
    fontFamily: lightTheme.typography.fontFamily.semiBold,
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.primaryLight,
  },

  destinationList: {
    gap: lightTheme.spacing.md,
    paddingBottom: lightTheme.spacing.xxxl,
  },

  destinationCard: {
    width: 150,
  },

  destinationImage: {
    height: 180,
    borderRadius: lightTheme.radius.xl,
    backgroundColor: lightTheme.colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: lightTheme.spacing.sm,
  },

  imagePlaceholder: {
    fontFamily: lightTheme.typography.fontFamily.extraBold,
    fontSize: lightTheme.typography.fontSize.sm,
    letterSpacing: 2,
    color: lightTheme.colors.primary,
  },

  destinationName: {
    fontFamily: lightTheme.typography.fontFamily.bold,
    fontSize: lightTheme.typography.fontSize.md,
    color: lightTheme.colors.text,
  },

  destinationCountry: {
    fontFamily: lightTheme.typography.fontFamily.regular,
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.textSecondary,
    marginTop: lightTheme.spacing.xs,
  },

  recommendedCard: {
    backgroundColor: lightTheme.colors.surface,
    borderRadius: lightTheme.radius.xl,
    overflow: 'hidden',
    marginBottom: lightTheme.spacing.xxxl,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    ...lightTheme.shadow.small,
  },

  recommendedImage: {
    height: 180,
    backgroundColor: lightTheme.colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  recommendedContent: {
    padding: lightTheme.spacing.lg,
  },

  recommendedTitle: {
    fontFamily: lightTheme.typography.fontFamily.bold,
    fontSize: lightTheme.typography.fontSize.lg,
    color: lightTheme.colors.text,
  },

  recommendedLocation: {
    fontFamily: lightTheme.typography.fontFamily.regular,
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.textSecondary,
    marginTop: lightTheme.spacing.xs,
  },

  recommendedBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: lightTheme.spacing.md,
  },

  price: {
    fontFamily: lightTheme.typography.fontFamily.bold,
    fontSize: lightTheme.typography.fontSize.md,
    color: lightTheme.colors.primary,
  },

  rating: {
    fontFamily: lightTheme.typography.fontFamily.semiBold,
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.textSecondary,
  },

  experienceGrid: {
    flexDirection: 'row',
    gap: lightTheme.spacing.md,
  },

  experienceCard: {
    flex: 1,
    backgroundColor: lightTheme.colors.surfaceSecondary,
    borderRadius: lightTheme.radius.lg,
    padding: lightTheme.spacing.lg,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
  },

  experienceIcon: {
    fontSize: lightTheme.typography.fontSize.xxl,
    marginBottom: lightTheme.spacing.md,
  },

  experienceTitle: {
    fontFamily: lightTheme.typography.fontFamily.bold,
    fontSize: lightTheme.typography.fontSize.md,
    color: lightTheme.colors.text,
  },

  experienceSubtitle: {
    fontFamily: lightTheme.typography.fontFamily.regular,
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.textSecondary,
    marginTop: lightTheme.spacing.xs,
  },
});

export default HomeScreen;
