import React, { useState } from 'react';

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import SafeAreaContainer from '../../../../component/SafeAreaContainer';
import lightTheme from '../../../../theme/lightTheme';

const sampleFlight = {
  Origin: {
    code: 'DEL',
    name: 'New Delhi',
  },

  Destination: {
    code: 'BOM',
    name: 'Mumbai',
  },

  DepartureTime: '10:30 AM',
  ArrivalTime: '12:40 PM',
  Duration: '2h 10m',

  AirlineName: 'Air India',
  FlightNumber: 'AI-865',
  Aircraft: 'Airbus A320',

  Fare: 4999,

  DepartureDate: '24 Sep 2026',
};

const FlightDetailsScreen = ({ route }: { route: any }): React.ReactElement => {
  const flight = route?.params?.flight || sampleFlight;

  const [cabinClass, setCabinClass] = useState('Economy');

  const [seatPreference, setSeatPreference] = useState('Window');

  const [mealPreference, setMealPreference] = useState('Vegetarian');

  const [baggage, setBaggage] = useState('15 KG');

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [passportNumber, setPassportNumber] = useState('');

  const [specialRequest, setSpecialRequest] = useState('');

  const price = flight.Fare || 4999;

  return (
    <SafeAreaContainer>
      <View style={style.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={style.contentContainer}
        >
          {/* HEADER */}

          <View style={style.header}>
            <Text style={style.title}>Passenger & Booking Details</Text>

            <Text style={style.subtitle}>
              Enter your information and select your preferences
            </Text>
          </View>

          {/* FLIGHT SUMMARY */}

          <Text style={style.sectionTitle}>Your Flight</Text>

          <View style={style.flightCard}>
            <View style={style.airlineRow}>
              <View>
                <Text style={style.airline}>{flight.AirlineName}</Text>

                <Text style={style.flightNumber}>{flight.FlightNumber}</Text>
              </View>

              <Text style={style.flightDate}>{flight.DepartureDate}</Text>
            </View>

            <View style={style.routeContainer}>
              <View style={style.airport}>
                <Text style={style.time}>{flight.DepartureTime}</Text>

                <Text style={style.code}>{flight.Origin.code}</Text>

                <Text style={style.airportName}>{flight.Origin.name}</Text>
              </View>

              <View style={style.routeMiddle}>
                <Text style={style.duration}>{flight.Duration}</Text>

                <View style={style.route}>
                  <View style={style.line} />

                  <View style={style.plane}>
                    <Text style={style.planeText}>✈</Text>
                  </View>
                </View>

                <Text style={style.nonStop}>Non-stop</Text>
              </View>

              <View style={style.airport}>
                <Text style={style.time}>{flight.ArrivalTime}</Text>

                <Text style={style.code}>{flight.Destination.code}</Text>

                <Text style={style.airportName}>{flight.Destination.name}</Text>
              </View>
            </View>
          </View>

          {/* CABIN CLASS */}

          <Text style={style.sectionTitle}>Cabin Class</Text>

          <View style={style.optionsContainer}>
            {['Economy', 'Premium Economy', 'Business', 'First'].map(item => (
              <OptionButton
                key={item}
                title={item}
                selected={cabinClass === item}
                onPress={() => setCabinClass(item)}
              />
            ))}
          </View>

          {/* SEAT */}

          <Text style={style.sectionTitle}>Seat Preference</Text>

          <View style={style.optionsContainer}>
            {['Window', 'Middle', 'Aisle'].map(item => (
              <OptionButton
                key={item}
                title={item}
                selected={seatPreference === item}
                onPress={() => setSeatPreference(item)}
              />
            ))}
          </View>

          {/* MEAL */}

          <Text style={style.sectionTitle}>Meal Preference</Text>

          <View style={style.optionsContainer}>
            {['Vegetarian', 'Non-Vegetarian', 'Vegan', 'No Meal'].map(item => (
              <OptionButton
                key={item}
                title={item}
                selected={mealPreference === item}
                onPress={() => setMealPreference(item)}
              />
            ))}
          </View>

          {/* BAGGAGE */}

          <Text style={style.sectionTitle}>Baggage</Text>

          <View style={style.optionsContainer}>
            {['15 KG', '20 KG', '25 KG', '30 KG'].map(item => (
              <OptionButton
                key={item}
                title={item}
                selected={baggage === item}
                onPress={() => setBaggage(item)}
              />
            ))}
          </View>

          {/* PASSENGER */}

          <Text style={style.sectionTitle}>Passenger Information</Text>

          <View style={style.card}>
            <Text style={style.inputLabel}>First Name *</Text>

            <TextInput
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Enter first name"
              placeholderTextColor={lightTheme.colors.textTertiary}
              style={style.input}
            />

            <Text style={style.inputLabel}>Middle Name</Text>

            <TextInput
              value={middleName}
              onChangeText={setMiddleName}
              placeholder="Enter middle name"
              placeholderTextColor={lightTheme.colors.textTertiary}
              style={style.input}
            />

            <Text style={style.inputLabel}>Last Name *</Text>

            <TextInput
              value={lastName}
              onChangeText={setLastName}
              placeholder="Enter last name"
              placeholderTextColor={lightTheme.colors.textTertiary}
              style={style.input}
            />

            <Text style={style.inputLabel}>Passport Number</Text>

            <TextInput
              value={passportNumber}
              onChangeText={setPassportNumber}
              placeholder="Enter passport number"
              placeholderTextColor={lightTheme.colors.textTertiary}
              style={style.input}
              autoCapitalize="characters"
            />
          </View>

          {/* CONTACT */}

          <Text style={style.sectionTitle}>Contact Information</Text>

          <View style={style.card}>
            <Text style={style.inputLabel}>Email Address *</Text>

            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="example@email.com"
              placeholderTextColor={lightTheme.colors.textTertiary}
              style={style.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={style.inputLabel}>Phone Number *</Text>

            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="+91 9876543210"
              placeholderTextColor={lightTheme.colors.textTertiary}
              style={style.input}
              keyboardType="phone-pad"
            />
          </View>

          {/* SPECIAL REQUEST */}

          <Text style={style.sectionTitle}>Special Request</Text>

          <View style={style.card}>
            <TextInput
              value={specialRequest}
              onChangeText={setSpecialRequest}
              placeholder="Any special requirement?"
              placeholderTextColor={lightTheme.colors.textTertiary}
              style={[style.input, style.textArea]}
              multiline
              numberOfLines={4}
            />
          </View>

          {/* FARE */}

          <Text style={style.sectionTitle}>Fare Summary</Text>

          <View style={style.fareCard}>
            <View style={style.fareRow}>
              <Text style={style.fareLabel}>Flight Fare</Text>

              <Text style={style.fareValue}>₹{price}</Text>
            </View>

            <View style={style.fareRow}>
              <Text style={style.fareLabel}>Taxes & Fees</Text>

              <Text style={style.fareValue}>Included</Text>
            </View>

            <View style={style.fareRow}>
              <Text style={style.fareLabel}>Baggage</Text>

              <Text style={style.fareValue}>{baggage}</Text>
            </View>

            <View style={style.divider} />

            <View style={style.totalRow}>
              <Text style={style.totalLabel}>Total</Text>

              <Text style={style.totalPrice}>₹{price}</Text>
            </View>
          </View>

          <View style={style.bottomSpace} />
        </ScrollView>

        {/* BOOK BUTTON */}

        <View style={style.bottomContainer}>
          <View>
            <Text style={style.bottomLabel}>Total Fare</Text>

            <Text style={style.bottomPrice}>₹{price}</Text>
          </View>

          <Pressable
            style={style.bookButton}
            onPress={() => {
              const bookingData = {
                flight,

                passenger: {
                  firstName,
                  middleName,
                  lastName,
                  passportNumber,
                },

                contact: {
                  email,
                  phone,
                },

                preferences: {
                  cabinClass,
                  seatPreference,
                  mealPreference,
                  baggage,
                },

                specialRequest,
              };

              console.log('BOOKING DATA', bookingData);
            }}
          >
            <Text style={style.bookButtonText}>Continue to Payment</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaContainer>
  );
};

type OptionButtonProps = {
  title: string;
  selected: boolean;
  onPress: () => void;
};

const OptionButton = ({
  title,
  selected,
  onPress,
}: OptionButtonProps): React.ReactElement => {
  return (
    <Pressable
      onPress={onPress}
      style={[style.optionButton, selected && style.selectedOption]}
    >
      <Text style={[style.optionText, selected && style.selectedOptionText]}>
        {title}
      </Text>
    </Pressable>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.colors.background,
  },

  mainContainer: {
    flex: 1,
  },

  contentContainer: {
    // padding: lightTheme.spacing.xl,
    paddingBottom: 130,
  },

  header: {
    marginBottom: lightTheme.spacing.md,
  },

  title: {
    fontFamily: lightTheme.typography.fontFamily.topHeading,
    fontSize: lightTheme.typography.fontSize.xxl,
    color: lightTheme.colors.text,
  },

  subtitle: {
    marginTop: lightTheme.spacing.xs,
    fontFamily: lightTheme.typography.fontFamily.regular,
    fontSize: lightTheme.typography.fontSize.sm,
    lineHeight:
      lightTheme.typography.fontSize.sm *
      lightTheme.typography.lineHeight.normal,
    color: lightTheme.colors.textSecondary,
  },

  sectionTitle: {
    marginTop: lightTheme.spacing.xxl,
    marginBottom: lightTheme.spacing.md,
    fontFamily: lightTheme.typography.fontFamily.heading,
    fontSize: lightTheme.typography.fontSize.lg,
    color: lightTheme.colors.text,
  },

  flightCard: {
    backgroundColor: lightTheme.colors.surface,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    borderRadius: lightTheme.radius.xl,
    padding: lightTheme.spacing.lg,
    ...lightTheme.shadow.small,
  },

  airlineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  airline: {
    fontFamily: lightTheme.typography.fontFamily.bold,
    fontSize: lightTheme.typography.fontSize.md,
    color: lightTheme.colors.text,
  },

  flightNumber: {
    marginTop: lightTheme.spacing.xs,
    fontFamily: lightTheme.typography.fontFamily.regular,
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.textSecondary,
  },

  flightDate: {
    fontFamily: lightTheme.typography.fontFamily.medium,
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.textSecondary,
  },

  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: lightTheme.spacing.xxl,
  },

  airport: {
    flex: 1,
  },

  time: {
    fontFamily: lightTheme.typography.fontFamily.bold,
    fontSize: lightTheme.typography.fontSize.xl,
    color: lightTheme.colors.text,
  },

  code: {
    marginTop: lightTheme.spacing.xs,
    fontFamily: lightTheme.typography.fontFamily.bold,
    fontSize: lightTheme.typography.fontSize.lg,
    color: lightTheme.colors.primary,
  },

  airportName: {
    marginTop: lightTheme.spacing.xs,
    fontFamily: lightTheme.typography.fontFamily.regular,
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.textSecondary,
  },

  routeMiddle: {
    width: 80,
    alignItems: 'center',
  },

  duration: {
    fontFamily: lightTheme.typography.fontFamily.medium,
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.textSecondary,
  },

  route: {
    width: 70,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  line: {
    position: 'absolute',
    width: 60,
    height: 1,
    backgroundColor: lightTheme.colors.secondary,
  },

  plane: {
    width: 28,
    height: 28,
    borderRadius: lightTheme.radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightTheme.colors.primary,
  },

  planeText: {
    color: lightTheme.colors.textOnPrimary,
    fontSize: lightTheme.typography.fontSize.xs,
  },

  nonStop: {
    fontFamily: lightTheme.typography.fontFamily.regular,
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.textSecondary,
  },

  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: lightTheme.spacing.sm,
  },

  optionButton: {
    paddingHorizontal: lightTheme.spacing.md,
    paddingVertical: lightTheme.spacing.sm,
    borderRadius: lightTheme.radius.pill,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    backgroundColor: lightTheme.colors.surface,
  },

  selectedOption: {
    backgroundColor: lightTheme.colors.primary,
    borderColor: lightTheme.colors.primary,
  },

  optionText: {
    fontFamily: lightTheme.typography.fontFamily.medium,
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.textSecondary,
  },

  selectedOptionText: {
    color: lightTheme.colors.textOnPrimary,
  },

  card: {
    backgroundColor: lightTheme.colors.surface,
    borderRadius: lightTheme.radius.lg,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    padding: lightTheme.spacing.lg,
    ...lightTheme.shadow.small,
  },

  inputLabel: {
    marginBottom: lightTheme.spacing.xs,
    fontFamily: lightTheme.typography.fontFamily.medium,
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.text,
  },

  input: {
    height: 50,
    marginBottom: lightTheme.spacing.lg,
    paddingHorizontal: lightTheme.spacing.md,
    borderRadius: lightTheme.radius.md,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    backgroundColor: lightTheme.colors.background,
    fontFamily: lightTheme.typography.fontFamily.regular,
    fontSize: lightTheme.typography.fontSize.md,
    color: lightTheme.colors.text,
  },

  textArea: {
    height: 110,
    paddingTop: lightTheme.spacing.md,
    textAlignVertical: 'top',
    marginBottom: 0,
  },

  fareCard: {
    backgroundColor: lightTheme.colors.surface,
    borderRadius: lightTheme.radius.lg,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    padding: lightTheme.spacing.lg,
    ...lightTheme.shadow.small,
  },

  fareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: lightTheme.spacing.md,
  },

  fareLabel: {
    fontFamily: lightTheme.typography.fontFamily.regular,
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.textSecondary,
  },

  fareValue: {
    fontFamily: lightTheme.typography.fontFamily.semiBold,
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.text,
  },

  divider: {
    height: 1,
    marginVertical: lightTheme.spacing.md,
    backgroundColor: lightTheme.colors.divider,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalLabel: {
    fontFamily: lightTheme.typography.fontFamily.semiBold,
    fontSize: lightTheme.typography.fontSize.md,
    color: lightTheme.colors.text,
  },

  totalPrice: {
    fontFamily: lightTheme.typography.fontFamily.extraBold,
    fontSize: lightTheme.typography.fontSize.xl,
    color: lightTheme.colors.primary,
  },

  bottomSpace: {
    height: lightTheme.spacing.huge,
  },

  bottomContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: lightTheme.spacing.xl,
    paddingVertical: lightTheme.spacing.md,
    backgroundColor: lightTheme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: lightTheme.colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...lightTheme.shadow.medium,
  },

  bottomLabel: {
    fontFamily: lightTheme.typography.fontFamily.regular,
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.textSecondary,
  },

  bottomPrice: {
    marginTop: lightTheme.spacing.xs,
    fontFamily: lightTheme.typography.fontFamily.extraBold,
    fontSize: lightTheme.typography.fontSize.xl,
    color: lightTheme.colors.text,
  },

  bookButton: {
    minHeight: 52,
    paddingHorizontal: lightTheme.spacing.lg,
    borderRadius: lightTheme.radius.md,
    backgroundColor: lightTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bookButtonText: {
    fontFamily: lightTheme.typography.fontFamily.semiBold,
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.textOnPrimary,
  },
});

export default FlightDetailsScreen;
