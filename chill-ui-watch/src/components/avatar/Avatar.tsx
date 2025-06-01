import { Image, Pressable } from 'react-native';

import cn from '../cn';
import { Box } from '../box';
import String from '../string';
import { AvatarProps } from '../../types';
import { avatarVariants, sizeVariant } from './styleVariants';

export function getUserInitials(data: { firstname?: string; lastname?: string }) {
  if (!data?.firstname) return '';
  if (!data?.lastname) return data.firstname.charAt(0).toUpperCase();
  const firstInitial = data.firstname.charAt(0).toUpperCase();
  const lastInitial = data.lastname.charAt(0).toUpperCase();
  return firstInitial + lastInitial;
}

export default function Avatar({
  backgroundColor,
  className,
  data,
  onPress,
  size = 'sm',
  textClassName,
  textColor,
  variant = 'circle',
}: AvatarProps) {
  const initials = data?.firstname ? getUserInitials(data) : '';

  const image = data?.image_url;

  const render = (
    <Box
      className={cn(
        'bg-primary items-center justify-center overflow-hidden border border-white',
        sizeVariant({ size }),
        avatarVariants({ variant }),
        className,
      )}
      style={{ ...(backgroundColor && { backgroundColor }) }}
    >
      <String size={size} className={textClassName} color={textColor}>
        {initials}
      </String>
      <Image className="absolute h-full w-full" source={{ uri: image ?? '' }} />
    </Box>
  );

  if (onPress) {
    return <Pressable onPress={onPress}>{render}</Pressable>;
  }
  return render;
}
