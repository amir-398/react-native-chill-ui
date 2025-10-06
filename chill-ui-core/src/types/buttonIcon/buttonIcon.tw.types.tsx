import { TIcons } from '@constants';
import { VariantProps } from 'tailwind-variants';
import { ViewStyle, StyleProp } from 'react-native';
import { buttonIconTv } from '@components/buttonIcon/styles/buttonIcon.tw.styles';

import { IconProps } from '../icon/icon.tw.types';
import { LoadingIndicatorProps } from '../loadingIndicator/loadingIndicator.types';

export type TouchableComponentType = 'touchable-opacity' | 'pressable' | 'ripple-pressable' | 'scale-pressable';

/**
 * Props for the ButtonIcon component
 */
export type ButtonIconProps = VariantProps<typeof buttonIconTv> & {
  /** Custom CSS classes for the button container */
  className?: string;
  /** Color of the icon */
  iconColor?: string;
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
  /** Style object for the button container */
  style?: StyleProp<ViewStyle>;
};
