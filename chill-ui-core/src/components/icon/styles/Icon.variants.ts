import { tv } from 'tailwind-variants';

// Icon size variants
export const iconSizeTv = tv({
  base: 'w-[24px] h-[24px]',
  variants: {
    size: {
      '2xl': 'w-[36px] h-[36px]',
      '2xs': 'w-[12px] h-[12px]',
      '3xl': 'w-[40px] h-[40px]',
      lg: 'w-[28px] h-[28px]',
      md: 'w-[24px] h-[24px]',
      sm: 'w-[20px] h-[20px]',
      xl: 'w-[32px] h-[32px]',
      xs: 'w-[16px] h-[16px]',
    },
  },
});

// Icon padding variants for press effect
export const iconPaddingTv = tv({
  base: 'p-[8px]',
  variants: {
    size: {
      '2xl': 'p-[20px]',
      '2xs': 'p-[1px]',
      '3xl': 'p-[24px]',
      lg: 'p-[12px]',
      md: 'p-[8px]',
      sm: 'p-[6px]',
      xl: 'p-[16px]',
      xs: 'p-[2px]',
    },
  },
});

export const iconPressableTv = tv({
  base: 'rounded-full',
  variants: {
    hasPressEffect: {
      true: 'active:bg-[rgba(0,0,0,0.1)]',
    },
  },
});

export const iconClassname = 'self-start';
