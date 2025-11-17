import { FlatListProps, StyleProp, ViewProps, ViewStyle } from 'react-native';

import { IconProps } from '../icon/icon.tw.types';

export type CarouselProps = {
  className?: string;
  initialIndex?: number;
  style?: StyleProp<ViewStyle>;
  autoPlay?: boolean;
  autoPlayDirection?: 'forward' | 'backward';
  autoPlayInterval?: number;
  autoPlayLoop?: boolean;
  orientation?: 'horizontal' | 'vertical';
  onScrollChange?: (index: number) => void;
};

export type CarouselContentProps = {
  className?: string;
} & Omit<FlatListProps<any>, 'renderItem' | 'data' | 'horizontal' | 'onViewableItemsChanged' | 'ref'>;

export type CarouselItemProps = ViewProps & {
  className?: string;
};

export type CarouselDotsProps = {
  className?: string;
  activeColor?: string;
  inactiveColor?: string;
  size?: IconProps['size'];
  style?: StyleProp<ViewStyle>;
};

export type CarouselButtonProps = {
  className?: string;
  iconName?: IconProps['name'];
  style?: StyleProp<ViewStyle>;
  iconProps?: Partial<IconProps>;
};

export type CarouselElementProps = {
  offset?: number;
  className?: string;
  position?: 'top' | 'bottom';
  style?: StyleProp<ViewStyle>;
};
