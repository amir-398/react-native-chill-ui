import { FlatListProps, StyleProp, ViewProps, ViewStyle } from 'react-native';

import { IconProps } from '../icon/icon.ss.types';

export interface CarouselProps {
  autoPlay?: boolean;
  initialIndex?: number;
  autoPlayLoop?: boolean;
  autoPlayInterval?: number;
  style?: StyleProp<ViewStyle>;
  orientation?: 'horizontal' | 'vertical';
  onScrollChange?: (index: number) => void;
  autoPlayDirection?: 'forward' | 'backward';
}

export type CarouselContentProps = Omit<
  FlatListProps<any>,
  'renderItem' | 'data' | 'horizontal' | 'onViewableItemsChanged' | 'ref'
>;

export type CarouselItemProps = ViewProps;

export interface CarouselDotsProps {
  activeColor?: string;
  inactiveColor?: string;
  size?: IconProps['size'];
  style?: StyleProp<ViewStyle>;
}

export interface CarouselButtonProps {
  style?: StyleProp<ViewStyle>;
  iconName?: IconProps['name'];
  iconProps?: Partial<IconProps>;
}

export interface CarouselElementProps {
  offset?: number;
  position?: 'top' | 'bottom';
  style?: StyleProp<ViewStyle>;
}
