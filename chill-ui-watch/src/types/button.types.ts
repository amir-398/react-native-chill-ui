import type { VariantProps } from 'tailwind-variants';

import type { TIcons } from '../constants/ICONS';
import type { StringProps } from './string.types';

import { IconProps } from './icon.types';
import { LoadingIndicatorProps } from './loadingIndicator.types';
import { btnVariant, heightVr, positionVr } from '../components/button/styleVariants';

type TouchableComponentType = 'TouchableOpacity' | 'Pressable' | 'RipplePressable';

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

  /** Custom CSS classes for the text */
  textClassName?: string;

  /** Props to pass to the String component */
  stringProps?: StringProps;

  /** Custom content to render inside the button */
  children?: React.ReactNode;

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

  /** Button style variant */
  variant?: VariantProps<typeof btnVariant>['variant'];

  /** Content position within the button */
  position?: VariantProps<typeof positionVr>['position'];

  /** Type of touchable component to use */
  as?: TouchableComponentType;
};
