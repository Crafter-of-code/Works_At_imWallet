import React from 'react';
import { Pressable, ScrollView, Text, View, StyleSheet } from 'react-native';
import lightTheme from '../theme/lightTheme';
import { OfferCarouselProps } from '../types/OfferCrouselType';

const OfferCarousel = ({
  title = 'Offers',
  subtitle = 'Exclusive deals for you',
  offers,
  onOfferPress,
}: OfferCarouselProps): React.ReactElement => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
        snapToInterval={296}
        snapToAlignment="start"
      >
        {offers.map(offer => (
          <Pressable
            key={offer.id}
            style={styles.offerCard}
            onPress={() => {
              offer.onPress?.();
              onOfferPress?.(offer);
            }}
          >
            <Text style={styles.offerTitle}>{offer.title}</Text>

            <Text style={styles.offerSubtitle}>{offer.subtitle}</Text>

            <View style={styles.bottomRow}>
              {offer.couponCode && (
                <View style={styles.couponContainer}>
                  <Text style={styles.couponCode}>{offer.couponCode}</Text>
                </View>
              )}

              {offer.actionLabel && (
                <Text style={styles.actionLabel}>{offer.actionLabel}</Text>
              )}
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: lightTheme.spacing.xxxl,
  },

  header: {
    marginBottom: lightTheme.spacing.lg,
  },

  title: {
    fontSize: lightTheme.typography.fontSize.xl,
    color: lightTheme.colors.text,
    fontFamily: lightTheme.typography.fontFamily.bold,
  },

  subtitle: {
    marginTop: lightTheme.spacing.xs,
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.textSecondary,
    fontFamily: lightTheme.typography.fontFamily.regular,
  },

  scrollContent: {
    paddingRight: lightTheme.spacing.xl,
  },

  offerCard: {
    width: 280,
    minHeight: 150,
    padding: lightTheme.spacing.lg,
    marginRight: lightTheme.spacing.md,
    borderRadius: lightTheme.radius.lg,
    backgroundColor: lightTheme.colors.primary,
    ...lightTheme.shadow.medium,
  },

  offerTitle: {
    fontSize: lightTheme.typography.fontSize.xl,
    color: lightTheme.colors.textOnPrimary,
    fontFamily: lightTheme.typography.fontFamily.bold,
  },

  offerSubtitle: {
    marginTop: lightTheme.spacing.xs,
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.textOnPrimary,
    fontFamily: lightTheme.typography.fontFamily.regular,
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: lightTheme.spacing.xl,
  },

  couponContainer: {
    paddingHorizontal: lightTheme.spacing.sm,
    paddingVertical: lightTheme.spacing.xs,
    borderRadius: lightTheme.radius.sm,
    backgroundColor: lightTheme.colors.secondaryLight,
  },

  couponCode: {
    fontSize: lightTheme.typography.fontSize.xs,
    color: lightTheme.colors.text,
    fontFamily: lightTheme.typography.fontFamily.bold,
  },

  actionLabel: {
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.textOnPrimary,
    fontFamily: lightTheme.typography.fontFamily.bold,
  },
});

export default OfferCarousel;
