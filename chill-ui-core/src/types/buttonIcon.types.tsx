import { TIcons } from '@/constants/ICONS';

import { IconProps } from './icon.types';
import { LoadingIndicatorProps } from './loadingIndicator.types';

export type TouchableComponentType = 'TouchableOpacity' | 'Pressable' | 'RipplePressable';

/**
 * Props for the ButtonIcon component
 */
export interface ButtonIconProps {
  /** Custom CSS classes for the button container */
  className?: string;
  /** Color of the icon */
  iconColor?: string;
  /** Whether the button is in loading state */
  isLoading?: boolean;
  /** Whether the button is disabled */
  isDisabled?: boolean;
  /** Press callback function */
  onPress?: () => void;
  /** Icon name from the available icon set */
  iconName: keyof TIcons;
  /** Icon size variant */
  size?: IconProps['size'];
  /** Props to pass to the loading indicator */
  loadingIndicatorProps?: LoadingIndicatorProps;
  /** Type of touchable component to use */
  as?: TouchableComponentType;
}
