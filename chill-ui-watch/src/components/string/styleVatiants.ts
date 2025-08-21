import { tv } from 'tailwind-variants';

export const textSizeVr = tv({
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
      'body-1': 'text-base',
      'body-2': 'text-lg',
      'body-3': 'text-xl',
      'body-sm': 'text-sm',
      'body-xs': 'text-xs',
      'title-1': 'text-2xl',
      'title-2': 'text-3xl',
      'title-3': 'text-4xl',
      'title-4': 'text-5xl',
      'title-5': 'text-6xl',
      'title-6': 'text-7xl',
      'title-7': 'text-8xl',
      'title-8': 'text-9xl',
    },
    weight: {
      bold: 'font-primary_bold_font font-bold',
      extraBold: 'font-primary_extra_bold_font font-extrabold',
      extraLight: 'font-primary_extra_light_font font-extralight',
      italic: 'font-primary_italic_font',
      light: 'font-primary_light_font font-light',
      medium: 'font-primary_medium_font font-medium',
      regular: 'font-primary_regular_font font-normal',
      semiBold: 'font-primary_semi_bold_font font-semibold',
      thin: 'font-primary_thin_font font-thin',
    },
  },
});

export const textColorVr = tv({
  base: 'text-primary',
  variants: {
    color: {
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
