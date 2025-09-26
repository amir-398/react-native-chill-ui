import { cn } from '@utils';
import { useState } from 'react';
import { Pressable } from 'react-native';

import { Box } from '../box';
import { Icon } from '../icon';
import { String } from '../string';
import { CheckboxProps } from '../../types/checkbox.types';
import { checkboxSizeVariants, checkboxVariants } from './styleVariants';

/**
 * Checkbox component with support for different variants, custom styling, and accessibility features.
 * Provides a flexible and accessible checkbox implementation with support for controlled and uncontrolled patterns.
 *
 * @example
 * ```tsx
 * // Basic usage
 * const [isChecked, setIsChecked] = useState(false);
 *
 * <Checkbox
 *   label="Accept terms and conditions"
 *   isChecked={isChecked}
 *   onChange={setIsChecked}
 * />
 *
 * // With different variants
 * <Checkbox
 *   label="Circle Checkbox"
 *   variant="circle"
 *   isChecked={isChecked}
 *   onChange={setIsChecked}
 * />
 *
 * // With custom colors
 * <Checkbox
 *   label="Custom Colors"
 *   checkedColor="#FF0000"
 *   uncheckedColor="#CCCCCC"
 *   iconColor="#FFFFFF"
 *   isChecked={isChecked}
 *   onChange={setIsChecked}
 * />
 *
 * // With custom icon
 * <Checkbox
 *   label="Custom Icon"
 *   iconName="star-solid"
 *   iconColor="#FFD700"
 *   isChecked={isChecked}
 *   onChange={setIsChecked}
 * />
 *
 * // With custom size
 * <Checkbox
 *   label="Custom Size"
 *   checkboxSize={30}
 *   isChecked={isChecked}
 *   onChange={setIsChecked}
 * />
 * ```
 *
 * @param checkboxSize - Custom size for the checkbox
 * @param checkedClassName - Additional CSS classes when checked
 * @param checkedColor - Background color when checked
 * @param className - Additional CSS classes for the checkbox container
 * @param customIcon - Custom icon component to use instead of default
 * @param iconColor - Color of the check icon (default: 'white')
 * @param iconName - Name of the icon to use (default: 'check-solid')
 * @param isChecked - Whether the checkbox is checked (default: false)
 * @param isDisabled - Whether the checkbox is disabled (default: false)
 * @param label - Label text for the checkbox
 * @param labelClassName - Additional CSS classes for the label
 * @param onChange - Callback when checkbox state changes
 * @param size - Size variant of the checkbox (default: 'sm')
 * @param uncheckedColor - Background color when unchecked
 * @param variant - Visual variant of the checkbox (default: 'square')
 */
export default function Checkbox({
  checkboxSize,
  checkedClassName,
  checkedColor,
  className,
  customIcon,
  iconColor = 'white',
  iconName = 'check-solid',
  isChecked = false,
  isDisabled = false,
  label,
  labelClassName,
  onChange,
  size = 'sm',
  uncheckedColor,
  variant = 'square',
  ...rest
}: CheckboxProps) {
  const [isDefaultChecked, setIsDefaultChecked] = useState(isChecked);

  const handlePress = () => {
    if (!isDisabled && onChange) {
      onChange(!isDefaultChecked);
      setIsDefaultChecked(!isDefaultChecked);
    }
  };

  return (
    <Pressable onPress={handlePress} disabled={isDisabled} className="flex-row items-center" {...rest}>
      <Box
        className={cn(
          'items-center justify-center border',
          // @ts-ignore
          { [checkboxSizeVariants({ size })]: customIcon, 'opacity-50': isDisabled, 'p-0.5': !customIcon },
          isDefaultChecked && (checkedClassName ?? 'border-primary bg-primary'),
          !isDefaultChecked && 'border-gray-300 bg-white',
          checkboxVariants({ variant }),
          className,
        )}
        style={{
          ...(checkboxSize && { height: checkboxSize, width: checkboxSize }),
          ...(checkedColor && (isDefaultChecked ?? isChecked) && { backgroundColor: checkedColor }),
          ...(uncheckedColor && !isDefaultChecked && !isChecked && { backgroundColor: uncheckedColor }),
        }}
      >
        {isDefaultChecked && customIcon && customIcon}
        {!customIcon && <Icon name={iconName} size={size} color={isDefaultChecked ? iconColor : 'transparent'} />}
      </Box>
      {label && (
        // @ts-ignore
        <String className={cn({ 'opacity-30': isDisabled }, 'ml-2 text-black', labelClassName)} size={size}>
          {label}
        </String>
      )}
    </Pressable>
  );
}
