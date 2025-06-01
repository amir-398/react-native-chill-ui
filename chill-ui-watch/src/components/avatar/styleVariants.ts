import { tv } from 'tailwind-variants';

export const sizeVariant = tv({
  base: 'size-9',
  variants: {
    size: {
      '2xl': 'size-28',
      '2xs': 'size-6',
      '3xl': 'size-32',
      lg: 'size-16',
      md: 'size-14',
      sm: 'size-12',
      xl: 'size-20',
      xs: 'size-9',
    },
  },
});

export const avatarVariants = tv({
  variants: {
    variant: {
      circle: 'rounded-full',
      square: 'rounded-lg',
    },
  },
});
