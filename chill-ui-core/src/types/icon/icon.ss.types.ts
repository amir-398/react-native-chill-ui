import type { TIcons } from '@constants';
import type { VariantProps } from '@utils';
import type { iconPaddingSv, iconSizeSv } from '@components/icon/styles/Icon.ss.styles';

import { StyleProp, ViewStyle } from 'react-native';

/**
 * Props for the Icon component
 */
export type IconProps = VariantProps<typeof iconSizeSv> &
  VariantProps<typeof iconPaddingSv> & {
    /** Component to use when pressable:
     * - `'pressable'`
     * - `'touchable-opacity'`
     * - `'ripple-pressable'`
     */
    as?: 'pressable' | 'touchable-opacity' | 'ripple-pressable';
    /** Icon color (default: '#000') */
    color?: string;
    /** Whether to show press effect when pressed */
    hasPressEffect?: boolean;
    /** Icon name from the available icon set (required) */
    name: keyof TIcons;
    /** Callback function when icon is pressed */
    onPress?: () => void;
    /** Custom CSS classes for the press effect */
    pressEffectClassName?: string;
    /** Inline styles for the press effect */
    pressEffectStyle?: StyleProp<ViewStyle>;
    /** Icon size variant:
     * - `'2xs'`
     * - `'xs'`
     * - `'sm'`
     * - `'md'`
     * - `'lg'`
     * - `'xl'`
     * - `'2xl'`
     * - `'3xl'`
     */
    size?: VariantProps<typeof iconSizeSv>['size'];
    /** Additional inline styles */
    style?: StyleProp<ViewStyle>;
  };
