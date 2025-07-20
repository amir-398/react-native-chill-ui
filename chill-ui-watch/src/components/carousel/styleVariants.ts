import { tv } from 'tailwind-variants';

export const dotVariant = tv({
  variants: {
    gap: {
      lg: 'gap-6',
      md: 'gap-4',
      sm: 'gap-2',
      xl: 'gap-8',
    },
  },
});

export const dotPositionVariants = tv({
  variants: {
    position: {
      bottom: 'bottom-0',
      top: 'top-0',
    },
  },
});
