export interface Offer {
  id: string;
  title: string;
  subtitle: string;
  couponCode?: string;
  actionLabel?: string;
  onPress?: () => void;
}

export interface OfferCarouselProps {
  title?: string;
  subtitle?: string;
  offers: Offer[];
  onOfferPress?: (offer: Offer) => void;
}
