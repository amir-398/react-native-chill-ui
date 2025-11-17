import type { TIcons } from '@constants';
import type { VariantProps } from 'tailwind-variants';
import type { StyleProp, ViewStyle } from 'react-native';
import type { ButtonTv } from '@components/button/styles/Button.tw.styles';
import type { IconPropsTw, LoadingIndicatorProps, StringPropsTw } from '@types';

type TouchableComponentType = 'touchable-opacity' | 'pressable' | 'ripple-pressable' | 'scale-pressable';

/**
 * Props for the Button component
 */
export type BtnProps = VariantProps<typeof ButtonTv> & {
  /** Type of touchable component to use:
   * - `'touchable-opacity'`
   * - `'pressable'`
   * - `'ripple-pressable'`
   * - `'scale-pressable'`
   */
  as?: TouchableComponentType;
  /** Custom CSS classes for the button container (NativeWind) */
  className?: string;
  /** Content position within the button:
   * - `'left'`
   * - `'center'`
   * - `'right'`
   */
  contentPosition?: StringPropsTw['position'];
  /** Whether the button is disabled */
  isDisabled?: boolean;
  /** Whether the button is in loading state */
  isLoading?: boolean;
  /** Left icon configuration */
  leftIconAction?: {
    customIcon?: React.ReactNode;
    name?: keyof TIcons;
    size?: IconPropsTw['size'];
    color?: string;
  };
  /** Props to pass to the loading indicator */
  loadingIndicatorProps?: Partial<LoadingIndicatorProps>;
  /** Press callback function */
  onPress?: () => void;
  /** Right icon configuration */
  rightIconAction?: {
    customIcon?: React.ReactNode;
    name?: keyof TIcons;
    size?: IconPropsTw['size'];
    color?: string;
  };
  /** Style object for the button container */
  style?: StyleProp<ViewStyle>;
  /** Props to pass to the String component */
  stringProps?: StringPropsTw;
  /** Button title text */
  title?: string;
};
