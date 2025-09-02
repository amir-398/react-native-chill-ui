import { tv } from 'tailwind-variants';

export const heightVr = tv({
  base: 'h-[40px]',
  variants: {
    size: {
      '2xl': 'h-[64px]',
      '2xs': 'h-[28px]',
      lg: 'h-[48px]',
      md: 'h-[40px]',
      sm: 'h-[36px]',
      xl: 'h-[56px]',
      xs: 'h-[32px]',
    },
  },
});

// Button variant styles (contained/outlined/text)
export const btnVariant = tv({
  base: 'border-2',
  variants: {
    variant: {
      contained: 'border-transparent',
      outlined: 'bg-transparent border-current',
      text: 'bg-transparent border-transparent',
    },
  },
});

// Button color variants (primary/secondary/error/etc.)
export const btnColorVariant = tv({
  base: '',
  compoundVariants: [
    // Outlined variants
    {
      className: 'text-button-accent-background border-button-accent-background bg-transparent',
      colorVariant: 'accent',
      variant: 'outlined',
    },
    {
      className: 'text-button-dark-background border-button-dark-background bg-transparent',
      colorVariant: 'dark',
      variant: 'outlined',
    },
    {
      className: 'text-button-error-background border-button-error-background bg-transparent',
      colorVariant: 'error',
      variant: 'outlined',
    },
    {
      className: 'text-button-info-background border-button-info-background bg-transparent',
      colorVariant: 'info',
      variant: 'outlined',
    },
    {
      className: 'text-button-light-background border-button-light-background bg-transparent',
      colorVariant: 'light',
      variant: 'outlined',
    },
    {
      className: 'text-button-primary-background border-button-primary-background bg-transparent',
      colorVariant: 'primary',
      variant: 'outlined',
    },
    {
      className: 'text-button-secondary-background border-button-secondary-background bg-transparent',
      colorVariant: 'secondary',
      variant: 'outlined',
    },
    {
      className: 'text-success border-success bg-transparent',
      colorVariant: 'success',
      variant: 'outlined',
    },
    {
      className: 'text-button-warning-background border-button-warning-background bg-transparent',
      colorVariant: 'warning',
      variant: 'outlined',
    },
    {
      className: 'text-button-danger-background border-button-danger-background bg-transparent',
      colorVariant: 'danger',
      variant: 'outlined',
    },
    {
      className: 'text-button-neutral-background border-button-neutral-background bg-transparent',
      colorVariant: 'neutral',
      variant: 'outlined',
    },
    {
      className: 'text-button-muted-background border-button-muted-background bg-transparent',
      colorVariant: 'muted',
      variant: 'outlined',
    },
    {
      className: 'text-tertiary border-tertiary bg-transparent',
      colorVariant: 'tertiary',
      variant: 'outlined',
    },
    {
      className: 'text-button-inverted-background border-button-inverted-background bg-transparent',
      colorVariant: 'inverted',
      variant: 'outlined',
    },
    {
      className: 'text-button-white-background border-button-white-background bg-transparent',
      colorVariant: 'white',
      variant: 'outlined',
    },
    // Text variants
    {
      className: 'text-button-accent-background bg-transparent',
      colorVariant: 'accent',
      variant: 'text',
    },
    {
      className: 'text-button-dark-background bg-transparent',
      colorVariant: 'dark',
      variant: 'text',
    },
    {
      className: 'text-button-error-background bg-transparent',
      colorVariant: 'error',
      variant: 'text',
    },
    {
      className: 'text-button-info-background bg-transparent',
      colorVariant: 'info',
      variant: 'text',
    },
    {
      className: 'text-button-light-background bg-transparent',
      colorVariant: 'light',
      variant: 'text',
    },
    {
      className: 'text-button-primary-background bg-transparent',
      colorVariant: 'primary',
      variant: 'text',
    },
    {
      className: 'text-button-secondary-background bg-transparent',
      colorVariant: 'secondary',
      variant: 'text',
    },
    {
      className: 'text-success bg-transparent',
      colorVariant: 'success',
      variant: 'text',
    },
    {
      className: 'text-button-warning-background bg-transparent',
      colorVariant: 'warning',
      variant: 'text',
    },
    {
      className: 'text-button-danger-background bg-transparent',
      colorVariant: 'danger',
      variant: 'text',
    },
    {
      className: 'text-button-neutral-background bg-transparent',
      colorVariant: 'neutral',
      variant: 'text',
    },
    {
      className: 'text-button-muted-background bg-transparent',
      colorVariant: 'muted',
      variant: 'text',
    },
    {
      className: 'text-tertiary bg-transparent',
      colorVariant: 'tertiary',
      variant: 'text',
    },
    {
      className: 'text-button-inverted-background bg-transparent',
      colorVariant: 'inverted',
      variant: 'text',
    },
    {
      className: 'text-button-white-background bg-transparent',
      colorVariant: 'white',
      variant: 'text',
    },
  ],
  variants: {
    colorVariant: {
      accent: 'bg-button-accent-background text-button-accent-text',
      danger: 'bg-button-danger-background text-button-danger-text',
      dark: 'bg-button-dark-background text-button-dark-text',
      error: 'bg-button-error-background text-button-error-text',
      info: 'bg-button-info-background text-button-info-text',
      inverted: 'bg-button-inverted-background text-button-inverted-text',
      light: 'bg-button-light-background text-button-light-text',
      muted: 'bg-button-muted-background text-button-muted-text',
      neutral: 'bg-button-neutral-background text-button-neutral-text',
      primary: 'bg-button-primary-background text-button-primary-text',
      secondary: 'bg-button-secondary-background text-button-secondary-text',
      success: 'bg-success text-white',
      tertiary: 'bg-tertiary text-dark',
      warning: 'bg-button-warning-background text-button-warning-text',
      white: 'bg-button-white-background text-button-white-text',
    },
    variant: {
      contained: '',
      outlined: '',
      text: '',
    },
  },
});

// position Tailwind Variants
export const positionVr = tv({
  base: 'self-center',
  variants: {
    position: {
      center: 'self-center',
      left: 'self-start',
      right: 'self-end',
    },
  },
});

// opacity Tailwind Variants
export const opacityVariant = tv({
  base: 'opacity-100',
  variants: {
    disabled: {
      true: 'opacity-40',
    },
    loading: {
      true: 'opacity-40',
    },
  },
});

// contentPosition Tailwind Variants
export const contentPositionVr = tv({
  base: 'self-center',
  variants: {
    contentPosition: {
      center: 'self-center',
      left: 'self-start',
      right: 'self-end',
    },
  },
});
