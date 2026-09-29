import React from 'react';

import { StyleSheet, View } from 'react-native';

import { Calendar } from 'react-native-calendars';

import lightTheme from '../theme/lightTheme';

type CalenderProviderPropType = {
  setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
};

function CustomCalenderProvider({
  setShowCalendar,
  setDate,
}: CalenderProviderPropType) {
  const todayDate = new Date();

  const today = todayDate.toISOString().split('T')[0];

  const maxDateObject = new Date(todayDate);
  maxDateObject.setFullYear(maxDateObject.getFullYear() + 1);

  const maxDate = maxDateObject.toISOString().split('T')[0];

  return (
    <View style={styles.container}>
      <Calendar
        minDate={today}
        maxDate={maxDate}
        // pastScrollRange={0}
        // futureScrollRange={12}
        onDayPress={day => {
          setDate(day.dateString);
          setShowCalendar(false);
        }}
        enableSwipeMonths
        hideExtraDays
        firstDay={1}
        theme={{
          backgroundColor: lightTheme.colors.surface,
          calendarBackground: lightTheme.colors.surface,
          textSectionTitleColor: lightTheme.colors.textSecondary,

          selectedDayBackgroundColor: lightTheme.colors.primary,
          selectedDayTextColor: lightTheme.colors.textOnPrimary,

          todayTextColor: lightTheme.colors.secondary,
          dayTextColor: lightTheme.colors.text,
          textDisabledColor: lightTheme.colors.textTertiary,

          monthTextColor: lightTheme.colors.text,
          arrowColor: lightTheme.colors.primary,

          textDayFontFamily: lightTheme.typography.fontFamily.medium,
          textMonthFontFamily: lightTheme.typography.fontFamily.bold,
          textDayHeaderFontFamily: lightTheme.typography.fontFamily.semiBold,

          textDayFontSize: lightTheme.typography.fontSize.sm,
          textMonthFontSize: lightTheme.typography.fontSize.lg,
          textDayHeaderFontSize: lightTheme.typography.fontSize.xs,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 340,
    backgroundColor: lightTheme.colors.surface,
    borderRadius: lightTheme.radius.lg,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    padding: lightTheme.spacing.sm,
    ...lightTheme.shadow.large,
  },
});

export default CustomCalenderProvider;
