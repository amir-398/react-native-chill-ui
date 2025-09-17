import { tv } from 'tailwind-variants';

/**
 * Tailwind variants for input sizing and styling
 */
const inputSizeVariants = tv({
  compoundVariants: [
    // Multiline and stretchable
    {
      className: 'min-h-28  text-[16px]',
      isStretchable: true,
      multiline: true,
      size: 'lg',
    },
    {
      className: 'min-h-24 text-[16px]',
      isStretchable: true,
      multiline: true,
      size: 'md',
    },
    {
      className: 'min-h-20 text-[16px]',
      isStretchable: true,
      multiline: true,
      size: 'sm',
    },
    {
      className: 'min-h-16 text-[16px]',
      isStretchable: true,
      multiline: true,
      size: 'xs',
    },
    // Multiline and not stretchable
    {
      className: 'h-40 text-[16px]',
      isStretchable: false,
      multiline: true,
      size: 'md',
    },
    {
      className: 'h-32 text-[16px]',
      isStretchable: false,
      multiline: true,
      size: 'sm',
    },
    {
      className: 'h-28 text-[16px]',
      isStretchable: false,
      multiline: true,
      size: 'xs',
    },
    {
      className: 'h-52',
      isStretchable: false,
      multiline: true,
      size: 'lg',
    },
    // sigle line and not stretchable
    {
      className: 'h-16 ',
      isStretchable: false,
      multiline: false,
      size: 'lg',
    },
    {
      className: 'h-14',
      isStretchable: false,
      multiline: false,
      size: 'md',
    },
    {
      className: 'h-12',
      isStretchable: false,
      multiline: false,
      size: 'sm',
    },
    {
      className: 'h-10 ',
      isStretchable: false,
      multiline: false,
      size: 'xs',
    },
  ],
  variants: {
    isStretchable: { true: 'leading-6 py-2' },
    multiline: { true: 'leading-6 py-2' },
    size: {
      lg: 'text-[18px]',
      md: 'text-[16px]',
      sm: 'text-[14px]',
      xs: 'text-[13px]',
    },
  },
});

export default inputSizeVariants;
