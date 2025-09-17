import type { VariantProps } from 'tailwind-variants';
import type { StyleProp, ViewStyle } from 'react-native';

import type { IconProps } from './icon.types';
import type { TIcons } from '../constants/ICONS';
import type { StringProps } from './string/string.ss.types';
import type { LoadingIndicatorProps } from './loadingIndicator.types';
import type { btnVariant, btnColorVariant, heightVr, positionVr } from '../components/button/Button.variants';

type TouchableComponentType = 'TouchableOpacity' | 'Pressable' | 'RipplePressable' | 'ScalePressable';

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

  /** Custom CSS classes for the text */
  textClassName?: string;

  /** Props to pass to the String component */
  stringProps?: StringProps;

  /** Icon configuration with position support */
  iconAction?: {
    customIcon?: React.ReactNode;
    position?: 'left' | 'right';
    name: keyof TIcons;
    size: IconProps['size'];
  };

  /** Button size variant */
  size?: VariantProps<typeof heightVr>['size'];

  /** Props to pass to the loading indicator */
  loadingIndicatorProps?: LoadingIndicatorProps;

  /** Button style variant (contained/outlined/text) */
  variant?: VariantProps<typeof btnVariant>['variant'];

  /** Button color variant (primary/secondary/error/etc.) */
  colorVariant?: VariantProps<typeof btnColorVariant>['colorVariant'];

  /** Button position within its container */
  position?: VariantProps<typeof positionVr>['position'];

  /** Content position within the button (text + icon alignment) */
  contentPosition?: 'left' | 'center' | 'right';

  /** Type of touchable component to use */
  as?: TouchableComponentType;
};
