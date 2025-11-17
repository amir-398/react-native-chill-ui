import { tv } from 'tailwind-variants';

export const toggleTv = tv({
  defaultVariants: {
    size: 'md',
  },
  variants: {
    isDisabled: {
      true: 'opacity-50',
    },
    isLoading: {
      true: 'opacity-50',
    },
    size: {
      lg: 'scale-[1.1]',
      md: 'scale-[1]',
      sm: 'scale-[0.9]',
      xl: 'scale-[1.2]',
      xs: 'scale-[0.8]',
    },
  },
});
