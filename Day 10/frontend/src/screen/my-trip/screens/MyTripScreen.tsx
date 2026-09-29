import React from 'react';

import SafeAreaContainer from '../../../component/SafeAreaContainer';
import lightTheme from '../../../theme/lightTheme';

import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

type Trip = {
  id: string;
  destination: string;
  country: string;
  date: string;
  duration: string;
  status: 'Upcoming' | 'Completed';
  type: string;
  icon: string;
};

const trips: Trip[] = [
  {
    id: '1',
    destination: 'Manali',
    country: 'Himachal Pradesh, India',
    date: '18 Oct - 23 Oct, 2026',
    duration: '5 Nights',
    status: 'Upcoming',
    type: 'Mountain Escape',
    icon: '🏔️',
  },
  {
    id: '2',
    destination: 'Goa',
    country: 'Goa, India',
    date: '12 Aug - 16 Aug, 2026',
    duration: '4 Nights',
    status: 'Completed',
    type: 'Beach Trip',
    icon: '🏖️',
  },
  {
    id: '3',
    destination: 'Jaipur',
    country: 'Rajasthan, India',
    date: '21 Jun - 24 Jun, 2026',
    duration: '3 Nights',
    status: 'Completed',
    type: 'Cultural Trip',
    icon: '🏰',
  },
];

const MyTripScreen = (): React.ReactElement => {
  const upcomingTrip = trips.find(trip => trip.status === 'Upcoming');
  const nav = useNavigation<any>();
  const renderTrip = ({ item }: { item: Trip }) => (
    <TouchableOpacity activeOpacity={0.85} style={styles.tripCard}>
      <View style={styles.tripIconContainer}>
        <Text style={styles.tripIcon}>{item.icon}</Text>
      </View>

      <View style={styles.tripContent}>
        <View style={styles.tripTopRow}>
          <View style={styles.destinationContainer}>
            <Text style={styles.destination}>{item.destination}</Text>

            <Text style={styles.country}>{item.country}</Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              item.status === 'Upcoming'
                ? styles.upcomingBadge
                : styles.completedBadge,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                item.status === 'Upcoming'
                  ? styles.upcomingText
                  : styles.completedText,
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>

        <Text style={styles.tripType}>{item.type}</Text>

        <View style={styles.tripInfoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>📅</Text>
            <Text style={styles.infoText}>{item.date}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>🌙</Text>
            <Text style={styles.infoText}>{item.duration}</Text>
          </View>
        </View>

        {item.status === 'Upcoming' && (
          <TouchableOpacity style={styles.viewButton} activeOpacity={0.8}>
            <Text style={styles.viewButtonText}>View Trip</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaContainer>
      {/* <ScrollView> */}
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.heading}>My Trips</Text>

            <Text style={styles.subHeading}>
              Your journeys, all in one place
            </Text>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={0.8}
            onPress={() => nav.navigate('Home')}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {upcomingTrip && (
          <View style={styles.nextTripContainer}>
            <View style={styles.nextTripHeader}>
              <Text style={styles.nextTripLabel}>NEXT ADVENTURE</Text>

              <View style={styles.liveDot} />
            </View>

            <View style={styles.nextTripMain}>
              <View style={styles.nextTripDestinationContainer}>
                <Text style={styles.nextDestination}>
                  {upcomingTrip.destination}
                </Text>

                <Text style={styles.nextCountry}>{upcomingTrip.country}</Text>
              </View>

              <View style={styles.nextTripIconContainer}>
                <Text style={styles.nextTripIcon}>{upcomingTrip.icon}</Text>
              </View>
            </View>

            <View style={styles.nextTripDivider} />

            <View style={styles.nextTripDetails}>
              <View>
                <Text style={styles.detailLabel}>DEPARTURE</Text>

                <Text style={styles.detailValue}>18 Oct 2026</Text>
              </View>

              <View>
                <Text style={styles.detailLabel}>DURATION</Text>

                <Text style={styles.detailValue}>5 Nights</Text>
              </View>

              <TouchableOpacity
                style={styles.detailsButton}
                activeOpacity={0.8}
              >
                <Text style={styles.detailsButtonText}>Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>All Trips</Text>

          <Text style={styles.tripCount}>{trips.length} trips</Text>
        </View>

        <FlatList
          data={trips}
          keyExtractor={item => item.id}
          renderItem={renderTrip}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 140,
          }}
        />
      </View>
      {/* </ScrollView> */}
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingHorizontal: lightTheme.spacing.xl,
    // backgroundColor: lightTheme.colors.background,
    paddingBottom: 110,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: lightTheme.spacing.md,
    paddingBottom: lightTheme.spacing.xl,
  },

  heading: {
    fontFamily: lightTheme.typography.fontFamily.topHeading,
    fontSize: lightTheme.typography.fontSize.xxxl,
    color: lightTheme.colors.text,
    letterSpacing: -0.7,
  },

  subHeading: {
    marginTop: lightTheme.spacing.xs,
    fontFamily: lightTheme.typography.fontFamily.regular,
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.textSecondary,
  },

  addButton: {
    width: 44,
    height: 44,
    borderRadius: lightTheme.radius.md,
    backgroundColor: lightTheme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...lightTheme.shadow.small,
  },

  addButtonText: {
    fontFamily: lightTheme.typography.fontFamily.regular,
    fontSize: 28,
    color: lightTheme.colors.textOnPrimary,
    marginTop: -2,
  },

  nextTripContainer: {
    backgroundColor: lightTheme.colors.primary,
    borderRadius: lightTheme.radius.xl,
    padding: lightTheme.spacing.xl,
    marginBottom: lightTheme.spacing.xxl,
    ...lightTheme.shadow.medium,
  },

  nextTripHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  nextTripLabel: {
    fontFamily: lightTheme.typography.fontFamily.bold,
    fontSize: lightTheme.typography.fontSize.xs,
    letterSpacing: 1.2,
    color: lightTheme.colors.secondaryLight,
  },

  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: lightTheme.colors.secondary,
    marginLeft: lightTheme.spacing.sm,
  },

  nextTripMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: lightTheme.spacing.lg,
  },

  nextTripDestinationContainer: {
    flex: 1,
  },

  nextDestination: {
    fontFamily: lightTheme.typography.fontFamily.extraBold,
    fontSize: lightTheme.typography.fontSize.xxxl,
    color: lightTheme.colors.textOnPrimary,
    letterSpacing: -0.7,
  },

  nextCountry: {
    marginTop: lightTheme.spacing.xs,
    fontFamily: lightTheme.typography.fontFamily.regular,
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.secondaryLight,
  },

  nextTripIconContainer: {
    width: 64,
    height: 64,
    borderRadius: lightTheme.radius.lg,
    backgroundColor: lightTheme.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: lightTheme.spacing.md,
  },

  nextTripIcon: {
    fontSize: 34,
  },

  nextTripDivider: {
    height: 1,
    backgroundColor: lightTheme.colors.primaryLight,
    marginVertical: lightTheme.spacing.lg,
  },

  nextTripDetails: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  detailLabel: {
    fontFamily: lightTheme.typography.fontFamily.bold,
    fontSize: 9,
    letterSpacing: 0.8,
    color: lightTheme.colors.textTertiary,
  },

  detailValue: {
    marginTop: lightTheme.spacing.xs,
    fontFamily: lightTheme.typography.fontFamily.semiBold,
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.textOnPrimary,
  },

  detailsButton: {
    paddingHorizontal: lightTheme.spacing.md,
    paddingVertical: lightTheme.spacing.sm,
    borderRadius: lightTheme.radius.sm,
    backgroundColor: lightTheme.colors.secondary,
  },

  detailsButtonText: {
    fontFamily: lightTheme.typography.fontFamily.bold,
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.text,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: lightTheme.spacing.md,
  },

  sectionTitle: {
    fontFamily: lightTheme.typography.fontFamily.heading,
    fontSize: lightTheme.typography.fontSize.xl,
    color: lightTheme.colors.text,
  },

  tripCount: {
    fontFamily: lightTheme.typography.fontFamily.medium,
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.textTertiary,
  },

  listContent: {
    paddingBottom: lightTheme.spacing.xxxl,
  },

  tripCard: {
    flexDirection: 'row',
    backgroundColor: lightTheme.colors.surface,
    borderRadius: lightTheme.radius.lg,
    padding: lightTheme.spacing.md,
    marginBottom: lightTheme.spacing.md,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    ...lightTheme.shadow.small,
  },

  tripIconContainer: {
    width: 62,
    height: 62,
    borderRadius: lightTheme.radius.md,
    backgroundColor: lightTheme.colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tripIcon: {
    fontSize: 28,
  },

  tripContent: {
    flex: 1,
    marginLeft: lightTheme.spacing.md,
  },

  tripTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  destinationContainer: {
    flex: 1,
  },

  destination: {
    fontFamily: lightTheme.typography.fontFamily.semiBold,
    fontSize: lightTheme.typography.fontSize.lg,
    color: lightTheme.colors.text,
  },

  country: {
    marginTop: 2,
    fontFamily: lightTheme.typography.fontFamily.regular,
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.textSecondary,
  },

  statusBadge: {
    paddingHorizontal: lightTheme.spacing.sm,
    paddingVertical: 5,
    borderRadius: lightTheme.radius.sm,
    marginLeft: lightTheme.spacing.sm,
  },

  upcomingBadge: {
    backgroundColor: lightTheme.colors.secondaryLight,
  },

  completedBadge: {
    backgroundColor: lightTheme.colors.surfaceSecondary,
  },

  statusText: {
    fontFamily: lightTheme.typography.fontFamily.bold,
    fontSize: 9,
  },

  upcomingText: {
    color: lightTheme.colors.primary,
  },

  completedText: {
    color: lightTheme.colors.textSecondary,
  },

  tripType: {
    marginTop: lightTheme.spacing.sm,
    fontFamily: lightTheme.typography.fontFamily.medium,
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.textSecondary,
  },

  tripInfoRow: {
    flexDirection: 'row',
    marginTop: lightTheme.spacing.sm,
    gap: lightTheme.spacing.md,
  },

  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoIcon: {
    fontSize: 11,
    marginRight: lightTheme.spacing.xs,
  },

  infoText: {
    fontFamily: lightTheme.typography.fontFamily.regular,
    fontSize: 10,
    color: lightTheme.colors.textTertiary,
  },

  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: lightTheme.spacing.md,
  },

  viewButtonText: {
    fontFamily: lightTheme.typography.fontFamily.bold,
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.primary,
  },

  arrow: {
    marginLeft: lightTheme.spacing.xs,
    fontSize: 14,
    fontFamily: lightTheme.typography.fontFamily.bold,
    color: lightTheme.colors.primary,
  },
});

export default MyTripScreen;
