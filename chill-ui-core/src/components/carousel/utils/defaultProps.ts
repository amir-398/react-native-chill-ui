import { IconProps } from '@/types/icon/icon.tw.types';

import { TIcons } from '../../../constants/ICONS';

export const carouselDefaultProps = {
  autoPlay: false,
  autoPlayDirection: 'forward' as 'forward' | 'backward',
  autoPlayInterval: 3000,
  autoPlayLoop: false,
  dotActiveColor: '#fff',
  dotInactiveColor: '#a1a1a1',
  dotName: 'dot-solid' as keyof TIcons,
  dotPosition: 'bottom',
  dotSize: '2xs' as IconProps['size'],
  elementOffset: 16,
  elementPosition: 'bottom',
  initialIndex: 0,
  leftIconName: 'angle-left-solid' as keyof TIcons,
  orientation: 'horizontal' as 'horizontal' | 'vertical',
  rightIconName: 'angle-right-solid' as keyof TIcons,
};
