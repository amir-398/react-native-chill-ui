import { tv } from 'tailwind-variants';

/**
 * Tailwind variants for Wrapper component styling.
 * Provides flexible padding and margin options with consistent spacing.
 *
 * @example
 * ```tsx
 * // Default wrapper with px-4
 * <Wrapper>Content</Wrapper>
 *
 * // Custom padding
 * <Wrapper px={6} py={8}>Content</Wrapper>
 *
 * // Margin variants
 * <Wrapper my={4} px={3}>Content</Wrapper>
 * ```
 */
export default tv({
  /** Base styles applied to all wrapper variants */
  base: 'flex-grow',

  /** Default variants applied when no props are provided */
  defaultVariants: {
    px: true,
  },

  /** Available styling variants */
  variants: {
    /** Margin on Y-axis (top and bottom) */
    my: {
      1: 'my-1',
      10: 'my-10',
      2: 'my-2',
      3: 'my-3',
      4: 'my-4',
      5: 'my-5',
      6: 'my-6',
      7: 'my-7',
      8: 'my-8',
      9: 'my-9',
      true: 'my-4',
    },

    /** Padding on top */
    pt: {
      1: 'pt-1',
      10: 'pt-10',
      2: 'pt-2',
      3: 'pt-3',
      4: 'pt-4',
      5: 'pt-5',
      6: 'pt-6',
      7: 'pt-7',
      8: 'pt-8',
      9: 'pt-9',
      true: 'pt-4',
    },

    /** Padding on X-axis (left and right) */
    px: {
      1: 'px-1',
      10: 'px-10',
      2: 'px-2',
      3: 'px-3',
      4: 'px-4',
      5: 'px-5',
      6: 'px-6',
      7: 'px-7',
      8: 'px-8',
      9: 'px-9',
      true: 'px-4',
    },

    /** Padding on Y-axis (top and bottom) */
    py: {
      1: 'py-1',
      10: 'py-10',
      2: 'py-2',
      3: 'py-3',
      4: 'py-4',
      5: 'py-5',
      6: 'py-6',
      7: 'py-7',
      8: 'py-8',
      9: 'py-9',
      true: 'py-4',
    },
  },
});
