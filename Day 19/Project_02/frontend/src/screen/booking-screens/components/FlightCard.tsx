import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type AirportTax = {
  Tax_Desc: string;
  Tax_Code: string | null;
  Tax_Amount: number;
};

type FreeBaggage = {
  DisplayRemarks: string | null;
  Hand_Baggage: string;
  Check_In_Baggage: string;
};

type FareClass = {
  CabinClass: string;
  Class_Desc: string;
  Privileges: string | null;
  FareBasis: string | null;
  Class_Code: string;
  Segment_Id: number;
};

type FareDetail = {
  Service_Fee_Amount: number;
  TDS: number;
  Total_Amount: number;
  Trade_Markup_Amount: number;
  YQ_Amount: number;
  Net_Commission: number;
  GST: number;
  Basic_Amount: number;
  PAX_Type: number;
  AirportTax_Amount: number;
  Gross_Commission: number;
  AirportTaxes: AirportTax[];
  Free_Baggage: FreeBaggage;
  Currency_Code: string;
  FareClasses: FareClass[];
  Promo_Discount: number;
};

type Fare = {
  Seats_Available: string;
  Warning: string | null;
  FareType: string;
  Food_onboard: string;
  Refundable: boolean;
  FareDetails: FareDetail[];
  totalAmount: number;
  LastFewSeats: string;
  GSTMandatory: boolean;
  PromptMessage: string | null;
  Fare_Id: string;
  Fare_Key: number;
  ProductClass: string;
  totalBasicAmount: number;
};

type Segment = {
  Origin: string;
  Arrival_DateTime: string;
  Destination: string;
  Duration: string;
  Segment_Id: number;
  Destination_Terminal: string;
  Airline_Name: string;
  Origin_City: string;
  Airline_Code: string;
  Origin_Terminal: string;
  Aircraft_Type: string | null;
  OperatedBy: string | null;
  Flight_Number: string;
  Stop_Over: string | null;
  Destination_City: string;
  Departure_DateTime: string;
  Return_Flight: boolean;
  Leg_Index: number;
};

export type Flight = {
  Origin: string;
  Destination: string;
  Repriced: boolean;
  InventoryType: number;
  Flight_Key: string;
  TravelDate: string;
  Segments: Segment[];
  Fares: Fare[];
  Flight_Numbers: string;
  Airline_Code: string;
  Block_Ticket_Allowed: boolean;
  Cached: boolean;
  IsLCC: boolean;
  GST_Entry_Allowed: boolean;
  Flight_Id: string;
  HasMoreClass: boolean;
};

type FlightCardProps = {
  flight: Flight;
  onSelect?: (flight: Flight, fare: Fare) => void;
};

const formatTime = (dateTime: string) => {
  const [, time] = dateTime.split(' ');

  if (!time) {
    return '--:--';
  }

  return time.substring(0, 5);
};

const formatDate = (dateTime: string) => {
  const [date] = dateTime.split(' ');

  if (!date) {
    return '';
  }

  const [month, day, year] = date.split('/');

  return `${day}/${month}/${year}`;
};

const FlightCard = ({
  flight,
  onSelect,
}: FlightCardProps): React.ReactElement => {
  const segment = flight.Segments[0];

  if (!segment) {
    return <></>;
  }

  const sortedFares = [...flight.Fares].sort(
    (a, b) => a.totalAmount - b.totalAmount,
  );

  const fare = sortedFares[0];

  if (!fare) {
    return <></>;
  }

  const fareDetail = fare.FareDetails[0];

  const baggage = fareDetail?.Free_Baggage;

  const departureTime = formatTime(segment.Departure_DateTime);
  const arrivalTime = formatTime(segment.Arrival_DateTime);

  const departureDate = formatDate(segment.Departure_DateTime);

  const stopText = segment.Stop_Over ? segment.Stop_Over : 'Non-stop';

  const currency = fareDetail?.Currency_Code ?? 'INR';

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.airlineContainer}>
          <View style={styles.airlineLogo}>
            <Text style={styles.airlineLogoText}>{segment.Airline_Code}</Text>
          </View>

          <View>
            <Text style={styles.airlineName}>{segment.Airline_Name}</Text>

            <Text style={styles.flightNumber}>
              {segment.Airline_Code} {segment.Flight_Number}
            </Text>
          </View>
        </View>

        <View style={styles.fareBadge}>
          <Text style={styles.fareBadgeText}>
            {fareDetail?.FareClasses?.[0]?.CabinClass ?? 'ECONOMY'}
          </Text>
        </View>
      </View>

      <View style={styles.flightRoute}>
        <View style={styles.timeBlock}>
          <Text style={styles.time}>{departureTime}</Text>

          <Text style={styles.airportCode}>{segment.Origin}</Text>

          <Text style={styles.city}>{segment.Origin_City}</Text>

          <Text style={styles.terminal}>
            Terminal {segment.Origin_Terminal}
          </Text>
        </View>

        <View style={styles.routeBlock}>
          <Text style={styles.duration}>{segment.Duration}</Text>

          <View style={styles.routeLine}>
            <View style={styles.dot} />
            <View style={styles.line} />
            <View style={styles.plane}>
              <Text style={styles.planeText}>✈</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.dot} />
          </View>

          <Text style={styles.stopText}>{stopText}</Text>
        </View>

        <View style={styles.timeBlock}>
          <Text style={styles.time}>{arrivalTime}</Text>

          <Text style={styles.airportCode}>{segment.Destination}</Text>

          <Text style={styles.city}>{segment.Destination_City}</Text>

          <Text style={styles.terminal}>
            Terminal {segment.Destination_Terminal}
          </Text>
        </View>
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{departureDate}</Text>

        <Text style={styles.flightId}>{flight.Flight_Id}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Baggage</Text>

          <Text style={styles.detailValue}>
            {baggage?.Check_In_Baggage ?? '--'}
          </Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Cabin</Text>

          <Text style={styles.detailValue}>
            {baggage?.Hand_Baggage ?? '--'}
          </Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Refund</Text>

          <Text
            style={[
              styles.detailValue,
              fare.Refundable ? styles.refundable : styles.nonRefundable,
            ]}
          >
            {fare.Refundable ? 'Refundable' : 'Non-refundable'}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.fareInfo}>
        <View style={styles.fareInfoLeft}>
          <Text style={styles.fareType}>{fare.FareType}</Text>

          {fare.LastFewSeats && (
            <Text style={styles.seats}>
              Only {fare.LastFewSeats} seats left
            </Text>
          )}

          {fare.Warning && <Text style={styles.specialFare}>Special fare</Text>}
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {currency} {fare.totalAmount.toLocaleString('en-IN')}
          </Text>

          <Text style={styles.priceLabel}>per passenger</Text>
        </View>
      </View>

      <Pressable
        style={styles.selectButton}
        onPress={() => onSelect?.(flight, fare)}
      >
        <Text style={styles.selectButtonText}>Select Flight</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  airlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  airlineLogo: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#1D402D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  airlineLogoText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  airlineName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#17211B',
  },

  flightNumber: {
    marginTop: 3,
    fontSize: 12,
    color: '#66736B',
  },

  fareBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F0EEE7',
  },

  fareBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1D402D',
  },

  flightRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
  },

  timeBlock: {
    flex: 1,
  },

  time: {
    fontSize: 22,
    fontWeight: '800',
    color: '#17211B',
  },

  airportCode: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: '700',
    color: '#1D402D',
  },

  city: {
    marginTop: 2,
    fontSize: 11,
    color: '#66736B',
  },

  terminal: {
    marginTop: 3,
    fontSize: 10,
    color: '#9AA39D',
  },

  routeBlock: {
    width: 90,
    alignItems: 'center',
    marginHorizontal: 6,
  },

  duration: {
    fontSize: 11,
    color: '#66736B',
    fontWeight: '600',
  },

  routeLine: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 7,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1D402D',
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#D1D5DB',
  },

  plane: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },

  planeText: {
    fontSize: 14,
    color: '#A85527',
  },

  stopText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#66736B',
  },

  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },

  dateText: {
    fontSize: 11,
    color: '#66736B',
    fontWeight: '600',
  },

  flightId: {
    fontSize: 9,
    color: '#9AA39D',
  },

  divider: {
    height: 1,
    backgroundColor: '#ECEEE9',
    marginVertical: 14,
  },

  detailsRow: {
    flexDirection: 'row',
  },

  detailItem: {
    flex: 1,
  },

  detailLabel: {
    fontSize: 10,
    color: '#9AA39D',
    marginBottom: 4,
  },

  detailValue: {
    fontSize: 11,
    fontWeight: '600',
    color: '#17211B',
  },

  refundable: {
    color: '#2E7D5B',
  },

  nonRefundable: {
    color: '#C94A4A',
  },

  fareInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  fareInfoLeft: {
    flex: 1,
  },

  fareType: {
    fontSize: 13,
    fontWeight: '700',
    color: '#17211B',
  },

  seats: {
    marginTop: 4,
    fontSize: 11,
    color: '#A85527',
    fontWeight: '600',
  },

  specialFare: {
    marginTop: 4,
    fontSize: 10,
    color: '#A85527',
  },

  priceContainer: {
    alignItems: 'flex-end',
  },

  price: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1D402D',
  },

  priceLabel: {
    marginTop: 2,
    fontSize: 9,
    color: '#9AA39D',
  },

  selectButton: {
    marginTop: 16,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#1D402D',
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default FlightCard;
