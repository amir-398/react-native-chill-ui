import type { TextProps } from 'react-native';
import type { VariantProps } from 'tailwind-variants';
import type { stringTv } from '@components/string/styles/String.tw.styles';

/**
 * Props for the String component
 */
export type StringProps = TextProps &
  VariantProps<typeof stringTv> & {
    /** Custom color for the text */
    color?: string;
    /** Custom CSS classes for the text */
    className?: string;
    /** Callback when text is pressed */
    onPress?: () => void;
    /** Whether to use fast text rendering */
    useFastText?: boolean;
  };
