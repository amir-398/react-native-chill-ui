import { ssTextSize } from '../utils/sizes';
import sv from '../../../utils/styleSheetVariants';

const StringSv = sv({
  base: {
    flexShrink: 1,
    fontFamily: 'primary_regular_font',
  },
  defaultVariants: {
    position: 'left',
    variant: 'body-1',
  },
  variants: {
    position: {
      center: { textAlign: 'center' },
      left: { textAlign: 'left' },
      right: { textAlign: 'right' },
    },

    variant: {
      'body-1': ssTextSize.md,
      'body-2': ssTextSize.lg,
      'body-3': ssTextSize.xl,
      'body-sm': ssTextSize.sm,
      'body-xs': ssTextSize.xs,
      'title-1': { fontFamily: 'primary_bold_font', ...ssTextSize['2xl'] },
      'title-2': { fontFamily: 'primary_bold_font', ...ssTextSize['3xl'] },
      'title-3': { fontFamily: 'primary_bold_font', ...ssTextSize['4xl'] },
      'title-4': { fontFamily: 'primary_bold_font', ...ssTextSize['5xl'] },
      'title-5': { fontFamily: 'primary_bold_font', ...ssTextSize['6xl'] },
      'title-6': { fontFamily: 'primary_bold_font', ...ssTextSize['7xl'] },
      'title-7': { fontFamily: 'primary_bold_font', ...ssTextSize['8xl'] },
      'title-8': { fontFamily: 'primary_bold_font', ...ssTextSize['9xl'] },
    },
    // eslint-disable-next-line
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
    // eslint-disable-next-line
    size: {
      '2xl': ssTextSize['2xl'],
      '3xl': ssTextSize['3xl'],
      '4xl': ssTextSize['4xl'],
      '5xl': ssTextSize['5xl'],
      '6xl': ssTextSize['6xl'],
      '7xl': ssTextSize['7xl'],
      '8xl': ssTextSize['8xl'],
      '9xl': ssTextSize['9xl'],
      lg: ssTextSize.lg,
      md: ssTextSize.md,
      sm: ssTextSize.sm,
      xl: ssTextSize.xl,
      xs: ssTextSize.xs,
    },
  },
});

export default StringSv;
