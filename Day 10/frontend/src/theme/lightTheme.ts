const lightTheme = {
  colors: {
    primary: '#1D402D',
    primaryDark: '#143020',
    primaryLight: '#2E5C42',

    secondary: '#D9A441',
    secondaryLight: '#F3D58B',

    background: '#F7F5EF',
    surface: '#FFFFFF',
    surfaceSecondary: '#F0EEE7',

    text: '#17211B',
    textSecondary: '#66736B',
    textTertiary: '#9AA39D',
    textOnPrimary: '#FFFFFF',

    border: '#E2E5DF',
    divider: '#ECEEE9',

    success: '#2E7D5B',
    warning: '#D99A2B',
    error: '#C94A4A',
    info: '#477A8C',

    overlay: 'rgba(29, 64, 45, 0.45)',
    shadow: 'rgba(29, 64, 45, 0.12)',

    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
  },

  typography: {
    fontFamily: {
      regular: 'Manrope-Regular',
      medium: 'Manrope-Medium',
      semiBold: 'Manrope-SemiBold',
      bold: 'Manrope-Bold',
      extraBold: 'Manrope-ExtraBold',
      topHeading: 'Manrope-Bold',
      heading: 'Manrope-SemiBold',
      paragraph: 'Manrope-Regular',
    },

    fontSize: {
      xs: 11,
      sm: 13,
      md: 15,
      lg: 17,
      xl: 20,
      xxl: 24,
      xxxl: 30,
      display: 38,
    },

    lineHeight: {
      tight: 1.15,
      normal: 1.45,
      relaxed: 1.65,
    },
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    huge: 40,
    section: 48,
  },

  radius: {
    xs: 6,
    sm: 10,
    md: 14,
    lg: 18,
    xl: 24,
    xxl: 32,
    pill: 999,
  },

  shadow: {
    small: {
      shadowColor: '#000000',
      shadowOpacity: 0.06,
      shadowRadius: 6,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      elevation: 2,
    },

    medium: {
      shadowColor: '#000000',
      shadowOpacity: 0.1,
      shadowRadius: 12,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      elevation: 5,
    },

    large: {
      shadowColor: '#000000',
      shadowOpacity: 0.14,
      shadowRadius: 20,
      shadowOffset: {
        width: 0,
        height: 8,
      },
      elevation: 8,
    },
  },

  opacity: {
    disabled: 0.45,
    muted: 0.65,
    overlay: 0.5,
  },
} as const;
export default lightTheme;
