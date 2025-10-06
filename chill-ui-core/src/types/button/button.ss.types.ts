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
  stringProps?: StringPropsSs;

  /** Icon configuration with position support */
  leftIconAction?: {
    customIcon?: React.ReactNode;
    position?: 'left' | 'right';
    name: keyof TIcons;
    size?: IconPropsSs['size'];
  };

  rightIconAction?: {
    customIcon?: React.ReactNode;
    position?: 'left' | 'right';
    name: keyof TIcons;
    size?: IconPropsSs['size'];
  };

  /** Props to pass to the loading indicator */
  loadingIndicatorProps?: Partial<LoadingIndicatorProps>;

  /** Button style variant (contained/outlined/text) */
  contentPosition?: StringPropsSs['position'];

  /** Type of touchable component to use */
  as?: TouchableComponentType;
};
