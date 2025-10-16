import { tv } from 'tailwind-variants';

export const twStyles = {
  keyboardAvoidingView: 'flex-1',
  safeArea: 'z-50 flex-1 px-3',
  scrollView: 'flex-grow',
};

export const wrapperTv = tv({
  compoundVariants: [
    {
      className: 'flex-grow flex-none',
      fill: true,
      grow: true,
    },
  ],
  defaultVariants: {
    fill: true,
    px: 'md',
  },
  variants: {
    fill: {
      true: 'flex-1',
    },
    grow: {
      true: 'flex-grow',
    },
    px: {
      lg: 'px-[24px]',
      md: 'px-[16px]',
      none: 'px-0',
      sm: 'px-[8px]',
      xl: 'px-[32px]',
      xs: 'px-[4px]',
    },
  },
});
