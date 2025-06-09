import { useState } from 'react';
import { Pressable } from 'react-native';

import cn from '../cn';
import { Box } from '../box';
import String from '../string';
import Icon from '../icon/Icon';
import { CheckboxProps } from '../../types';
import { checkboxSizeVariants, checkboxVariants } from './styleVariants';

export default function Checkbox({
  checkboxSize,
  checked = false,
  checkedClassName,
  checkedColor,
  className,
  customIcon,
  disabled = false,
  iconColor = 'white',
  iconName = 'check-solid',
  label,
  labelClassName,
  onChange,
  size = 'sm',
  uncheckedColor,
  variant = 'square',
  ...rest
}: CheckboxProps) {
  const [isDefaultChecked, setIsDefaultChecked] = useState(checked);

  const handlePress = () => {
    if (!disabled && onChange) {
      onChange(!isDefaultChecked);
      setIsDefaultChecked(!isDefaultChecked);
    }
  };

  return (
    <Pressable onPress={handlePress} disabled={disabled} className="flex-row items-center" {...rest}>
      <Box
        className={cn(
          'items-center justify-center border',
          { [checkboxSizeVariants({ size })]: customIcon, 'opacity-50': disabled, 'p-0.5': !customIcon },
          isDefaultChecked && (checkedClassName ?? 'border-primary bg-primary'),
          !isDefaultChecked && 'border-gray-300 bg-white',
          checkboxVariants({ variant }),
          className,
        )}
        style={{
          ...(checkboxSize && { height: checkboxSize, width: checkboxSize }),
          ...(checkedColor && (isDefaultChecked ?? checked) && { backgroundColor: checkedColor }),
          ...(uncheckedColor && !isDefaultChecked && !checked && { backgroundColor: uncheckedColor }),
        }}
      >
        {isDefaultChecked && customIcon && customIcon}
        {!customIcon && <Icon name={iconName} size={size} color={isDefaultChecked ? iconColor : 'transparent'} />}
      </Box>
      {label && (
        <String className={cn({ 'opacity-30': disabled }, 'ml-2 text-black', labelClassName)} size={size}>
          {label}
        </String>
      )}
    </Pressable>
  );
}
