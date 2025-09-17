import { StyleProp, ViewStyle } from 'react-native';

/**
 * Props for the Wrapper component
 */
export interface WrapperProps {
  /** Custom CSS classes for the wrapper */
  className?: string;
  /** Whether to use ScrollView */
  hasScrollView?: boolean;
  /** Whether to use SafeAreaView */
  hasSafeAreaView?: boolean;
  /** Content to wrap */
  children: React.ReactNode;
  /** Whether nested scrolling is enabled */
  nestedScrollEnabled?: boolean;
  /** Whether to use KeyboardAvoidingView */
  hasKeyboardAvoidingView?: boolean;
  /** Whether to use KeyboardAwareScrollView */
  hasKeyboardAwareScrollView?: boolean;
  /** Safe area edges to apply */
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
  // Style prop
  style?: StyleProp<ViewStyle>;
}
