export interface Location {
  code: string;
  city: string;
}

export interface TrendingBusRoute {
  id: string;
  from: Location;
  to: Location;
  price: string;
  duration: string;
  buses: string;
  busType: string;
}
export interface TripTypeButtonProps {
  title: string;
  active: boolean;
  onPress: () => void;
}

export default interface LocationSelectorProps {
  label: string;
  location: Location;
  onPress: () => void;
}
