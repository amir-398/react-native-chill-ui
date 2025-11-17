import { tv } from 'tailwind-variants';

export const twStyles = {
  pointerEventsNone: 'pointer-events-none',
};

export const buttonIconTv = tv({
  base: 'bg-button-primary-background items-center justify-center rounded-md p-2 self-start border-2',
  compoundVariants: [
    // Outlined variants
    {
      className: 'border-button-accent-background',
      colorVariant: 'accent',
      variant: 'outlined',
    },
    {
      className: 'border-button-dark-background',
      colorVariant: 'dark',
      variant: 'outlined',
    },
    {
      className: 'border-button-error-background',
      colorVariant: 'error',
      variant: 'outlined',
    },
    {
      className: 'border-button-info-background',
      colorVariant: 'info',
      variant: 'outlined',
    },
    {
      className: 'border-button-light-background',
      colorVariant: 'light',
      variant: 'outlined',
    },
    {
      className: 'border-button-primary-background',
      colorVariant: 'primary',
      variant: 'outlined',
    },
    {
      className: 'border-button-secondary-background',
      colorVariant: 'secondary',
      variant: 'outlined',
    },
    {
      className: 'border-button-success-background',
      colorVariant: 'success',
      variant: 'outlined',
    },
    {
      className: 'border-button-warning-background',
      colorVariant: 'warning',
      variant: 'outlined',
    },
    {
      className: 'border-button-danger-background',
      colorVariant: 'danger',
      variant: 'outlined',
    },
    {
      className: 'border-button-neutral-background',
      colorVariant: 'neutral',
      variant: 'outlined',
    },
    {
      className: 'border-button-muted-background',
      colorVariant: 'muted',
      variant: 'outlined',
    },
    {
      className: 'border-button-tertiary-background',
      colorVariant: 'tertiary',
      variant: 'outlined',
    },
    {
      className: 'border-button-inverted-background',
      colorVariant: 'inverted',
      variant: 'outlined',
    },
    {
      className: 'border-button-white-background',
      colorVariant: 'white',
      variant: 'outlined',
    },
  ],
  variants: {
    colorVariant: {
      accent: 'bg-button-accent-background',
      danger: 'bg-button-danger-background',
      dark: 'bg-button-dark-background',
      error: 'bg-button-error-background',
      info: 'bg-button-info-background',
      inverted: 'bg-button-inverted-background',
      light: 'bg-button-light-background',
      muted: 'bg-button-muted-background',
      neutral: 'bg-button-neutral-background',
      primary: 'bg-button-primary-background',
      secondary: 'bg-button-secondary-background',
      success: 'bg-button-success-background',
      tertiary: 'bg-button-tertiary-background',
      warning: 'bg-button-warning-background',
      white: 'bg-button-white-background',
    },
    isDisabled: {
      true: 'opacity-[0.4]',
    },
    isLoading: {
      true: 'opacity-[0.4]',
    },
    rounded: {
      circle: 'rounded-full',
      square: 'rounded-md',
    },

    variant: {
      contained: 'border-transparent',
      outlined: 'bg-transparent',
    },
  },
});
