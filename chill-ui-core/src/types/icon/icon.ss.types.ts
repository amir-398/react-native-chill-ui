import type { TIcons } from '@constants';
import type { VariantProps } from '@utils';
import type { iconPaddingSv, iconSizeSv } from '@components/icon/styles/Icon.ss.styles';

import { StyleProp, ViewStyle } from 'react-native';

/**
 * Props for the Icon component
 */
export type IconProps = VariantProps<typeof iconSizeSv> &
  VariantProps<typeof iconPaddingSv> & {
    /** Callback function when icon is pressed */
    onPress?: () => void;
    /** Whether to show press effect when icon is pressed */
    hasPressEffect?: boolean;
    /** Custom CSS classes for the press effect */
    pressEffectClassName?: string;
    /** Color of the icon (CSS color value) */
    color?: string;
    /** Icon name from the available icon set */
    name: keyof TIcons;
    /** Inline styles for the icon */
    style?: StyleProp<ViewStyle>;
    /** Custom component to render instead of the default icon */
    as?: 'pressable' | 'touchable-opacity' | 'ripple-pressable';
    /** Inline styles for the press effect */
    pressEffectStyle?: StyleProp<ViewStyle>;
  };
