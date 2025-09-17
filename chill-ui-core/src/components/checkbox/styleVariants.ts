import { tv } from 'tailwind-variants';

export const checkboxSizeVariants = tv({
  variants: {
    size: {
      '2xl': 'size-7',
      '2xs': 'size-2',
      '3xl': 'size-8',
      lg: 'size-6',
      md: 'size-5',
      sm: 'size-4',
      xl: 'size-8',
      xs: 'size-3',
    },
  },
});

export const checkboxVariants = tv({
  variants: {
    variant: {
      circle: 'rounded-full',
      square: 'rounded',
    },
  },
});
