import type { VariantProps } from 'tailwind-variants';

import WrapperVariants from '../components/wrapper/styleVariants';

/**
 * Props for the Wrapper component
 */
export interface WrapperProps {
  /** Custom CSS classes for the wrapper */
  className?: string;
  /** Whether to use ScrollView */
  scrollView?: boolean;
  /** Whether to center items */
  itemsCenter?: boolean;
  /** Whether to use SafeAreaView */
  safeAreaView?: boolean;
  /** Whether to justify content between */
  justifyBetween?: boolean;
  /** Content to wrap */
  children: React.ReactNode;
  /** Whether nested scrolling is enabled */
  nestedScrollEnabled?: boolean;
  /** Whether to use KeyboardAvoidingView */
  keyboardAvoidingView?: boolean;
  /** Whether to use KeyboardAwareScrollView */
  keyboardAwareScrollView?: boolean;
  /** Horizontal padding variant */
  px?: VariantProps<typeof WrapperVariants>['px'];
  /** Vertical padding variant */
  py?: VariantProps<typeof WrapperVariants>['py'];
  /** Vertical margin variant */
  my?: VariantProps<typeof WrapperVariants>['my'];
  /** Top padding variant */
  pt?: VariantProps<typeof WrapperVariants>['pt'];
  /** Safe area edges to apply */
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
}
