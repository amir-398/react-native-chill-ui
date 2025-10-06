import { tv } from 'tailwind-variants';

/**
 * Tailwind utility classes for Dialog component
 */
export const twStyles = {
  backdrop: 'absolute inset-0 flex-1 items-center justify-center bg-black/50',
  container: 'flex-1 items-center justify-center',
  dialogBase: 'relative w-5/6 border bg-[#FFF]',
  footer: 'border-t border-gray-200 px-6 py-3',
  title: 'font-semibold',
  triggerBase: 'relative z-50',
  triggerRipple: 'bg-white',
};

export const dialogHeaderTv = tv({
  base: 'relative flex-row items-center',
  compoundVariants: [
    {
      children: true,
      className: 'relative border-b border-[#E5E7EB] px-6 py-3 flex-row items-center justify-between',
      hasCloseMark: true,
    },
    {
      children: false,
      className: 'justify-end border-b-0 px-1 py-1',
      hasCloseMark: true,
    },
  ],
  variants: {
    children: {
      false: '',
      true: '',
    },
    hasCloseMark: {
      false: '',
      true: '',
    },
  },
});

/**
 * Dialog variants using tailwind-variants
 */
export const dialogTv = tv({
  base: twStyles.dialogBase,
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

/**
 * Close mark position variants
 */
export const closeMarkPositionTv = tv({
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
