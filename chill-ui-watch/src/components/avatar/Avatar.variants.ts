import { tv } from 'tailwind-variants';

export const sizeVariant = tv({
  base: 'size-9',
  variants: {
    size: {
      '2xl': 'size-[112px]',
      '2xs': 'size-[24px]',
      '3xl': 'size-[128px]',
      lg: 'size-[64px]',
      md: 'size-[56px]',
      sm: 'size-[48px]',
      xl: 'size-[80px]',
      xs: 'size-[36px]',
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
