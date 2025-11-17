import { tv } from 'tailwind-variants';

/**
 * Tailwind utility classes for Dialog component
 */
export const twStyles = {
  backdrop: 'absolute inset-0 flex-1 items-center justify-center bg-[#000]/50',
  container: 'flex-1 items-center justify-center',
  dialogBase: 'relative w-5/6 border bg-[#FFF] rounded-lg',
  footer: 'flex-row justify-between items-center border-t border-[#E5E7EB] px-3 py-2',
  title: 'font-semibold',
  triggerBase: 'self-start',
};

export const dialogHeaderTv = tv({
  base: 'relative flex-row items-center',
  compoundVariants: [
    {
      children: true,
      className: 'border-b border-[#E5E7EB] px-3 py-2 justify-between',
      hasCloseMark: true,
    },
    {
      children: true,
      className: 'border-b border-[#E5E7EB] px-3 py-2',
      hasCloseMark: false,
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
    size: 'md',
  },
  variants: {
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
