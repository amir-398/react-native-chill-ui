import { sv } from '@utils';

const textSizes = {
  '2xl': { fontSize: 24, lineHeight: 32 },
  '3xl': { fontSize: 30, lineHeight: 36 },
  '4xl': { fontSize: 36, lineHeight: 40 },
  '5xl': { fontSize: 48, lineHeight: 52 },
  '6xl': { fontSize: 60, lineHeight: 64 },
  '7xl': { fontSize: 72, lineHeight: 76 },
  '8xl': { fontSize: 96, lineHeight: 100 },
  '9xl': { fontSize: 128, lineHeight: 132 },
  lg: { fontSize: 18, lineHeight: 28 },
  md: { fontSize: 16, lineHeight: 24 },
  sm: { fontSize: 14, lineHeight: 20 },
  xl: { fontSize: 20, lineHeight: 28 },
  xs: { fontSize: 12, lineHeight: 16 },
};

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
      'body-1': textSizes.md,
      'body-2': textSizes.lg,
      'body-3': textSizes.xl,
      'body-sm': textSizes.sm,
      'body-xs': textSizes.xs,
      'title-1': { fontFamily: 'primary_bold_font', ...textSizes['2xl'] },
      'title-2': { fontFamily: 'primary_bold_font', ...textSizes['3xl'] },
      'title-3': { fontFamily: 'primary_bold_font', ...textSizes['4xl'] },
      'title-4': { fontFamily: 'primary_bold_font', ...textSizes['5xl'] },
      'title-5': { fontFamily: 'primary_bold_font', ...textSizes['6xl'] },
      'title-6': { fontFamily: 'primary_bold_font', ...textSizes['7xl'] },
      'title-7': { fontFamily: 'primary_bold_font', ...textSizes['8xl'] },
      'title-8': { fontFamily: 'primary_bold_font', ...textSizes['9xl'] },
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
      '2xl': textSizes['2xl'],
      '3xl': textSizes['3xl'],
      '4xl': textSizes['4xl'],
      '5xl': textSizes['5xl'],
      '6xl': textSizes['6xl'],
      '7xl': textSizes['7xl'],
      '8xl': textSizes['8xl'],
      '9xl': textSizes['9xl'],
      lg: textSizes.lg,
      md: textSizes.md,
      sm: textSizes.sm,
      xl: textSizes.xl,
      xs: textSizes.xs,
    },
  },
});

export default StringSv;
