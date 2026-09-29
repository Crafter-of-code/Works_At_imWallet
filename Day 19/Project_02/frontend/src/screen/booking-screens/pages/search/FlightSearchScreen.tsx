import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { indianAirports, Airport } from '../../Data/indianAirport.ts';
import QuantitySelector from '../../components/QuantitySelector';
import SafeAreaContainer from '../../../../component/SafeAreaContainer';
import SolidButton from '../../../../component/SolidButton';
import CustomCalenderProvider from '../../../../component/CustomCalenderProvider';
import lightTheme from '../../../../theme/lightTheme';
import { TripType } from '../../interfaces/FlightBookingInterfaces';
import OfferCarousel from '../../../../component/OfferCarousel';
import { Offer } from '../../../../types/OfferCrouselType';
import BottomSheet from '../../../../component/BottomSheet';
enum travellerClass {
  PREMIUM = 'Premium',
  ECONOMY = 'Economy',
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
];
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
{
  /* main function start here */
}
function FlightSearchScreen(): React.ReactElement {
  {
    /* this is the airport selector function */
  }
  function AirportSelector({
    label,
    airport,
  }: AirportSelectorProps): React.ReactElement {
    const handlePress = () => {
      setAirportSelectorType(label.toLowerCase() as 'from' | 'to');
      setAirportSearch('');
      setShowAirportSelector(true);
    };

    return (
      <Pressable style={styles.airportSelector} onPress={handlePress}>
        <Text style={styles.fieldLabel}>{label}</Text>

        <Text style={styles.airportCode}>{airport.code}</Text>

        <Text style={styles.airportCity}>{airport.city}</Text>
      </Pressable>
    );
  }
  const [tripType, setTripType] = useState<TripType>('oneWay');
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [showAirportSelector, setShowAirportSelector] =
    useState<boolean>(false);
  const [airportSelectorType, setAirportSelectorType] = useState<'from' | 'to'>(
    'from',
  );
  const [airportSearch, setAirportSearch] = useState('');
  const [from, setFrom] = useState<Airport>({
    code: 'DEL',
    city: 'delhi',
  });

  const [to, setTo] = useState<Airport>({
    code: 'PNQ',
    city: 'pune',
  });

  const [departureDate, setDepartureDate] = useState('Select you date');

  const [returnDate, setReturnDate] = useState('28 Sep 2026');

  const [passengers, setPassengers] = useState(1);
  const [showPassengerSelector, setShowPassengerSelector] = useState(false);
  const [travelClass, setTravelClass] = useState<travellerClass>(
    travellerClass.ECONOMY,
  );
  const [showTravelClassChanger, setShowTravelClassChanger] =
    React.useState<boolean>(false);
  const nav = useNavigation<any>();
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
    nav.navigate('FlightSelect', bookingData);
  };

  const handleTrendingRoute = (route: TrendingRoute) => {
    const cityNames: Record<string, string> = {
      DEL: 'New Delhi',
      BOM: 'Mumbai',
      DXB: 'Dubai',
      GOI: 'Goa',
      BLR: 'Bangalore',
    };
    setFrom({
      code: route.from,
      city: cityNames[route.from] ?? route.from,
    });
    setTo({
      code: route.to,
      city: cityNames[route.to] ?? route.to,
    });
  };

  const handleAirportSelect = (airport: Airport) => {
    if (airportSelectorType === 'from') {
      setFrom(airport);
    } else {
      setTo(airport);
    }

    setAirportSearch('');
    setShowAirportSelector(false);
  };
  const filteredAirports = indianAirports.filter(airport => {
    const search = airportSearch.toLowerCase().trim();

    if (!search) {
      return true;
    }

    return (
      airport.code.toLowerCase().includes(search) ||
      airport.city.toLowerCase().includes(search)
    );
  });
  return (
    <SafeAreaContainer>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.heading}>Search Your Flight</Text>

            <Text style={styles.subHeading}>
              Looking to travel, Search your desired flight
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

              <Pressable
                style={styles.detailSelector}
                onPress={() => setShowTravelClassChanger(true)}
              >
                <Text style={styles.fieldLabel}>Class</Text>

                <Text style={styles.detailValue}>{travelClass}</Text>
              </Pressable>
            </View>

            {/* Search Button */}
            <SolidButton title="Search Flights" onPress={handleSearchFlights} />
          </View>
          <OfferCarousel offers={flightOffers} />
          {/* search Routes */}
          <View style={styles.trendingSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Previous searches</Text>

              <Text style={styles.sectionSubtitle}>Your previous searches</Text>
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

        <BottomSheet
          isBottomSheetVisible={showAirportSelector}
          setBottomSheetVisible={setShowAirportSelector}
        >
          <View style={styles.airportSheet}>
            <View style={styles.airportSheetHeader}>
              <View>
                <Text style={styles.airportSheetTitle}>
                  Select{' '}
                  {airportSelectorType === 'from' ? 'Departure' : 'Destination'}
                </Text>

                <Text style={styles.airportSheetSubtitle}>
                  Choose an airport
                </Text>
              </View>

              <Pressable
                onPress={() => setShowAirportSelector(false)}
                style={styles.airportCloseButton}
              >
                <Text style={styles.airportCloseText}>×</Text>
              </Pressable>
            </View>

            <View style={styles.airportSearchContainer}>
              <Text style={styles.airportSearchIcon}>⌕</Text>

              <TextInput
                value={airportSearch}
                onChangeText={setAirportSearch}
                placeholder="Search city or airport code"
                placeholderTextColor={lightTheme.colors.textTertiary}
                style={styles.airportSearchInput}
                autoCapitalize="none"
              />
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              style={styles.airportList}
            >
              {filteredAirports.map(airport => {
                const isSelected =
                  airport.code ===
                  (airportSelectorType === 'from' ? from.code : to.code);

                return (
                  <Pressable
                    key={`${airport.code}-${airport.city}`}
                    onPress={() => handleAirportSelect(airport)}
                    style={[
                      styles.airportOption,
                      isSelected && styles.airportOptionSelected,
                    ]}
                  >
                    <View style={styles.airportOptionCodeContainer}>
                      <Text style={styles.airportOptionCode}>
                        {airport.code}
                      </Text>
                    </View>

                    <View style={styles.airportOptionContent}>
                      <Text style={styles.airportOptionCity}>
                        {airport.city}
                      </Text>

                      <Text style={styles.airportOptionLabel}>India</Text>
                    </View>

                    {isSelected && (
                      <Text style={styles.airportSelectedIcon}>✓</Text>
                    )}
                  </Pressable>
                );
              })}

              {filteredAirports.length === 0 && (
                <View style={styles.noAirportContainer}>
                  <Text style={styles.noAirportTitle}>No airport found</Text>

                  <Text style={styles.noAirportSubtitle}>
                    Try searching with another city or airport code
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </BottomSheet>
        <BottomSheet
          isBottomSheetVisible={showCalendar}
          setBottomSheetVisible={() => setShowCalendar(false)}
        >
          <View style={styles.calendarOverlay}>
            <CustomCalenderProvider
              setDate={setDepartureDate}
              setShowCalendar={setShowCalendar}
            />
          </View>
        </BottomSheet>
        <BottomSheet
          isBottomSheetVisible={showTravelClassChanger}
          setBottomSheetVisible={() => setShowTravelClassChanger(false)}
        >
          <View style={styles.travelClassContainer}>
            <Text style={styles.travelClassTitle}>Select Travel Class</Text>

            <Pressable
              style={[
                styles.travelClassOption,
                travelClass === travellerClass.PREMIUM &&
                  styles.travelClassOptionActive,
              ]}
              onPress={() => {
                setTravelClass(travellerClass.PREMIUM);
                setShowTravelClassChanger(false);
              }}
            >
              <View>
                <Text
                  style={[
                    styles.travelClassText,
                    travelClass === travellerClass.PREMIUM &&
                      styles.travelClassTextActive,
                  ]}
                >
                  {travellerClass.PREMIUM}
                </Text>

                <Text style={styles.travelClassDescription}>
                  Extra comfort & more space
                </Text>
              </View>

              <View
                style={[
                  styles.radioOuter,
                  travelClass === travellerClass.PREMIUM &&
                    styles.radioOuterActive,
                ]}
              >
                {travelClass === travellerClass.PREMIUM && (
                  <View style={styles.radioInner} />
                )}
              </View>
            </Pressable>

            <Pressable
              style={[
                styles.travelClassOption,
                travelClass === travellerClass.ECONOMY &&
                  styles.travelClassOptionActive,
              ]}
              onPress={() => {
                setTravelClass(travellerClass.ECONOMY);
                setShowTravelClassChanger(false);
              }}
            >
              <View>
                <Text
                  style={[
                    styles.travelClassText,
                    travelClass === travellerClass.ECONOMY &&
                      styles.travelClassTextActive,
                  ]}
                >
                  {travellerClass.ECONOMY}
                </Text>

                <Text style={styles.travelClassDescription}>
                  Affordable & comfortable
                </Text>
              </View>

              <View
                style={[
                  styles.radioOuter,
                  travelClass === travellerClass.ECONOMY &&
                    styles.radioOuterActive,
                ]}
              >
                {travelClass === travellerClass.ECONOMY && (
                  <View style={styles.radioInner} />
                )}
              </View>
            </Pressable>
          </View>
        </BottomSheet>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  airportSheet: {
    paddingBottom: lightTheme.spacing.lg,
  },

  airportSheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: lightTheme.spacing.lg,
  },

  airportSheetTitle: {
    fontSize: lightTheme.typography.fontSize.xl,
    color: lightTheme.colors.text,
    fontFamily: lightTheme.typography.fontFamily.bold,
  },

  airportSheetSubtitle: {
    marginTop: lightTheme.spacing.xs,
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.textSecondary,
    fontFamily: lightTheme.typography.fontFamily.regular,
  },

  airportCloseButton: {
    width: 36,
    height: 36,
    borderRadius: lightTheme.radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightTheme.colors.surfaceSecondary,
  },

  airportCloseText: {
    fontSize: 26,
    lineHeight: 28,
    color: lightTheme.colors.textSecondary,
    fontFamily: lightTheme.typography.fontFamily.medium,
    marginTop: 5,
  },

  airportSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    borderRadius: lightTheme.radius.md,
    backgroundColor: lightTheme.colors.surfaceSecondary,
    paddingHorizontal: lightTheme.spacing.md,
    marginBottom: lightTheme.spacing.md,
  },

  airportSearchIcon: {
    fontSize: 22,
    color: lightTheme.colors.textSecondary,
    marginRight: lightTheme.spacing.sm,
  },

  airportSearchInput: {
    flex: 1,
    height: 48,
    fontSize: lightTheme.typography.fontSize.md,
    color: lightTheme.colors.text,
    fontFamily: lightTheme.typography.fontFamily.regular,
  },

  airportList: {
    maxHeight: 505,
  },

  airportOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: lightTheme.spacing.md,
    paddingHorizontal: lightTheme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: lightTheme.colors.divider,
  },

  airportOptionSelected: {
    backgroundColor: lightTheme.colors.surfaceSecondary,
    borderRadius: lightTheme.radius.md,
  },

  airportOptionCodeContainer: {
    width: 58,
    height: 42,
    borderRadius: lightTheme.radius.sm,
    backgroundColor: lightTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: lightTheme.spacing.md,
  },

  airportOptionCode: {
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.textOnPrimary,
    fontFamily: lightTheme.typography.fontFamily.bold,
  },

  airportOptionContent: {
    flex: 1,
  },

  airportOptionCity: {
    fontSize: lightTheme.typography.fontSize.md,
    color: lightTheme.colors.text,
    fontFamily: lightTheme.typography.fontFamily.semiBold,
  },

  airportOptionLabel: {
    marginTop: lightTheme.spacing.xs,
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.textTertiary,
    fontFamily: lightTheme.typography.fontFamily.regular,
  },

  airportSelectedIcon: {
    fontSize: lightTheme.typography.fontSize.lg,
    color: lightTheme.colors.primary,
    fontFamily: lightTheme.typography.fontFamily.bold,
  },

  noAirportContainer: {
    alignItems: 'center',
    paddingVertical: lightTheme.spacing.xxxl,
  },

  noAirportTitle: {
    fontSize: lightTheme.typography.fontSize.md,
    color: lightTheme.colors.text,
    fontFamily: lightTheme.typography.fontFamily.semiBold,
  },

  noAirportSubtitle: {
    marginTop: lightTheme.spacing.xs,
    textAlign: 'center',
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.textSecondary,
    fontFamily: lightTheme.typography.fontFamily.regular,
  },
  travelClassContainer: {
    // paddingHorizontal: 20,
    // paddingTop: 6,
    // paddingBottom: 20,
  },

  travelClassTitle: {
    fontSize: 18,
    fontFamily: lightTheme.typography.fontFamily.bold,
    color: lightTheme.colors.text,
    marginBottom: 14,
  },

  travelClassOption: {
    minHeight: 72,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 10,
    borderRadius: 16,
    backgroundColor: lightTheme.colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  travelClassOptionActive: {
    backgroundColor: '#EEF3EF',
    borderColor: lightTheme.colors.primary,
  },

  travelClassText: {
    fontSize: 15,
    fontFamily: lightTheme.typography.fontFamily.semiBold,
    color: lightTheme.colors.text,
    marginBottom: 4,
  },

  travelClassTextActive: {
    color: lightTheme.colors.primary,
  },

  travelClassDescription: {
    fontSize: 12,
    fontFamily: lightTheme.typography.fontFamily.regular,
    color: lightTheme.colors.textSecondary,
  },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: lightTheme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: lightTheme.colors.primary,
  },
  radioInner: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: lightTheme.colors.primary,
  },
});
export default FlightSearchScreen;
