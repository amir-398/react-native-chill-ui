import type { VariantProps } from 'tailwind-variants';
import type { ImageSourcePropType } from 'react-native';

import type { IconProps } from './icon.types';
import type { StringProps } from './string/string.ss.types';

import { dotPositionVariants, dotVariant } from '../components/carousel/styleVariants';

/**
 * Props for the Carousel component
 */
export interface CarouselProps {
  /** Whether to show navigation dots */
  hasDot?: boolean;
  /** Color of the inactive dots */
  dotColor?: string;
  /** Offset for dot positioning */
  dotOffset?: number;
  /** Color of the text */
  textColor?: string;
  /** Spacing between dots */
  dotSpacing?: number;
  /** Custom CSS classes for the text */
  textClassName?: string;
  /** Color of the active dot */
  dotActiveColor?: string;
  /** Custom CSS classes for the wrapper */
  wrapperClassName?: string;
  /** Custom content to render */
  children?: React.ReactNode;
  /** Size of the dots */
  dotSize?: IconProps['size'];
  /** Size of the text */
  textSize?: StringProps['size'];
  /** Weight of the text */
  textWeight?: any;
  /** Variant of the text */
  textVariant?: StringProps['variant'];
  /** Gap between dots */
  dotGap?: VariantProps<typeof dotVariant>['gap'];
  /** Position of the dots */
  dotPosition?: VariantProps<typeof dotPositionVariants>['position'];
  /** Array of carousel items */
  items: {
    /** Unique identifier for the item */
    id?: string;
    /** Image source for the item */
    image?: ImageSourcePropType;
    /** URI for the image */
    uri?: string;
    /** Display order of the item */
    order?: number;
    /** URL for the image */
    url?: string;
    /** Title text for the item */
    title?: string;
  }[];
}
