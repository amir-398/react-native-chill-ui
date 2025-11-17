import { tv } from 'tailwind-variants';

// Main Button Tailwind Variant
export const ButtonTv = tv({
  base: 'items-center justify-center rounded-lg border-2',
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
    position: {
      auto: 'self-auto',
      center: 'self-center',
      left: 'self-start',
      right: 'self-end',
    },
    size: {
      '2xl': 'h-[64px]',
      '2xs': 'h-[28px]',
      lg: 'h-[48px]',
      md: 'h-[40px]',
      sm: 'h-[36px]',
      xl: 'h-[56px]',
      xs: 'h-[32px]',
    },
    variant: {
      contained: 'border-transparent',
      outlined: 'bg-transparent',
      text: 'bg-transparent border-transparent',
    },
  },
});

// Icon Position Tailwind Variants
export const IconPositionTv = tv({
  compoundVariants: [
    {
      className: 'left-3',
      isAbsolute: true,
      position: 'left',
    },
    {
      className: 'right-3',
      isAbsolute: true,
      position: 'right',
    },
    {
      className: 'mr-2',
      isAbsolute: false,
      position: 'left',
    },
    {
      className: 'ml-2',
      isAbsolute: false,
      position: 'right',
    },
  ],
  variants: {
    isAbsolute: {
      true: 'absolute',
    },
    position: {
      center: '',
      left: '',
      right: '',
    },
  },
});

export const twStyles = {
  contentContainer: 'w-full flex-row items-center px-3 ',
  loadingContainer: 'flex-1 justify-center items-center pointer-events-none',
  pointerEventsNone: 'pointer-events-none',
  stringContainer: 'flex-1 pointer-events-none',
};
