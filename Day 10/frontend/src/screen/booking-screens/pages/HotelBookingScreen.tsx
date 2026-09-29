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

interface Destination {
  code: string;
  city: string;
  country: string;
}

interface TrendingDestination {
  id: string;
  destination: Destination;
  price: string;
  hotels: string;
  rating: string;
  category: string;
}

const trendingDestinations: TrendingDestination[] = [
  {
    id: '1',
    destination: {
      code: 'GOI',
      city: 'Goa',
      country: 'India',
    },
    price: '₹1,899',
    hotels: '450+ hotels',
    rating: '4.6',
    category: 'Beach Stay',
  },
  {
    id: '2',
    destination: {
      code: 'DXB',
      city: 'Dubai',
      country: 'UAE',
    },
    price: '₹4,999',
    hotels: '320+ hotels',
    rating: '4.7',
    category: 'Luxury Stay',
  },
  {
    id: '3',
    destination: {
      code: 'JAI',
      city: 'Jaipur',
      country: 'India',
    },
    price: '₹1,499',
    hotels: '280+ hotels',
    rating: '4.5',
    category: 'Heritage Stay',
  },
  {
    id: '4',
    destination: {
      code: 'BOM',
      city: 'Mumbai',
      country: 'India',
    },
    price: '₹2,299',
    hotels: '500+ hotels',
    rating: '4.4',
    category: 'City Stay',
  },
];

const HotelBookingScreen = (): React.ReactElement => {
  const [destination, setDestination] = useState<Destination>({
    code: 'GOI',
    city: 'Goa',
    country: 'India',
  });

  const [checkIn, setCheckIn] = useState('24 Sep 2026');

  const [checkOut, setCheckOut] = useState('28 Sep 2026');

  const [guests, setGuests] = useState(2);

  const [rooms, setRooms] = useState(1);

  const [roomType, setRoomType] = useState('Standard');

  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false);

  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false);

  const handleSearchHotels = () => {
    console.log({
      destination,
      checkIn,
      checkOut,
      guests,
      rooms,
      roomType,
    });
  };

  const handleTrendingDestination = (item: TrendingDestination) => {
    setDestination(item.destination);
  };

  return (
    <SafeAreaContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.greeting}>Find your perfect stay</Text>

            <Text style={styles.heading}>Where will you stay?</Text>
          </View>

          <Pressable style={styles.profileButton}>
            <Text style={styles.profileText}>U</Text>
          </Pressable>
        </View>

        <View style={styles.searchCard}>
          <Text style={styles.searchTitle}>Search Hotels</Text>

          <DestinationSelector destination={destination} onPress={() => {}} />

          <View style={styles.divider} />

          <View style={styles.detailsRow}>
            <DateSelector
              label="Check-in"
              value={checkIn}
              onPress={() => setShowCheckInCalendar(true)}
            />

            <DateSelector
              label="Check-out"
              value={checkOut}
              onPress={() => setShowCheckOutCalendar(true)}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.detailsRow}>
            <SelectorItem
              label="Guests"
              value={`${guests} Guest${guests > 1 ? 's' : ''}`}
              onPress={() => setGuests(guests + 1)}
            />

            <SelectorItem
              label="Rooms"
              value={`${rooms} Room${rooms > 1 ? 's' : ''}`}
              onPress={() => setRooms(rooms + 1)}
            />
          </View>

          <View style={styles.divider} />

          <SelectorItem label="Room Type" value={roomType} onPress={() => {}} />

          <View style={{ marginTop: 10 }}>
            <SolidButton title="Search Hotels" onPress={handleSearchHotels} />
          </View>
        </View>
        {/**
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Services</Text>
        </View>

        <View style={styles.servicesContainer}>
          <ServiceItem icon="Hotel" title="Hotels" />

          <ServiceItem icon="Bus" title="Buses" />

          <ServiceItem icon="✈" title="Flights" />

          <ServiceItem icon="Car" title="Cabs" />
        </View>
        */}

        <View style={styles.trendingHeader}>
          <View style={styles.trendingTitleContainer}>
            <Text style={styles.sectionTitle}>Trending Destinations</Text>

            <Text style={styles.sectionSubtitle}>
              Popular places travelers love
            </Text>
          </View>

          <Pressable>
            <Text style={styles.viewAll}>View All</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.destinationsContainer}
        >
          {trendingDestinations.map(item => (
            <TrendingDestinationCard
              key={item.id}
              item={item}
              onPress={() => handleTrendingDestination(item)}
            />
          ))}
        </ScrollView>
      </ScrollView>

      {/* Check-in Calendar */}
      <Modal
        visible={showCheckInCalendar}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCheckInCalendar(false)}
      >
        <Pressable
          style={styles.calendarOverlay}
          onPress={() => setShowCheckInCalendar(false)}
        >
          <Pressable onPress={event => event.stopPropagation()}>
            <CustomCalenderProvider
              setDate={setCheckIn}
              setShowCalendar={setShowCheckInCalendar}
            />
          </Pressable>
        </Pressable>
      </Modal>

      {/* Check-out Calendar */}
      <Modal
        visible={showCheckOutCalendar}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCheckOutCalendar(false)}
      >
        <Pressable
          style={styles.calendarOverlay}
          onPress={() => setShowCheckOutCalendar(false)}
        >
          <Pressable onPress={event => event.stopPropagation()}>
            <CustomCalenderProvider
              setDate={setCheckOut}
              setShowCalendar={setShowCheckOutCalendar}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaContainer>
  );
};

interface DestinationSelectorProps {
  destination: Destination;
  onPress: () => void;
}

const DestinationSelector = ({
  destination,
  onPress,
}: DestinationSelectorProps) => {
  return (
    <Pressable onPress={onPress} style={styles.destinationSelector}>
      <View style={styles.destinationIconContainer}>
        <Text style={styles.destinationIcon}>Hotel</Text>
      </View>

      <View style={styles.destinationContent}>
        <Text style={styles.inputLabel}>Destination</Text>

        <Text style={styles.destinationCity}>{destination.city}</Text>

        <Text style={styles.destinationCountry}>{destination.country}</Text>
      </View>

      <Text style={styles.chevron}>›</Text>
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

interface TrendingDestinationCardProps {
  item: TrendingDestination;
  onPress: () => void;
}

const TrendingDestinationCard = ({
  item,
  onPress,
}: TrendingDestinationCardProps) => {
  return (
    <Pressable onPress={onPress} style={styles.destinationCard}>
      <View style={styles.destinationCardHeader}>
        <View style={styles.popularBadge}>
          <Text style={styles.popularBadgeText}>TRENDING</Text>
        </View>

        <Text style={styles.cardArrow}>→</Text>
      </View>

      <View style={styles.destinationCardBody}>
        <Text style={styles.destinationCode}>{item.destination.code}</Text>

        <Text style={styles.destinationName}>{item.destination.city}</Text>

        <Text style={styles.destinationCountryText}>
          {item.destination.country}
        </Text>
      </View>

      <View style={styles.cardInfo}>
        <View>
          <Text style={styles.infoLabel}>Hotels</Text>

          <Text style={styles.infoValue}>{item.hotels}</Text>
        </View>

        <View style={styles.ratingContainer}>
          <Text style={styles.infoLabel}>Rating</Text>

          <Text style={styles.ratingValue}>★ {item.rating}</Text>
        </View>
      </View>

      <View style={styles.categoryContainer}>
        <Text style={styles.categoryText}>{item.category}</Text>
      </View>

      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.priceLabel}>Starting from</Text>

          <Text style={styles.price}>{item.price}</Text>

          <Text style={styles.perNight}>per night</Text>
        </View>

        <View style={styles.viewHotelsButton}>
          <Text style={styles.viewHotelsText}>View Hotels</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: lightTheme.spacing.section,
    backgroundColor: lightTheme.colors.background,
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

  destinationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 66,
    paddingVertical: lightTheme.spacing.sm,
  },

  destinationIconContainer: {
    width: 46,
    height: 46,
    marginRight: lightTheme.spacing.md,
    borderRadius: lightTheme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightTheme.colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
  },

  destinationIcon: {
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.primary,
    fontFamily: lightTheme.typography.fontFamily.bold,
  },

  destinationContent: {
    flex: 1,
  },

  inputLabel: {
    marginBottom: lightTheme.spacing.xs,
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.textSecondary,
    fontFamily: lightTheme.typography.fontFamily.medium,
  },

  destinationCity: {
    fontSize: lightTheme.typography.fontSize.lg,
    color: lightTheme.colors.text,
    fontFamily: lightTheme.typography.fontFamily.bold,
  },

  destinationCountry: {
    marginTop: 2,
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.textSecondary,
    fontFamily: lightTheme.typography.fontFamily.regular,
  },

  chevron: {
    marginLeft: lightTheme.spacing.sm,
    fontSize: lightTheme.typography.fontSize.xxl,
    color: lightTheme.colors.textSecondary,
    fontFamily: lightTheme.typography.fontFamily.regular,
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
    fontSize: lightTheme.typography.fontSize.xs,
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

  destinationsContainer: {
    gap: lightTheme.spacing.md,
    paddingRight: lightTheme.spacing.xl,
  },

  destinationCard: {
    width: 300,
    padding: lightTheme.spacing.lg,
    borderRadius: lightTheme.radius.xl,
    backgroundColor: lightTheme.colors.surface,
    ...lightTheme.shadow.small,
  },

  destinationCardHeader: {
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

  cardArrow: {
    fontSize: lightTheme.typography.fontSize.lg,
    color: lightTheme.colors.textSecondary,
    fontFamily: lightTheme.typography.fontFamily.medium,
  },

  destinationCardBody: {
    marginTop: lightTheme.spacing.xl,
  },

  destinationCode: {
    fontSize: lightTheme.typography.fontSize.xxl,
    color: lightTheme.colors.primary,
    fontFamily: lightTheme.typography.fontFamily.extraBold,
  },

  destinationName: {
    marginTop: lightTheme.spacing.xs,
    fontSize: lightTheme.typography.fontSize.xl,
    color: lightTheme.colors.text,
    fontFamily: lightTheme.typography.fontFamily.bold,
  },

  destinationCountryText: {
    marginTop: 2,
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.textSecondary,
    fontFamily: lightTheme.typography.fontFamily.regular,
  },

  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: lightTheme.spacing.lg,
    paddingVertical: lightTheme.spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: lightTheme.colors.divider,
  },

  infoLabel: {
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.textTertiary,
    fontFamily: lightTheme.typography.fontFamily.regular,
  },

  infoValue: {
    marginTop: lightTheme.spacing.xs,
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.text,
    fontFamily: lightTheme.typography.fontFamily.semiBold,
  },

  ratingContainer: {
    alignItems: 'flex-end',
  },

  ratingValue: {
    marginTop: lightTheme.spacing.xs,
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.secondary,
    fontFamily: lightTheme.typography.fontFamily.bold,
  },

  categoryContainer: {
    alignSelf: 'flex-start',
    marginTop: lightTheme.spacing.md,
    paddingHorizontal: lightTheme.spacing.sm,
    paddingVertical: lightTheme.spacing.xs,
    borderRadius: lightTheme.radius.sm,
    backgroundColor: lightTheme.colors.surfaceSecondary,
  },

  categoryText: {
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.primary,
    fontFamily: lightTheme.typography.fontFamily.medium,
  },

  cardFooter: {
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

  perNight: {
    marginTop: 1,
    fontSize: 9,
    color: lightTheme.colors.textTertiary,
    fontFamily: lightTheme.typography.fontFamily.regular,
  },

  viewHotelsButton: {
    paddingHorizontal: lightTheme.spacing.md,
    paddingVertical: lightTheme.spacing.sm,
    borderRadius: lightTheme.radius.sm,
    backgroundColor: lightTheme.colors.primary,
  },

  viewHotelsText: {
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

export default HotelBookingScreen;
