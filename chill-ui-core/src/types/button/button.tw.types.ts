import type { TIcons } from '@constants';
import type { VariantProps } from 'tailwind-variants';
import type { StyleProp, ViewStyle } from 'react-native';
import type { ButtonTv } from '@components/button/styles/Button.tw.styles';
import type { IconPropsTw, LoadingIndicatorProps, StringPropsTw } from '@types';

type TouchableComponentType = 'touchable-opacity' | 'pressable' | 'ripple-pressable' | 'scale-pressable';

/**
 * Props for the Button component
 */
export type BtnProps = {
  /** Button title text */
  title?: string;

  /** Whether the button is in loading state */
  isLoading?: boolean;

  /** Whether the button is disabled */
  isDisabled?: boolean;

  /** Press callback function */
  onPress?: () => void;

  /** Custom CSS classes for the button container */
  className?: string;

  /** Style object for the button container */
  style?: StyleProp<ViewStyle>;

  /** Props to pass to the String component */
  stringProps?: StringPropsTw;

  /** Icon configuration with position support */
  leftIconAction?: {
    customIcon?: React.ReactNode;
    name: keyof TIcons;
    size?: IconPropsTw['size'];
    color?: string;
  };
  rightIconAction?: {
    customIcon?: React.ReactNode;
    name: keyof TIcons;
    size?: IconPropsTw['size'];
    color?: string;
  };

  /** Button size variant */
  size?: VariantProps<typeof ButtonTv>['size'];

  /** Props to pass to the loading indicator */
  loadingIndicatorProps?: Partial<LoadingIndicatorProps>;

  /** Button style variant (contained/outlined/text) */
  variant?: VariantProps<typeof ButtonTv>['variant'];

  /** Button color variant (primary/secondary/error/etc.) */
  colorVariant?: VariantProps<typeof ButtonTv>['colorVariant'];

  /** Button position within its container */
  position?: VariantProps<typeof ButtonTv>['position'];

  /** Content position within the button (text + icon alignment) */
  contentPosition?: StringPropsTw['position'];

  /** Type of touchable component to use */
  as?: TouchableComponentType;
};
