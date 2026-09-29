export interface Airport {
  code: string;
  city: string;
}

export interface TrendingRoute1 {
  id: string;
  from: Airport;
  to: Airport;
  price: string;
  duration: string;
  flights: string;
}

export interface TripTypeButtonProps {
  title: string;
  active: boolean;
  onPress: () => void;
}
export interface TrendingRoute {
  from: string;
  to: string;
  price: string;
  duration: string;
  availability: string;
}
export type TripType = 'oneWay' | 'roundTrip' | 'multiCity';

export interface TripTypeButtonProps {
  label: string;
  value: TripType;
  active: boolean;
  onPress: () => void;
}
