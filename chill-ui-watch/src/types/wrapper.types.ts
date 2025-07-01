import type { VariantProps } from 'tailwind-variants';

import WrapperVariants from '../components/wrapper/styleVariants';

export interface WrapperProps {
  className?: string;
  scrollView?: boolean;
  itemsCenter?: boolean;
  safeAreaView?: boolean;
  justifyBetween?: boolean;
  children: React.ReactNode;
  nestedScrollEnabled?: boolean;
  keyboardAvoidingView?: boolean;
  keyboardAwareScrollView?: boolean;
  px?: VariantProps<typeof WrapperVariants>['px'];
  py?: VariantProps<typeof WrapperVariants>['py'];
  my?: VariantProps<typeof WrapperVariants>['my'];
  pt?: VariantProps<typeof WrapperVariants>['pt'];
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
}
