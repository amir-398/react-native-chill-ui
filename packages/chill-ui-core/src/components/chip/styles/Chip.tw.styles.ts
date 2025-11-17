import { tv } from 'tailwind-variants';

export const twStyles = {
  chip: 'px-3 py-2 rounded-[6px]',
  chipWithIcons: 'flex-row items-center',
  iconLeft: 'mr-1.5',
  iconRight: 'ml-1.5',
  pointerEventsNone: 'pointer-events-none',
};

export const chipTv = tv({
  compoundVariants: [
    // Outlined variants
    {
      className: 'bg-transparent border-chip-accent-background',
      colorVariant: 'accent',
      variant: 'outlined',
    },
    {
      className: 'bg-transparent border-chip-danger-background',
      colorVariant: 'danger',
      variant: 'outlined',
    },
    {
      className: 'bg-transparent border-chip-dark-background',
      colorVariant: 'dark',
      variant: 'outlined',
    },
    {
      className: 'bg-transparent border-chip-disabled-background',
      colorVariant: 'disabled',
      variant: 'outlined',
    },
    {
      className: 'bg-transparent border-chip-error-background',
      colorVariant: 'error',
      variant: 'outlined',
    },
    {
      className: 'bg-transparent border-chip-info-background',
      colorVariant: 'info',
      variant: 'outlined',
    },
    {
      className: 'bg-transparent border-chip-inverted-background',
      colorVariant: 'inverted',
      variant: 'outlined',
    },
    {
      className: 'bg-transparent border-chip-light-background',
      colorVariant: 'light',
      variant: 'outlined',
    },
    {
      className: 'bg-transparent border-chip-muted-background',
      colorVariant: 'muted',
      variant: 'outlined',
    },
    {
      className: 'bg-transparent border-chip-neutral-background',
      colorVariant: 'neutral',
      variant: 'outlined',
    },
    {
      className: 'bg-transparent border-chip-primary-background',
      colorVariant: 'primary',
      variant: 'outlined',
    },
    {
      className: 'bg-transparent border-chip-secondary-background',
      colorVariant: 'secondary',
      variant: 'outlined',
    },
    {
      className: 'bg-transparent border-chip-warning-background',
      colorVariant: 'warning',
      variant: 'outlined',
    },
    {
      className: 'bg-transparent border-chip-white-background',
      colorVariant: 'white',
      variant: 'outlined',
    },
  ],
  defaultVariants: {
    colorVariant: 'primary',
    size: 'md',
    variant: 'contained',
  },
  variants: {
    colorVariant: {
      accent: 'bg-chip-accent-background',
      danger: 'bg-chip-danger-background',
      dark: 'bg-chip-dark-background',
      disabled: 'bg-chip-disabled-background',
      error: 'bg-chip-error-background',
      info: 'bg-chip-info-background',
      inverted: 'bg-chip-inverted-background',
      light: 'bg-chip-light-background',
      muted: 'bg-chip-muted-background',
      neutral: 'bg-chip-neutral-background',
      primary: 'bg-chip-primary-background',
      secondary: 'bg-chip-secondary-background',
      warning: 'bg-chip-warning-background',
      white: 'bg-chip-white-background',
    },
    position: {
      center: 'self-center',
      left: 'self-start',
      right: 'self-end',
    },
    variant: {
      contained: '',
      outlined: 'border',
    },
  },
});

export const chipTextTv = tv({
  base: '',
  compoundVariants: [
    // Pour outlined, utilise la couleur de fond (même que la bordure)
    {
      className: 'text-chip-accent-background',
      colorVariant: 'accent',
      variant: 'outlined',
    },
    {
      className: 'text-chip-danger-background',
      colorVariant: 'danger',
      variant: 'outlined',
    },
    {
      className: 'text-chip-dark-background',
      colorVariant: 'dark',
      variant: 'outlined',
    },
    {
      className: 'text-chip-disabled-background',
      colorVariant: 'disabled',
      variant: 'outlined',
    },
    {
      className: 'text-chip-error-background',
      colorVariant: 'error',
      variant: 'outlined',
    },
    {
      className: 'text-chip-info-background',
      colorVariant: 'info',
      variant: 'outlined',
    },
    {
      className: 'text-chip-inverted-background',
      colorVariant: 'inverted',
      variant: 'outlined',
    },
    {
      className: 'text-chip-light-background',
      colorVariant: 'light',
      variant: 'outlined',
    },
    {
      className: 'text-chip-muted-background',
      colorVariant: 'muted',
      variant: 'outlined',
    },
    {
      className: 'text-chip-neutral-background',
      colorVariant: 'neutral',
      variant: 'outlined',
    },
    {
      className: 'text-chip-primary-background',
      colorVariant: 'primary',
      variant: 'outlined',
    },
    {
      className: 'text-chip-secondary-background',
      colorVariant: 'secondary',
      variant: 'outlined',
    },
    {
      className: 'text-chip-warning-background',
      colorVariant: 'warning',
      variant: 'outlined',
    },
    {
      className: 'text-chip-white-background',
      colorVariant: 'white',
      variant: 'outlined',
    },
  ],
  variants: {
    colorVariant: {
      accent: 'text-chip-accent-text',
      danger: 'text-chip-danger-text',
      dark: 'text-chip-dark-text',
      disabled: 'text-chip-disabled-text',
      error: 'text-chip-error-text',
      info: 'text-chip-info-text',
      inverted: 'text-chip-inverted-text',
      light: 'text-chip-light-text',
      muted: 'text-chip-muted-text',
      neutral: 'text-chip-neutral-text',
      primary: 'text-chip-primary-text',
      secondary: 'text-chip-secondary-text',
      warning: 'text-chip-warning-text',
      white: 'text-chip-white-text',
    },
    variant: {
      contained: '',
      outlined: '',
    },
  },
});
