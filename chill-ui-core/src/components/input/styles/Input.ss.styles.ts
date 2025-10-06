import { sv } from '@utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  bottomInputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'space-between',
  },
  errorContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    paddingLeft: 4,
  },
  errorText: {
    color: '#EF4444',
  },

  iconContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#D1D5DB',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 12,
  },

  inputContainerDisabled: {
    opacity: 0.5,
  },
  label: {
    marginLeft: 4,
  },
  leftIcon: {
    marginRight: 6,
  },
  lengthText: {
    fontSize: 12,
    marginRight: 2,
  },
  rightIcon: {
    marginLeft: 6,
  },
});

export const inputSv = sv({
  base: {
    flex: 1,
  },
  defaultVariants: {
    size: 'md',
  },
  variants: {
    font: {
      primaryBold: { fontFamily: 'primary_bold_font' },
      primaryExtraBold: { fontFamily: 'primary_extra_bold_font' },
      primaryExtraLight: { fontFamily: 'primary_extra_light_font' },
      primaryItalic: { fontFamily: 'primary_italic_font' },
      primaryLight: { fontFamily: 'primary_light_font' },
      primaryMedium: { fontFamily: 'primary_medium_font' },
      primaryRegular: { fontFamily: 'primary_regular_font' },
      primarySemiBold: { fontFamily: 'primary_semi_bold_font' },
      primaryThin: { fontFamily: 'primary_thin_font' },
      secondaryBold: { fontFamily: 'secondary_bold_font' },
      secondaryExtraBold: { fontFamily: 'secondary_extra_bold_font' },
      secondaryExtraLight: { fontFamily: 'secondary_extra_light_font' },
      secondaryItalic: { fontFamily: 'secondary_italic_font' },
      secondaryLight: { fontFamily: 'secondary_light_font' },
      secondaryMedium: { fontFamily: 'secondary_medium_font' },
      secondaryRegular: { fontFamily: 'secondary_regular_font' },
      secondarySemiBold: { fontFamily: 'secondary_semi_bold_font' },
      secondaryThin: { fontFamily: 'secondary_thin_font' },
      tertiaryBold: { fontFamily: 'tertiary_bold_font' },
      tertiaryExtraBold: { fontFamily: 'tertiary_extra_bold_font' },
      tertiaryExtraLight: { fontFamily: 'tertiary_extra_light_font' },
      tertiaryItalic: { fontFamily: 'tertiary_italic_font' },
      tertiaryLight: { fontFamily: 'tertiary_light_font' },
      tertiaryMedium: { fontFamily: 'tertiary_medium_font' },
      tertiaryRegular: { fontFamily: 'tertiary_regular_font' },
      tertiarySemiBold: { fontFamily: 'tertiary_semi_bold_font' },
      tertiaryThin: { fontFamily: 'tertiary_thin_font' },
    },
    isStretchable: {
      true: {
        width: '100%',
      },
    },
    multiline: {
      true: {
        minHeight: 40,
        textAlignVertical: 'top',
      },
    },
    size: {
      lg: { fontSize: 18, paddingVertical: 14 },
      md: { fontSize: 16, paddingVertical: 12 },
      sm: { fontSize: 14, paddingVertical: 8 },
      xl: { fontSize: 20, paddingVertical: 16 },
      xs: { fontSize: 12, paddingVertical: 6 },
    },
  },
});

export const inputContainerSv = sv({
  base: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#D1D5DB',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  defaultVariants: {
    hasError: false,
    isDisabled: false,
  },
  variants: {
    hasError: {
      true: {
        borderColor: '#EF4444',
      },
    },
    isDisabled: {
      true: {
        opacity: 0.5,
      },
    },
  },
});
