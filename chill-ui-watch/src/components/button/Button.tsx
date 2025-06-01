import { ActivityIndicator, TouchableOpacity } from 'react-native';

import cn from '../cn';
import { Box } from '../box';
import String from '../string';
import Icon from '../icon/Icon';
import { BtnProps } from '../../types';
import { btnVariant, heightVr, opacityVariant, positionVr } from './styleVariants';

const loadingIconSize = (size: string) => {
  switch (size) {
    case '2xs':
      return 20;
    case 'xs':
      return 24;
    case 'sm':
      return 28;
    case 'md':
      return 32;
    case 'lg':
      return 36;
    default:
      return 32;
  }
};

export default function Button({
  btnClassName,
  disabled,
  leftIcon,
  loading,
  onPress,
  position = 'center',
  size = 'md',
  textClassName,
  textLeftIcon,
  textSize,
  textWeight = 'bold',
  title,
  variant = 'primary',
  ...props
}: BtnProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn(
        heightVr({ size }),
        btnVariant({ variant }),
        positionVr({ position }),
        opacityVariant({ disabled, loading }),
        'w-full items-center justify-center rounded-lg',
        btnClassName,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="#fff" size={loadingIconSize(size)} />
      ) : (
        <Box
          className={cn('w-full flex-row items-center justify-center', {
            'gap-2': !!textLeftIcon && !!title,
          })}
        >
          {leftIcon && (
            <Box className="absolute left-4">
              <Icon name={leftIcon} />
            </Box>
          )}
          {textLeftIcon && textLeftIcon}
          {!!title && (
            <String className={textClassName ?? ''} weight={textWeight} size={textSize ?? size} position="center">
              {title}
            </String>
          )}
        </Box>
      )}
    </TouchableOpacity>
  );
}
