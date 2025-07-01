import type { VariantProps } from 'tailwind-variants';

import { avatarVariants, sizeVariant } from '../components/avatar/styleVariants';

export type AvatarProps = {
  className?: string;
  textClassName?: string;
  onPress?: () => void;
  data: {
    firstname?: string;
    lastname?: string;
    image_url?: string;
  };
  backgroundColor?: string;
  textColor?: string;
  size?: VariantProps<typeof sizeVariant>['size'];
  variant?: VariantProps<typeof avatarVariants>['variant'];
};
