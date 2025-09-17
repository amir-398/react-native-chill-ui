import { tv } from 'tailwind-variants';

const dialogVariants = tv({
  base: 'relative w-5/6 border bg-[#FFF]',
  defaultVariants: {
    rounded: 'lg',
    size: 'md',
  },
  variants: {
    rounded: {
      '2xl': 'rounded-2xl',
      '3xl': 'rounded-3xl',
      full: 'rounded-full',
      lg: 'rounded-lg',
      md: 'rounded-md',
      sm: 'rounded-sm',
      xl: 'rounded-xl',
    },
    size: {
      full: 'w-full',
      lg: 'w-4/5',
      md: 'w-5/6',
      sm: 'w-4/6',
      xl: 'w-11/12',
    },
  },
});

const dialogBackdropVariants = tv({
  base: 'absolute inset-0 flex-1 items-center justify-center bg-[rgba(0,0,0,0.5)]',
});

const closeMarkPositionVariants = tv({
  defaultVariants: {
    position: 'right',
  },
  variants: {
    position: {
      left: 'left-2',
      right: 'right-2',
    },
  },
});

export { dialogBackdropVariants, closeMarkPositionVariants };
export default dialogVariants;
