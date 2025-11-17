import { tv } from 'tailwind-variants';

export const skeletonTv = tv({
  base: 'bg-gray-300 animate-pulse',
  compoundVariants: [
    { class: 'h-16', size: 'xs', variant: 'rectangle' },
    { class: 'h-24', size: 'sm', variant: 'rectangle' },
    { class: 'h-32', size: 'md', variant: 'rectangle' },
    { class: 'h-48', size: 'lg', variant: 'rectangle' },
    { class: 'h-64', size: 'xl', variant: 'rectangle' },

    { class: 'w-16 h-16', size: 'xs', variant: 'square' },
    { class: 'w-24 h-24', size: 'sm', variant: 'square' },
    { class: 'w-32 h-32', size: 'md', variant: 'square' },
    { class: 'w-48 h-48', size: 'lg', variant: 'square' },
    { class: 'w-64 h-64', size: 'xl', variant: 'square' },

    { class: 'w-16 h-16', size: 'xs', variant: 'circle' },
    { class: 'w-24 h-24', size: 'sm', variant: 'circle' },
    { class: 'w-32 h-32', size: 'md', variant: 'circle' },
    { class: 'w-48 h-48', size: 'lg', variant: 'circle' },
    { class: 'w-64 h-64', size: 'xl', variant: 'circle' },

    { class: 'h-4', size: 'xs', variant: 'text' },
    { class: 'h-5', size: 'sm', variant: 'text' },
    { class: 'h-6', size: 'md', variant: 'text' },
    { class: 'h-7', size: 'lg', variant: 'text' },
    { class: 'h-8', size: 'xl', variant: 'text' },
  ],
  defaultVariants: {
    size: 'md',
    variant: 'rectangle',
  },
  variants: {
    size: {
      lg: 'h-48',
      md: 'h-32',
      sm: 'h-24',
      xl: 'h-64',
      xs: 'h-16',
    },
    variant: {
      circle: 'size-16 rounded-full',
      rectangle: 'w-full rounded-lg',
      square: 'size-16 rounded-lg',
      text: 'w-full rounded-sm',
    },
  },
});
