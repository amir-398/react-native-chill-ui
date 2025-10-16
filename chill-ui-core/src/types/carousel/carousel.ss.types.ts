import { FlatListProps, StyleProp, ViewProps, ViewStyle } from 'react-native';

import { IconProps } from '../icon/icon.ss.types';

export interface CarouselProps {
  initialIndex?: number;
  style?: StyleProp<ViewStyle>;
  onScrollChange?: (index: number) => void;
}

export type CarouselContentProps = {
  autoPlay?: boolean;
  autoPlayLoop?: boolean;
  autoPlayInterval?: number;
  orientation?: 'horizontal' | 'vertical';
  autoPlayDirection?: 'forward' | 'backward';
} & Omit<FlatListProps<any>, 'renderItem' | 'data' | 'horizontal' | 'onViewableItemsChanged' | 'ref'>;

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
