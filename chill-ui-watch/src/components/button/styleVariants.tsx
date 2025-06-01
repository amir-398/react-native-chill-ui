import { tv } from 'tailwind-variants';

export const heightVr = tv({
  base: 'h-16',
  variants: {
    size: {
      '2xl': 'h-32',
      '2xs': 'h-8',
      lg: 'h-20',
      md: 'h-16',
      sm: 'h-14',
      xl: 'h-24',
      xs: 'h-10',
    },
  },
});

// background color Tailwind Variants
export const btnVariant = tv({
  base: 'bg-primary',
  variants: {
    variant: {
      accent: 'bg-accent',
      dark: 'bg-dark',
      error: 'bg-error',
      info: 'bg-info',
      light: 'bg-light',
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      success: 'bg-success',
      warning: 'bg-warning',
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
