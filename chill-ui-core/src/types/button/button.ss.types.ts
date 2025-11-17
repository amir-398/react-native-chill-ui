import type { TIcons } from '@constants';
import type { StyleProp, ViewStyle } from 'react-native';
import type { StringPropsSs, LoadingIndicatorProps, IconPropsSs } from '@types';

import { VariantProps } from '@utils';
import { ButtonSv } from '@components/button/styles/Button.ss.styles';

type TouchableComponentType = 'touchable-opacity' | 'pressable' | 'ripple-pressable' | 'scale-pressable';

/**
 * Props for the Button component
 */
export type BtnProps = VariantProps<typeof ButtonSv> & {
  /** Type of touchable component to use:
   * - `'touchable-opacity'`
   * - `'pressable'`
   * - `'ripple-pressable'`
   * - `'scale-pressable'`
   */
  as?: TouchableComponentType;
  /** Custom CSS classes for the button container */
  className?: string;
  /** Content position within the button:
   * - `'left'`
   * - `'center'`
   * - `'right'`
   */
  contentPosition?: StringPropsSs['position'];
  /** Whether the button is disabled */
  isDisabled?: boolean;
  /** Whether the button is in loading state */
  isLoading?: boolean;
  /** Left icon configuration */
  leftIconAction?: {
    customIcon?: React.ReactNode;
    position?: 'left' | 'right';
    name?: keyof TIcons;
    size?: IconPropsSs['size'];
  };
  /** Props to pass to the loading indicator */
  loadingIndicatorProps?: Partial<LoadingIndicatorProps>;
  /** Press callback function */
  onPress?: () => void;
  /** Right icon configuration */
  rightIconAction?: {
    customIcon?: React.ReactNode;
    position?: 'left' | 'right';
    name?: keyof TIcons;
    size?: IconPropsSs['size'];
  };
  /** Style object for the button container */
  style?: StyleProp<ViewStyle>;
  /** Props to pass to the String component */
  stringProps?: StringPropsSs;
  /** Custom CSS classes for the text */
  textClassName?: string;
  /** Button title text */
  title?: string;
};
