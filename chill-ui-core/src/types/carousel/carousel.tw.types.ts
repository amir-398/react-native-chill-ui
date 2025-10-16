import { FlatListProps, StyleProp, ViewProps, ViewStyle } from 'react-native';

import { IconProps } from '../icon/icon.tw.types';

export interface CarouselProps {
  className?: string;
  initialIndex?: number;
  style?: StyleProp<ViewStyle>;
  onScrollChange?: (index: number) => void;
}

export type CarouselContentProps = {
  className?: string;
  autoPlay?: boolean;
  autoPlayLoop?: boolean;
  autoPlayInterval?: number;
  orientation?: 'horizontal' | 'vertical';
  autoPlayDirection?: 'forward' | 'backward';
} & Omit<FlatListProps<any>, 'renderItem' | 'data' | 'horizontal' | 'onViewableItemsChanged' | 'ref'>;

export type CarouselItemProps = ViewProps & {
  className?: string;
};

export interface CarouselDotsProps {
  className?: string;
  activeColor?: string;
  inactiveColor?: string;
  size?: IconProps['size'];
  style?: StyleProp<ViewStyle>;
}

export interface CarouselButtonProps {
  className?: string;
  iconName?: IconProps['name'];
  style?: StyleProp<ViewStyle>;
  iconProps?: Partial<IconProps>;
}

export interface CarouselElementProps {
  offset?: number;
  className?: string;
  position?: 'top' | 'bottom';
  style?: StyleProp<ViewStyle>;
}
