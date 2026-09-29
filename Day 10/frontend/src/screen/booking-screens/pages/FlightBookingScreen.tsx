import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import QuantitySelector from '../components/QuantitySelector';
import SafeAreaContainer from '../../../component/SafeAreaContainer';
import SolidButton from '../../../component/SolidButton';
import CustomCalenderProvider from '../../../component/CustomCalenderProvider';

import lightTheme from '../../../theme/lightTheme';
import { TripType } from '../interfaces/FlightBookingInterfaces';
import OfferCarousel from '../../../component/OfferCarousel';
import { Offer } from '../../../types/OfferCrouselType';

interface Airport {
  code: string;
  city: string;
}

interface TrendingRoute {
  from: string;
  to: string;
  price: string;
  duration: string;
  availability: string;
}

export interface TripTypeButtonProps {
  label: string;
  value: TripType;
  active: boolean;
  onPress: () => void;
}

function TripTypeButton({ label, active, onPress }: TripTypeButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.tripTypeButton, active && styles.tripTypeButtonActive]}
    >
      <Text style={[styles.tripTypeText, active && styles.tripTypeTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

interface AirportSelectorProps {
  label: string;
  airport: Airport;
}

function AirportSelector({ label, airport }: AirportSelectorProps) {
  return (
    <View style={styles.airportSelector}>
      <Text style={styles.fieldLabel}>{label}</Text>

      <Text style={styles.airportCode}>{airport.code}</Text>

      <Text style={styles.airportCity}>{airport.city}</Text>
    </View>
  );
}

interface DateSelectorProps {
  label: string;
  value: string;
  onPress: () => void;
}

function DateSelector({ label, value, onPress }: DateSelectorProps) {
  return (
    <Pressable onPress={onPress} style={styles.dateSelector}>
      <Text style={styles.fieldLabel}>{label}</Text>

      <Text style={styles.dateValue}>{value}</Text>
    </Pressable>
  );
}

const trendingRoutes: TrendingRoute[] = [
  {
    from: 'DEL',
    to: 'BOM',
    price: '₹4,999',
    duration: '2h 10m',
    availability: '120+',
  },
  {
    from: 'DEL',
    to: 'DXB',
    price: '₹18,499',
    duration: '3h 40m',
    availability: '80+',
  },
  {
    from: 'BOM',
    to: 'GOI',
    price: '₹3,499',
    duration: '1h 10m',
    availability: '100+',
  },
  {
    from: 'DEL',
    to: 'BLR',
    price: '₹5,299',
    duration: '2h 45m',
    availability: '90+',
  },
];

function FlightBookingScreen(): React.ReactElement {
  const [tripType, setTripType] = useState<TripType>('oneWay');
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  const [from, setFrom] = useState<Airport>({
    code: 'DEL',
    city: 'New Delhi',
  });

  const [to, setTo] = useState<Airport>({
    code: 'BOM',
    city: 'Mumbai',
  });

  const [departureDate, setDepartureDate] = useState('24 Sep 2026');

  const [returnDate, setReturnDate] = useState('28 Sep 2026');

  const [passengers, setPassengers] = useState(1);
  const [showPassengerSelector, setShowPassengerSelector] = useState(false);
  const [travelClass, setTravelClass] = useState('Economy');

  const swapAirports = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSearchFlights = () => {
    const bookingData = {
      tripType,
      from,
      to,
      departureDate,
      returnDate: tripType === 'roundTrip' ? returnDate : null,
      passengers,
      travelClass,
    };

    console.log('Flight booking:', bookingData);
  };

  const handleTrendingRoute = (route: TrendingRoute) => {
    const selectedFrom = trendingRoutes.find(item => item.from === route.from);

    const selectedTo = trendingRoutes.find(item => item.to === route.to);

    setFrom({
      code: route.from,
      city:
        route.from === 'DEL'
          ? 'New Delhi'
          : route.from === 'BOM'
          ? 'Mumbai'
          : route.from,
    });

    setTo({
      code: route.to,
      city:
        route.to === 'BOM'
          ? 'Mumbai'
          : route.to === 'DXB'
          ? 'Dubai'
          : route.to === 'GOI'
          ? 'Goa'
          : route.to === 'BLR'
          ? 'Bangalore'
          : route.to,
    });

    console.log('Selected trending route:', selectedFrom, selectedTo);
  };
  const flightOffers: Offer[] = [
    {
      id: 'flight-1',
      title: 'Flat ₹1,500 OFF',
      subtitle: 'On domestic flight bookings',
      couponCode: 'FLY1500',
      actionLabel: 'Book Now',
    },
    {
      id: 'flight-2',
      title: '10% OFF',
      subtitle: 'On international flights',
      couponCode: 'FLY10',
      actionLabel: 'Book Now',
    },
    {
      id: 'flight-3',
      title: '₹2,000 OFF',
      subtitle: 'On your first flight booking',
      couponCode: 'FIRSTFLY',
      actionLabel: 'Book Now',
    },
  ];
  return (
    <SafeAreaContainer>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.heading}>Book a Flight</Text>

            <Text style={styles.subHeading}>
              Find and book your perfect flight
            </Text>
          </View>

          {/* Search Card */}
          <View style={styles.searchCard}>
            {/* Trip Type */}
            <View style={styles.tripTypeContainer}>
              <TripTypeButton
                label="One Way"
                value="oneWay"
                active={tripType === 'oneWay'}
                onPress={() => setTripType('oneWay')}
              />

              <TripTypeButton
                label="Round Trip"
                value="roundTrip"
                active={tripType === 'roundTrip'}
                onPress={() => setTripType('roundTrip')}
              />

              <TripTypeButton
                label="Multi City"
                value="multiCity"
                active={tripType === 'multiCity'}
                onPress={() => setTripType('multiCity')}
              />
            </View>

            {/* Airports */}
            <View style={styles.airportRow}>
              <AirportSelector label="From" airport={from} />

              <Pressable onPress={swapAirports} style={styles.swapButton}>
                <Text style={styles.swapText}>⇄</Text>
              </Pressable>

              <AirportSelector label="To" airport={to} />
            </View>

            {/* Dates */}
            <View style={styles.detailsRow}>
              <DateSelector
                label="Departure"
                value={departureDate}
                onPress={() => setShowCalendar(true)}
              />

              {tripType === 'roundTrip' && (
                <DateSelector
                  label="Return"
                  value={returnDate}
                  onPress={() => {}}
                />
              )}
            </View>

            {/* Passengers & Class */}
            <View style={styles.detailsRow}>
              <View style={styles.detailSelector}>
                <Text style={styles.fieldLabel}>Passengers</Text>

                <QuantitySelector value={passengers} setValue={setPassengers} />
              </View>

              <View style={styles.detailSelector}>
                <Text style={styles.fieldLabel}>Class</Text>

                <Text style={styles.detailValue}>{travelClass}</Text>
              </View>
            </View>

            {/* Search Button */}
            <SolidButton title="Search Flights" onPress={handleSearchFlights} />
          </View>
          <OfferCarousel offers={flightOffers} />
          {/* Trending Routes */}
          <View style={styles.trendingSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Trending Routes</Text>

              <Text style={styles.sectionSubtitle}>Popular destinations</Text>
            </View>

            {trendingRoutes.map(route => (
              <Pressable
                key={`${route.from}-${route.to}`}
                onPress={() => handleTrendingRoute(route)}
                style={styles.routeCard}
              >
                <View style={styles.routeTopRow}>
                  <View>
                    <Text style={styles.routeCode}>{route.from}</Text>

                    <Text style={styles.routeLabel}>Departure</Text>
                  </View>

                  <View style={styles.routeLine}>
                    <View style={styles.routeDot} />

                    <View style={styles.routeDash} />

                    <Text style={styles.flightIcon}>✈</Text>

                    <View style={styles.routeDash} />

                    <View style={styles.routeDot} />
                  </View>

                  <View style={styles.destinationContainer}>
                    <Text style={styles.routeCode}>{route.to}</Text>

                    <Text style={styles.routeLabel}>Destination</Text>
                  </View>
                </View>

                <View style={styles.routeBottomRow}>
                  <Text style={styles.routeDuration}>{route.duration}</Text>

                  <Text style={styles.routeAvailability}>
                    {route.availability} seats
                  </Text>

                  <Text style={styles.routePrice}>{route.price}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
        {/* Calendar Modal */}
        <Modal
          visible={showCalendar}
          transparent
          animationType="fade"
          onRequestClose={() => setShowCalendar(false)}
        >
          <Pressable
            style={styles.calendarOverlay}
            onPress={() => setShowCalendar(false)}
          >
            <Pressable onPress={event => event.stopPropagation()}>
              <CustomCalenderProvider
                setDate={setDepartureDate}
                setShowCalendar={setShowCalendar}
              />
            </Pressable>
          </Pressable>
        </Modal>
      </View>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.colors.background,
  },

  scrollContent: {
    // padding: lightTheme.spacing.xl,
    paddingBottom: lightTheme.spacing.section,
  },

  header: {
    marginBottom: lightTheme.spacing.xl,
  },

  heading: {
    fontSize: lightTheme.typography.fontSize.xxxl,
    color: lightTheme.colors.text,
    fontFamily: lightTheme.typography.fontFamily.bold,
  },

  subHeading: {
    marginTop: lightTheme.spacing.xs,
    fontSize: lightTheme.typography.fontSize.md,
    color: lightTheme.colors.textSecondary,
    fontFamily: lightTheme.typography.fontFamily.regular,
  },

  searchCard: {
    padding: lightTheme.spacing.xl,
    borderRadius: lightTheme.radius.xl,
    backgroundColor: lightTheme.colors.surface,
    ...lightTheme.shadow.medium,
  },

  tripTypeContainer: {
    flexDirection: 'row',
    backgroundColor: lightTheme.colors.surfaceSecondary,
    borderRadius: lightTheme.radius.md,
    padding: lightTheme.spacing.xs,
    marginBottom: lightTheme.spacing.xl,
  },

  tripTypeButton: {
    flex: 1,
    paddingVertical: lightTheme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: lightTheme.radius.sm,
  },

  tripTypeButtonActive: {
    backgroundColor: lightTheme.colors.primary,
  },

  tripTypeText: {
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.textSecondary,
    fontFamily: lightTheme.typography.fontFamily.medium,
  },

  tripTypeTextActive: {
    color: lightTheme.colors.textOnPrimary,
    fontFamily: lightTheme.typography.fontFamily.bold,
  },

  airportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: lightTheme.spacing.lg,
  },

  airportSelector: {
    flex: 1,
    padding: lightTheme.spacing.md,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    borderRadius: lightTheme.radius.md,
  },

  fieldLabel: {
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.textSecondary,
    fontFamily: lightTheme.typography.fontFamily.medium,
    marginBottom: lightTheme.spacing.xs,
  },

  airportCode: {
    fontSize: lightTheme.typography.fontSize.xl,
    color: lightTheme.colors.text,
    fontFamily: lightTheme.typography.fontFamily.bold,
  },

  airportCity: {
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.textSecondary,
    fontFamily: lightTheme.typography.fontFamily.regular,
  },

  swapButton: {
    width: 40,
    height: 40,
    borderRadius: lightTheme.radius.pill,
    backgroundColor: lightTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: lightTheme.spacing.sm,
  },

  swapText: {
    fontSize: lightTheme.typography.fontSize.lg,
    color: lightTheme.colors.textOnPrimary,
    fontFamily: lightTheme.typography.fontFamily.bold,
  },

  detailsRow: {
    flexDirection: 'row',
    gap: lightTheme.spacing.md,
    marginBottom: lightTheme.spacing.md,
  },

  dateSelector: {
    flex: 1,
    padding: lightTheme.spacing.md,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    borderRadius: lightTheme.radius.md,
  },

  dateValue: {
    fontSize: lightTheme.typography.fontSize.md,
    color: lightTheme.colors.text,
    fontFamily: lightTheme.typography.fontFamily.semiBold,
  },

  detailSelector: {
    flex: 1,
    padding: lightTheme.spacing.md,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    borderRadius: lightTheme.radius.md,
  },

  detailValue: {
    fontSize: lightTheme.typography.fontSize.md,
    color: lightTheme.colors.text,
    fontFamily: lightTheme.typography.fontFamily.semiBold,
  },

  trendingSection: {
    marginTop: lightTheme.spacing.xxxl,
  },

  sectionHeader: {
    marginBottom: lightTheme.spacing.lg,
  },

  sectionTitle: {
    fontSize: lightTheme.typography.fontSize.xl,
    color: lightTheme.colors.text,
    fontFamily: lightTheme.typography.fontFamily.bold,
  },

  sectionSubtitle: {
    marginTop: lightTheme.spacing.xs,
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.textSecondary,
    fontFamily: lightTheme.typography.fontFamily.regular,
  },

  routeCard: {
    padding: lightTheme.spacing.lg,
    marginBottom: lightTheme.spacing.md,
    borderRadius: lightTheme.radius.lg,
    backgroundColor: lightTheme.colors.surface,
    ...lightTheme.shadow.small,
  },

  routeTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  routeCode: {
    fontSize: lightTheme.typography.fontSize.lg,
    color: lightTheme.colors.text,
    fontFamily: lightTheme.typography.fontFamily.bold,
  },

  routeLabel: {
    marginTop: lightTheme.spacing.xs,
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.textTertiary,
    fontFamily: lightTheme.typography.fontFamily.regular,
  },

  routeLine: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: lightTheme.spacing.md,
  },

  routeDot: {
    width: 7,
    height: 7,
    borderRadius: lightTheme.radius.pill,
    backgroundColor: lightTheme.colors.primary,
  },

  routeDash: {
    flex: 1,
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
  },

  flightIcon: {
    marginHorizontal: lightTheme.spacing.xs,
    fontSize: lightTheme.typography.fontSize.md,
    color: lightTheme.colors.primary,
  },

  destinationContainer: {
    alignItems: 'flex-end',
  },

  routeBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: lightTheme.spacing.lg,
    paddingTop: lightTheme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: lightTheme.colors.divider,
  },

  routeDuration: {
    flex: 1,
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.textSecondary,
    fontFamily: lightTheme.typography.fontFamily.medium,
  },

  routeAvailability: {
    flex: 1,
    textAlign: 'center',
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.textTertiary,
    fontFamily: lightTheme.typography.fontFamily.regular,
  },

  routePrice: {
    fontSize: lightTheme.typography.fontSize.md,
    color: lightTheme.colors.primary,
    fontFamily: lightTheme.typography.fontFamily.bold,
  },

  calendarOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FlightBookingScreen;
