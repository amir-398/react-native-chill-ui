import { ActivityIndicator, Pressable } from 'react-native';

import type { ButtonIconProps } from '../../types';

import cn from '../cn';
import Icon from '../icon';

export default function ButtonIcon(props: ButtonIconProps) {
  const {
    accessibilityLabel,
    className,
    iconColor,
    iconColorPressed,
    isDisabled = false,
    isLoading = false,
    name,
    onPress,
    size,
    testID,
  } = props;

  return (
    <Pressable
      {...props}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      className={cn(className, 'flex-row items-center justify-center', isDisabled && 'opacity-50')}
      onPress={onPress}
      disabled={isLoading || isDisabled}
    >
      {({ pressed }) =>
        isLoading ? (
          <ActivityIndicator size="small" color={iconColor} />
        ) : (
          <Icon name={name} size={size} color={pressed ? iconColorPressed : iconColor} />
        )
      }
    </Pressable>
  );
}
