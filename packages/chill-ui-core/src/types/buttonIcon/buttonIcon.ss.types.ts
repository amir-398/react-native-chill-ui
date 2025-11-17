import { TIcons } from '@constants';
import { VariantProps } from '@utils';
import { ViewStyle, StyleProp } from 'react-native';
import { buttonIconSv } from '@components/buttonIcon/styles/buttonIcon.ss.styles';

import { IconProps } from '../icon/icon.ss.types';
import { LoadingIndicatorProps } from '../loadingIndicatorsKit/loadingIndicatorsKit.types';

type ButtonIconTouchableComponentType = 'touchable-opacity' | 'pressable' | 'ripple-pressable' | 'scale-pressable';

/**
 * Props for the ButtonIcon component
 */
export type ButtonIconProps = VariantProps<typeof buttonIconSv> & {
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
  as?: ButtonIconTouchableComponentType;
  /** Style object for the button container */
  style?: StyleProp<ViewStyle>;
};
