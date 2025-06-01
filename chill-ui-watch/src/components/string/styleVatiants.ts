import { tv } from 'tailwind-variants';

export const textSizeVr = tv({
  base: 'text-lg',
  variants: {
    size: {
      '2xl': 'text-3xl',
      '2xs': 'text-xs',
      '3xl': 'text-4xl',
      '4xl': 'text-5xl leading-snug',
      lg: 'text-xl',
      md: 'text-lg',
      sm: 'text-base',
      xl: 'text-2xl',
      xs: 'text-sm',
    },
  },
});

export const textFontVr = tv({
  base: 'font-primary',
  compoundVariants: [
    {
      className: 'font-primaryBold',
      font: 'primary',
      weight: 'bold',
    },
    {
      className: 'font-primaryLight',
      font: 'primary',
      weight: 'light',
    },
    {
      className: 'font-primaryMedium',
      font: 'primary',
      weight: 'medium',
    },
    {
      className: 'font-primary',
      font: 'primary',
      weight: 'regular',
    },
    {
      className: 'font-primarySemiBold',
      font: 'primary',
      weight: 'semiBold',
    },
    {
      className: 'font-secondaryBold',
      font: 'secondary',
      weight: 'bold',
    },
    {
      className: 'font-secondaryLight',
      font: 'secondary',
      weight: 'light',
    },
    {
      className: 'font-secondaryMedium',
      font: 'secondary',
      weight: 'medium',
    },
    {
      className: 'font-secondary',
      font: 'secondary',
      weight: 'regular',
    },
    {
      className: 'font-secondarySemiBold',
      font: 'secondary',
      weight: 'semiBold',
    },
    {
      className: 'font-tertiaryBold',
      font: 'tertiary',
      weight: 'bold',
    },
    {
      className: 'font-tertiaryLight',
      font: 'tertiary',
      weight: 'light',
    },
    {
      className: 'font-tertiaryMedium',
      font: 'tertiary',
      weight: 'medium',
    },
    {
      className: 'font-tertiary',
      font: 'tertiary',
      weight: 'regular',
    },
    {
      className: 'font-tertiarySemiBold',
      font: 'tertiary',
      weight: 'semiBold',
    },
  ],
  variants: {
    font: {
      primary: 'font-primary',
      secondary: 'font-secondary',
      tertiary: 'font-tertiary',
    },
    weight: {
      bold: 'font-bold',
      light: 'font-light',
      medium: 'font-medium',
      regular: 'font-regular',
      semiBold: 'font-semibold',
    },
  },
});

export const textColorVr = tv({
  base: 'text-primary',
  variants: {
    color: {
      danger: 'text-danger',
      dark: 'text-black',
      error: 'text-error',
      info: 'text-info',
      light: 'text-light',
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

export const textVariantVr = tv({
  base: 'body-1',
  variants: {
    variant: {
      'body-1': 'text-lg font-primary',
      'body-2': 'text-base font-primary',
      'body-3': 'text-sm font-primary',
      'body-4': 'text-xs font-primary',
      'body-xl': 'text-xl font-primary',
      'subtitle-1': 'text-lg font-primaryBold',
      'subtitle-2': 'text-base font-primaryBold',
      'subtitle-3': 'text-sm font-primaryBold',
      'subtitle-4': 'text-xs font-primaryBold',
      'title-1': 'text-4xl font-primaryBold',
      'title-2': 'text-2xl font-primaryBold',
      'title-3': 'text-xl font-primaryBold',
      'title-4': 'text-lg font-primaryBold',
    },
  },
});
