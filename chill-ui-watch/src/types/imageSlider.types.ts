import type { VariantProps } from 'tailwind-variants';
import type { ImageSourcePropType } from 'react-native';

import type { IconProps } from './icon.types';
import type { StringProps } from './string.types';

import { dotPositionVariants, dotVariant } from '../components/imageSlider/ImageSlider';

export interface ImageSliderProps {
  hasDot?: boolean;
  dotColor?: string;
  dotOffset?: number;
  textColor?: string;
  dotSpacing?: number;
  textClassName?: string;
  dotActiveColor?: string;
  wrapperClassName?: string;
  children?: React.ReactNode;
  dotSize?: IconProps['size'];
  textSize?: StringProps['size'];
  textWeight?: StringProps['weight'];
  textVariant?: StringProps['variant'];
  dotGap?: VariantProps<typeof dotVariant>['gap'];
  dotPosition?: VariantProps<typeof dotPositionVariants>['position'];
  items: {
    id?: string;
    image?: ImageSourcePropType;
    uri?: string;
    order?: number;
    url?: string;
    title?: string;
  }[];
}
