import type { TextProps } from 'react-native';

import type { VariantProps } from '../../utils/ss/styleSheetVariants';

import StringSv from '../../components/string/styles/String.ss.styles';

/**
 * Props for the String component
 */
export type StringProps = TextProps &
  VariantProps<typeof StringSv> & {
    /** Custom color for the text */
    color?: string;
    /** Callback when text is pressed */
    onPress?: () => void;
    /** Whether to use fast text rendering */
    useFastText?: boolean;
  };
