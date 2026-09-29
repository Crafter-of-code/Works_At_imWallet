import React, { useState } from 'react';

import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import SafeAreaContainer from '../../../component/SafeAreaContainer';
import SolidButton from '../../../component/SolidButton';
import CustomCalenderProvider from '../../../component/CustomCalenderProvider';

import lightTheme from '../../../theme/lightTheme';

import LocationSelectorProps, {
  Location,
  TrendingBusRoute,
  TripTypeButtonProps,
} from '../interfaces/BusBookingInterfaces';

type TripType = 'oneWay' | 'roundTrip';

const trendingRoutes: TrendingBusRoute[] = [
  {
    id: '1',
    from: {
      code: 'DEL',
      city: 'New Delhi',
    },
    to: {
      code: 'JAI',
      city: 'Jaipur',
    },
    price: '₹599',
    duration: '5h 30m',
    buses: '80+ buses',
    busType: 'AC Sleeper',
  },
  {
    id: '2',
    from: {
      code: 'DEL',
      city: 'New Delhi',
    },
    to: {
      code: 'LKO',
      city: 'Lucknow',
    },
    price: '₹799',
    duration: '8h 15m',
    buses: '60+ buses',
    busType: 'AC Seater',
  },
  {
    id: '3',
    from: {
      code: 'MUM',
      city: 'Mumbai',
    },
    to: {
      code: 'GOI',
      city: 'Goa',
    },
    price: '₹999',
    duration: '12h 30m',
    buses: '45+ buses',
    busType: 'AC Sleeper',
  },
  {
    id: '4',
    from: {
      code: 'BLR',
      city: 'Bangalore',
    },
    to: {
      code: 'HYD',
      city: 'Hyderabad',
    },
    price: '₹699',
    duration: '8h 45m',
    buses: '70+ buses',
    busType: 'Volvo AC',
  },
];

const BusBookingScreen = (): React.ReactElement => {
  const [tripType, setTripType] = useState<TripType>('oneWay');

  const [from, setFrom] = useState<Location>({
    code: 'DEL',
    city: 'New Delhi',
  });

  const [to, setTo] = useState<Location>({
    code: 'JAI',
    city: 'Jaipur',
  });

  const [travelDate, setTravelDate] = useState('Select Travel Date');

  const [returnDate, setReturnDate] = useState('Select Return Date');

  const [passengers, setPassengers] = useState(1);

  const [busType, setBusType] = useState('AC');

  const [showTravelCalendar, setShowTravelCalendar] = useState(false);

  const [showReturnCalendar, setShowReturnCalendar] = useState(false);

  const swapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSearchBuses = () => {
    console.log({
      tripType,
      from,
      to,
      travelDate,
      returnDate: tripType === 'roundTrip' ? returnDate : null,
      passengers,
      busType,
    });
  };

  const handleTrendingRoute = (route: TrendingBusRoute) => {
    setFrom(route.from);
    setTo(route.to);
  };

  return (
    <SafeAreaContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.greeting}>Good Morning</Text>

            <Text style={styles.heading}>Where will you go?</Text>
          </View>

          <Pressable style={styles.profileButton}>
            <Text style={styles.profileText}>U</Text>
          </Pressable>
        </View>

        <View style={styles.searchCard}>
          <Text style={styles.searchTitle}>Search Buses</Text>

          <View style={styles.tripTypeContainer}>
            <TripTypeButton
              title="One Way"
              active={tripType === 'oneWay'}
              onPress={() => setTripType('oneWay')}
            />

            <TripTypeButton
              title="Round Trip"
              active={tripType === 'roundTrip'}
              onPress={() => setTripType('roundTrip')}
            />
          </View>

          <View style={styles.routeContainer}>
            <LocationSelector label="From" location={from} onPress={() => {}} />

            <Pressable onPress={swapLocations} style={styles.swapButton}>
              <Text style={styles.swapIcon}>⇄</Text>
            </Pressable>

            <LocationSelector label="To" location={to} onPress={() => {}} />
          </View>

          <View style={styles.divider} />

          <View style={styles.detailsRow}>
            <DateSelector
              label="Travel Date"
              value={travelDate}
              onPress={() => setShowTravelCalendar(true)}
            />

            {tripType === 'roundTrip' && (
              <DateSelector
                label="Return Date"
                value={returnDate}
                onPress={() => setShowReturnCalendar(true)}
              />
            )}
          </View>

          <View style={styles.divider} />

          <View style={styles.detailsRow}>
            <SelectorItem
              label="Passengers"
              value={`${passengers} Passenger${passengers > 1 ? 's' : ''}`}
              onPress={() => setPassengers(passengers + 1)}
            />

            <SelectorItem label="Bus Type" value={busType} onPress={() => {}} />
          </View>
          <View style={{ marginTop: 10 }}>
            <SolidButton title="Search Buses" onPress={handleSearchBuses} />
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Services</Text>
        </View>

        <View style={styles.servicesContainer}>
          <ServiceItem icon="Bus" title="Buses" />

          <ServiceItem icon="✈" title="Flights" />

          <ServiceItem icon="⌂" title="Hotels" />

          <ServiceItem icon="Car" title="Cabs" />
        </View>

        <View style={styles.trendingHeader}>
          <View style={styles.trendingTitleContainer}>
            <Text style={styles.sectionTitle}>Trending Routes</Text>

            <Text style={styles.sectionSubtitle}>
              Popular bus routes travelers love
            </Text>
          </View>

          <Pressable>
            <Text style={styles.viewAll}>View All</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.routesContainer}
        >
          {trendingRoutes.map(route => (
            <TrendingBusRouteCard
              key={route.id}
              route={route}
              onPress={() => handleTrendingRoute(route)}
            />
          ))}
        </ScrollView>
      </ScrollView>

      {/* Travel Date Calendar */}
      <Modal
        visible={showTravelCalendar}
        transparent
        animationType="fade"
        onRequestClose={() => setShowTravelCalendar(false)}
      >
        <Pressable
          style={styles.calendarOverlay}
          onPress={() => setShowTravelCalendar(false)}
        >
          <Pressable onPress={event => event.stopPropagation()}>
            <CustomCalenderProvider
              setDate={setTravelDate}
              setShowCalendar={setShowTravelCalendar}
            />
          </Pressable>
        </Pressable>
      </Modal>

      {/* Return Date Calendar */}
      <Modal
        visible={showReturnCalendar}
        transparent
        animationType="fade"
        onRequestClose={() => setShowReturnCalendar(false)}
      >
        <Pressable
          style={styles.calendarOverlay}
          onPress={() => setShowReturnCalendar(false)}
        >
          <Pressable onPress={event => event.stopPropagation()}>
            <CustomCalenderProvider
              setDate={setReturnDate}
              setShowCalendar={setShowReturnCalendar}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaContainer>
  );
};

const TripTypeButton = ({ title, active, onPress }: TripTypeButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.tripTypeButton, active && styles.tripTypeButtonActive]}
    >
      <Text style={[styles.tripTypeText, active && styles.tripTypeTextActive]}>
        {title}
      </Text>
    </Pressable>
  );
};

const LocationSelector = ({
  label,
  location,
  onPress,
}: LocationSelectorProps) => {
  return (
    <Pressable onPress={onPress} style={styles.locationSelector}>
      <Text style={styles.inputLabel}>{label}</Text>

      <Text style={styles.locationCode}>{location.code}</Text>

      <Text style={styles.cityName}>{location.city}</Text>
    </Pressable>
  );
};

interface DateSelectorProps {
  label: string;
  value: string;
  onPress: () => void;
}

const DateSelector = ({ label, value, onPress }: DateSelectorProps) => {
  return (
    <Pressable onPress={onPress} style={styles.selector}>
      <Text style={styles.inputLabel}>{label}</Text>

      <Text style={styles.selectorValue}>{value}</Text>
    </Pressable>
  );
};

interface SelectorItemProps {
  label: string;
  value: string;
  onPress: () => void;
}

const SelectorItem = ({ label, value, onPress }: SelectorItemProps) => {
  return (
    <Pressable onPress={onPress} style={styles.selector}>
      <Text style={styles.inputLabel}>{label}</Text>

      <Text style={styles.selectorValue}>{value}</Text>
    </Pressable>
  );
};

interface ServiceItemProps {
  icon: string;
  title: string;
}

const ServiceItem = ({ icon, title }: ServiceItemProps) => {
  return (
    <Pressable style={styles.serviceItem}>
      <View style={styles.serviceIconContainer}>
        <Text style={styles.serviceIcon}>{icon}</Text>
      </View>

      <Text style={styles.serviceTitle}>{title}</Text>
    </Pressable>
  );
};

interface TrendingBusRouteCardProps {
  route: TrendingBusRoute;
  onPress: () => void;
}

const TrendingBusRouteCard = ({
  route,
  onPress,
}: TrendingBusRouteCardProps) => {
  return (
    <Pressable onPress={onPress} style={styles.routeCard}>
      <View style={styles.routeCardHeader}>
        <View style={styles.popularBadge}>
          <Text style={styles.popularBadgeText}>POPULAR</Text>
        </View>

        <Text style={styles.routeArrow}>→</Text>
      </View>

      <View style={styles.routeCodes}>
        <View>
          <Text style={styles.routeCode}>{route.from.code}</Text>

          <Text style={styles.routeCity}>{route.from.city}</Text>
        </View>

        <View style={styles.routeLine}>
          <View style={styles.line} />

          <Text style={styles.busIcon}>Bus</Text>

          <View style={styles.line} />
        </View>

        <View style={styles.destination}>
          <Text style={styles.routeCode}>{route.to.code}</Text>

          <Text style={styles.routeCity}>{route.to.city}</Text>
        </View>
      </View>

      <View style={styles.routeInfo}>
        <View>
          <Text style={styles.routeInfoLabel}>Duration</Text>

          <Text style={styles.routeInfoText}>{route.duration}</Text>
        </View>

        <View style={styles.routeInfoRight}>
          <Text style={styles.routeInfoLabel}>Available</Text>

          <Text style={styles.routeInfoText}>{route.buses}</Text>
        </View>
      </View>

      <View style={styles.busTypeContainer}>
        <Text style={styles.busTypeText}>{route.busType}</Text>
      </View>

      <View style={styles.routeCardFooter}>
        <View>
          <Text style={styles.priceLabel}>Starting from</Text>

          <Text style={styles.price}>{route.price}</Text>
        </View>

        <View style={styles.viewBusButton}>
          <Text style={styles.viewBusText}>View Buses</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: lightTheme.spacing.section,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: lightTheme.spacing.md,
    paddingBottom: lightTheme.spacing.xxl,
  },

  headerTextContainer: {
    flex: 1,
  },

  greeting: {
    fontSize: lightTheme.typography.fontSize.md,
    lineHeight:
      lightTheme.typography.fontSize.md *
      lightTheme.typography.lineHeight.normal,
    color: lightTheme.colors.textSecondary,
    fontFamily: lightTheme.typography.fontFamily.regular,
  },

  heading: {
    marginTop: lightTheme.spacing.xs,
    fontSize: lightTheme.typography.fontSize.xxxl,
    lineHeight:
      lightTheme.typography.fontSize.xxxl *
      lightTheme.typography.lineHeight.tight,
    color: lightTheme.colors.text,
    fontFamily: lightTheme.typography.fontFamily.bold,
  },

  profileButton: {
    width: 46,
    height: 46,
    borderRadius: lightTheme.radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightTheme.colors.primary,
  },

  profileText: {
    fontSize: lightTheme.typography.fontSize.lg,
    color: lightTheme.colors.textOnPrimary,
    fontFamily: lightTheme.typography.fontFamily.bold,
  },

  searchCard: {
    padding: lightTheme.spacing.lg,
    borderRadius: lightTheme.radius.xl,
    backgroundColor: lightTheme.colors.surface,
    ...lightTheme.shadow.medium,
  },

  searchTitle: {
    marginBottom: lightTheme.spacing.lg,
    fontSize: lightTheme.typography.fontSize.xl,
    color: lightTheme.colors.text,
    fontFamily: lightTheme.typography.fontFamily.bold,
  },

  tripTypeContainer: {
    flexDirection: 'row',
    padding: lightTheme.spacing.xs,
    borderRadius: lightTheme.radius.md,
    backgroundColor: lightTheme.colors.surfaceSecondary,
  },

  tripTypeButton: {
    flex: 1,
    paddingVertical: lightTheme.spacing.md,
    borderRadius: lightTheme.radius.sm,
    alignItems: 'center',
  },

  tripTypeButtonActive: {
    backgroundColor: lightTheme.colors.primary,
  },

  tripTypeText: {
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.textSecondary,
    fontFamily: lightTheme.typography.fontFamily.medium,
  },

  tripTypeTextActive: {
    color: lightTheme.colors.textOnPrimary,
    fontFamily: lightTheme.typography.fontFamily.semiBold,
  },

  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: lightTheme.spacing.xl,
  },

  locationSelector: {
    flex: 1,
  },

  inputLabel: {
    marginBottom: lightTheme.spacing.xs,
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.textSecondary,
    fontFamily: lightTheme.typography.fontFamily.medium,
  },

  locationCode: {
    fontSize: lightTheme.typography.fontSize.xxl,
    color: lightTheme.colors.text,
    fontFamily: lightTheme.typography.fontFamily.bold,
  },

  cityName: {
    marginTop: lightTheme.spacing.xs,
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.textSecondary,
    fontFamily: lightTheme.typography.fontFamily.regular,
  },

  swapButton: {
    width: 42,
    height: 42,
    marginHorizontal: lightTheme.spacing.sm,
    borderRadius: lightTheme.radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightTheme.colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
  },

  swapIcon: {
    fontSize: lightTheme.typography.fontSize.xl,
    color: lightTheme.colors.primary,
    fontFamily: lightTheme.typography.fontFamily.bold,
  },

  divider: {
    height: 1,
    marginVertical: lightTheme.spacing.lg,
    backgroundColor: lightTheme.colors.divider,
  },

  detailsRow: {
    flexDirection: 'row',
    gap: lightTheme.spacing.xl,
  },

  selector: {
    flex: 1,
  },

  selectorValue: {
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.text,
    fontFamily: lightTheme.typography.fontFamily.semiBold,
  },

  sectionHeader: {
    marginTop: lightTheme.spacing.xxxl,
    marginBottom: lightTheme.spacing.lg,
  },

  sectionTitle: {
    fontSize: lightTheme.typography.fontSize.xl,
    color: lightTheme.colors.text,
    fontFamily: lightTheme.typography.fontFamily.bold,
  },

  servicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  serviceItem: {
    alignItems: 'center',
  },

  serviceIconContainer: {
    width: 58,
    height: 58,
    borderRadius: lightTheme.radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightTheme.colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
  },

  serviceIcon: {
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.primary,
    fontFamily: lightTheme.typography.fontFamily.bold,
  },

  serviceTitle: {
    marginTop: lightTheme.spacing.sm,
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.text,
    fontFamily: lightTheme.typography.fontFamily.medium,
  },

  trendingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: lightTheme.spacing.xxxl,
    marginBottom: lightTheme.spacing.lg,
  },

  trendingTitleContainer: {
    flex: 1,
  },

  sectionSubtitle: {
    marginTop: lightTheme.spacing.xs,
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.textSecondary,
    fontFamily: lightTheme.typography.fontFamily.regular,
  },

  viewAll: {
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.primary,
    fontFamily: lightTheme.typography.fontFamily.semiBold,
  },

  routesContainer: {
    gap: lightTheme.spacing.md,
    paddingRight: lightTheme.spacing.xl,
  },

  routeCard: {
    width: 300,
    padding: lightTheme.spacing.lg,
    borderRadius: lightTheme.radius.xl,
    backgroundColor: lightTheme.colors.surface,
    ...lightTheme.shadow.small,
  },

  routeCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  popularBadge: {
    paddingHorizontal: lightTheme.spacing.sm,
    paddingVertical: lightTheme.spacing.xs,
    borderRadius: lightTheme.radius.sm,
    backgroundColor: lightTheme.colors.secondaryLight,
  },

  popularBadgeText: {
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.primaryDark,
    fontFamily: lightTheme.typography.fontFamily.bold,
  },

  routeArrow: {
    fontSize: lightTheme.typography.fontSize.lg,
    color: lightTheme.colors.textSecondary,
    fontFamily: lightTheme.typography.fontFamily.medium,
  },

  routeCodes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: lightTheme.spacing.xl,
  },

  routeCode: {
    fontSize: lightTheme.typography.fontSize.xxl,
    color: lightTheme.colors.text,
    fontFamily: lightTheme.typography.fontFamily.bold,
  },

  routeCity: {
    marginTop: lightTheme.spacing.xs,
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.textSecondary,
    fontFamily: lightTheme.typography.fontFamily.regular,
  },

  routeLine: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: lightTheme.spacing.sm,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: lightTheme.colors.border,
  },

  busIcon: {
    marginHorizontal: lightTheme.spacing.xs,
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.primary,
    fontFamily: lightTheme.typography.fontFamily.bold,
  },

  destination: {
    alignItems: 'flex-end',
  },

  routeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: lightTheme.spacing.lg,
    paddingVertical: lightTheme.spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: lightTheme.colors.divider,
  },

  routeInfoLabel: {
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.textTertiary,
    fontFamily: lightTheme.typography.fontFamily.regular,
  },

  routeInfoText: {
    marginTop: lightTheme.spacing.xs,
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.text,
    fontFamily: lightTheme.typography.fontFamily.semiBold,
  },

  routeInfoRight: {
    alignItems: 'flex-end',
  },

  busTypeContainer: {
    alignSelf: 'flex-start',
    marginTop: lightTheme.spacing.md,
    paddingHorizontal: lightTheme.spacing.sm,
    paddingVertical: lightTheme.spacing.xs,
    borderRadius: lightTheme.radius.sm,
    backgroundColor: lightTheme.colors.surfaceSecondary,
  },

  busTypeText: {
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.primary,
    fontFamily: lightTheme.typography.fontFamily.medium,
  },

  routeCardFooter: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: lightTheme.spacing.lg,
  },

  priceLabel: {
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.textSecondary,
    fontFamily: lightTheme.typography.fontFamily.regular,
  },

  price: {
    marginTop: lightTheme.spacing.xs,
    fontSize: lightTheme.typography.fontSize.lg,
    color: lightTheme.colors.text,
    fontFamily: lightTheme.typography.fontFamily.bold,
  },

  viewBusButton: {
    paddingHorizontal: lightTheme.spacing.md,
    paddingVertical: lightTheme.spacing.sm,
    borderRadius: lightTheme.radius.sm,
    backgroundColor: lightTheme.colors.primary,
  },

  viewBusText: {
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.textOnPrimary,
    fontFamily: lightTheme.typography.fontFamily.semiBold,
  },

  calendarOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BusBookingScreen;
