import { tv } from 'tailwind-variants';

import textSize from './utils/sizes';

export const textSizeVr = tv({
  variants: {
    size: {
      '2xl': textSize['2xl'],
      '3xl': textSize['3xl'],
      '4xl': textSize['4xl'],
      '5xl': textSize['5xl'],
      '6xl': textSize['6xl'],
      '7xl': textSize['7xl'],
      '8xl': textSize['8xl'],
      '9xl': textSize['9xl'],
      lg: textSize.lg,
      md: textSize.md,
      sm: textSize.sm,
      xl: textSize.xl,
      xs: textSize.xs,
    },
  },
});

export const textFontVr = tv({
  compoundVariants: [
    {
      className: 'font-primary_bold_font',
      font: 'primary',
      variant: ['title-1', 'title-2', 'title-3', 'title-4', 'title-5', 'title-6', 'title-7', 'title-8'],
    },
    {
      className: 'font-secondary_bold_font',
      font: 'secondary',
      variant: ['title-1', 'title-2', 'title-3', 'title-4', 'title-5', 'title-6', 'title-7', 'title-8'],
    },
    {
      className: 'font-tertiary_bold_font',
      font: 'tertiary',
      variant: ['title-1', 'title-2', 'title-3', 'title-4', 'title-5', 'title-6', 'title-7', 'title-8'],
    },
    {
      className: 'font-primary_bold_font',
      font: 'primary',
      weight: 'bold',
    },
    {
      className: 'font-primary_extra_bold_font',
      font: 'primary',
      weight: 'extraBold',
    },
    {
      className: 'font-primary_extra_light_font',
      font: 'primary',
      weight: 'extraLight',
    },
    {
      className: 'font-primary_italic_font',
      font: 'primary',
      weight: 'italic',
    },
    {
      className: 'font-primary_light_font',
      font: 'primary',
      weight: 'light',
    },
    {
      className: 'font-primary_medium_font',
      font: 'primary',
      weight: 'medium',
    },
    {
      className: 'font-primary_regular_font',
      font: 'primary',
      weight: 'regular',
    },
    {
      className: 'font-primary_semi_bold_font',
      font: 'primary',
      weight: 'semiBold',
    },
    {
      className: 'font-primary_thin_font',
      font: 'primary',
      weight: 'thin',
    },
    {
      className: 'font-secondary_bold_font',
      font: 'secondary',
      weight: 'bold',
    },
    {
      className: 'font-secondary_light_font',
      font: 'secondary',
      weight: 'light',
    },
    {
      className: 'font-secondary_medium_font',
      font: 'secondary',
      weight: 'medium',
    },
    {
      className: 'font-secondary_regular_font',
      font: 'secondary',
      weight: 'regular',
    },
    {
      className: 'font-secondary_semi_bold_font',
      font: 'secondary',
      weight: 'semiBold',
    },
    {
      className: 'font-secondary_thin_font',
      font: 'secondary',
      weight: 'thin',
    },
    {
      className: 'font-secondary_extra_light_font',
      font: 'secondary',
      weight: 'extraLight',
    },
    {
      className: 'font-secondary_extra_bold_font',
      font: 'secondary',
      weight: 'extraBold',
    },
    {
      className: 'font-secondary_italic_font',
      font: 'secondary',
      weight: 'italic',
    },
    {
      className: 'font-tertiary_bold_font',
      font: 'tertiary',
      weight: 'bold',
    },
    {
      className: 'font-tertiary_light_font',
      font: 'tertiary',
      weight: 'light',
    },
    {
      className: 'font-tertiary_medium_font',
      font: 'tertiary',
      weight: 'medium',
    },
    {
      className: 'font-tertiary_regular_font',
      font: 'tertiary',
      weight: 'regular',
    },
    {
      className: 'font-tertiary_semi_bold_font',
      font: 'tertiary',
      weight: 'semiBold',
    },
    {
      className: 'font-tertiary_thin_font',
      font: 'tertiary',
      weight: 'thin',
    },
    {
      className: 'font-tertiary_extra_light_font',
      font: 'tertiary',
      weight: 'extraLight',
    },
    {
      className: 'font-tertiary_extra_bold_font',
      font: 'tertiary',
      weight: 'extraBold',
    },
    {
      className: 'font-tertiary_italic_font',
      font: 'tertiary',
      weight: 'italic',
    },
  ],
  variants: {
    font: {
      primary: 'font-primary_regular_font',
      secondary: 'font-secondary_regular_font',
      tertiary: 'font-tertiary_regular_font',
    },
    variant: {
      'body-1': textSize.md,
      'body-2': textSize.lg,
      'body-3': textSize.xl,
      'body-sm': textSize.sm,
      'body-xs': textSize.xs,
      'title-1': textSize['2xl'],
      'title-2': textSize['3xl'],
      'title-3': textSize['4xl'],
      'title-4': textSize['5xl'],
      'title-5': textSize['6xl'],
      'title-6': textSize['7xl'],
      'title-7': textSize['8xl'],
      'title-8': textSize['9xl'],
    },
    weight: {
      bold: 'font-bold',
      extraBold: 'font-extrabold',
      extraLight: 'font-extralight',
      italic: 'italic',
      light: 'font-light',
      medium: 'font-medium',
      regular: 'font-normal',
      semiBold: 'font-semibold',
      thin: 'font-thin',
    },
  },
});

export const textColorVr = tv({
  base: 'text-primary',
  variants: {
    color: {
      // Button text colors for text and outlined variants
      'text-button-accent-text': 'text-button-accent-text',
      'text-button-danger-text': 'text-button-danger-text',
      'text-button-dark-text': 'text-button-dark-text',
      'text-button-error-text': 'text-button-error-text',
      'text-button-info-text': 'text-button-info-text',
      'text-button-inverted-text': 'text-button-inverted-text',
      'text-button-light-text': 'text-button-light-text',
      'text-button-muted-text': 'text-button-muted-text',
      'text-button-neutral-text': 'text-button-neutral-text',
      'text-button-primary-text': 'text-button-primary-text',
      'text-button-secondary-text': 'text-button-secondary-text',
      'text-button-warning-text': 'text-button-warning-text',
      'text-button-white-text': 'text-button-white-text',
      // Background colors for button variants that use standard colors
      'text-button-accent-background': 'text-button-accent-background',
      'text-button-danger-background': 'text-button-danger-background',
      'text-button-dark-background': 'text-button-dark-background',
      'text-button-error-background': 'text-button-error-background',
      'text-button-info-background': 'text-button-info-background',
      'text-button-inverted-background': 'text-button-inverted-background',
      'text-button-light-background': 'text-button-light-background',
      'text-button-muted-background': 'text-button-muted-background',
      'text-button-neutral-background': 'text-button-neutral-background',
      'text-button-primary-background': 'text-button-primary-background',
      'text-button-secondary-background': 'text-button-secondary-background',
      'text-button-warning-background': 'text-button-warning-background',
      'text-button-white-background': 'text-button-white-background',
      // Standard text colors
      danger: 'text-danger',
      dark: 'text-black',
      disabled: 'text-disabled',
      error: 'text-error',
      info: 'text-info',
      inverted: 'text-inverted',
      light: 'text-light',
      muted: 'text-muted',
      neutral: 'text-neutral',
      primary: 'text-primary',
      secondary: 'text-secondary',
      success: 'text-success',
      tertiary: 'text-tertiary',
      warning: 'text-warning',
      white: 'text-white',
    },
  },
});

export const textPositionVr = tv({
  base: 'text-left',
  variants: {
    position: {
      center: 'text-center',
      left: 'text-left',
      right: 'text-right',
    },
  },
});
