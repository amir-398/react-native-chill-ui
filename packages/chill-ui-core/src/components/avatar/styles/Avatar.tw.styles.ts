import { tv } from 'tailwind-variants';

export const avatarTv = tv({
  base: 'bg-[#7DD3FC] items-center justify-center overflow-hidden',
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
    variant: {
      circle: 'rounded-full',
      square: 'rounded-lg',
    },
  },
});

export const twStyles = {
  avatarImage: 'absolute h-full w-full',
};
