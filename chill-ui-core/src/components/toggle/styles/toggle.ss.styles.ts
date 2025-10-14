import { sv } from '@utils';

export const toggleSv = sv({
  variants: {
    defaultVariants: {
      size: {
        transform: [{ scale: 1 }],
      },
    },
    isDisabled: {
      true: { opacity: 0.5 },
    },
    isLoading: {
      true: { opacity: 0.5 },
    },
    size: {
      lg: {
        transform: [{ scale: 1.1 }],
      },
      md: {
        transform: [{ scale: 1 }],
      },
      sm: {
        transform: [{ scale: 0.9 }],
      },
      xl: {
        transform: [{ scale: 1.2 }],
      },
      xs: {
        transform: [{ scale: 0.8 }],
      },
    },
  },
});
