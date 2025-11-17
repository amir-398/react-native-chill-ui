import { TIcons } from '@constants';
import { BoxTw } from '@components/box';
import { cn, isUndefined } from '@utils';
import { Pressable } from 'react-native';
import { IconTw } from '@components/icon';
import { StringTw } from '@components/string';
import { PropsWithChildren, useMemo, useState } from 'react';
import { CheckboxPropsTw, IconPropsTw, StringPropsTw } from '@types';

import { checkboxDefaultProps } from '../utils/defaultProps';
import { checkboxTv, twStyles } from '../styles/Checkbox.tw.styles';

/**
 * The `<Checkbox />` component provides a flexible and accessible checkbox implementation.
 * Supports different variants and custom styling.
 *
 * @example
 * ```tsx
 * <Checkbox
 *   label="Accept terms"
 *   isChecked={checked}
 *   onCheckedChange={setChecked}
 *   variant="circle"
 *   size="md"
 *   isLabelPressable
 * />
 * ```
 *
 * @param checkedClassName - (only NativeWind) Additional CSS classes when checked
 * @param checkedColor - Background color when checked
 * @param className - (only NativeWind) Additional CSS classes for the checkbox container
 * @param iconProps - Props for the icon component
 * @param isChecked - Whether the checkbox is checked (default: false)
 * @param isDisabled - Whether the checkbox is disabled (default: false)
 * @param isLabelPressable - Whether the label is pressable (default: false)
 * @param label - Label text for the checkbox
 * @param labelProps - Props for the label component
 * @param onCheckedChange - Callback when checkbox state changes
 * @param size - Size variant of the checkbox (default: 'md')
 * @param style - Style object for the checkbox container
 * @param uncheckedColor - Background color when unchecked
 * @param variant - Visual variant of the checkbox (default: 'square')
 */
export default function Checkbox(props: PropsWithChildren<CheckboxPropsTw>) {
  const {
    checkedClassName,
    checkedColor,
    checkedStyle,
    children,
    className,
    iconProps,
    isChecked: controlledChecked,
    isDisabled = checkboxDefaultProps.isDisabled,
    isLabelPressable = checkboxDefaultProps.isLabelPressable,
    label,
    labelProps,
    onCheckedChange,
    size = checkboxDefaultProps.size,
    style,
    uncheckedColor,
    variant = checkboxDefaultProps.variant,
  } = props;

  const [internalChecked, setInternalChecked] = useState(checkboxDefaultProps.isChecked);

  const checked = isUndefined(controlledChecked) ? internalChecked : controlledChecked;

  const handlePress = () => {
    if (isDisabled) return;

    const newValue = !checked;

    if (isUndefined(controlledChecked)) {
      setInternalChecked(newValue);
    }

    onCheckedChange?.(newValue);
  };

  const iconSize = useMemo(() => {
    const sizeMap: Record<string, string> = {
      '2xl': 'lg',
      lg: 'sm',
      md: 'xs',
      sm: '2xs',
      xl: 'md',
      xs: '3xs',
    };

    return sizeMap[size as keyof typeof sizeMap] || 'xs';
  }, [size]);

  const contentCheckBox = (
    <BoxTw
      className={cn(
        twStyles.contentCheckBox,
        checkboxTv({ isChecked: checked, isDisabled, size, variant }),
        className,
        checked && checkedClassName,
      )}
      style={[
        {
          ...(checkedColor && checked && { backgroundColor: checkedColor }),
          ...(uncheckedColor && !checked && { backgroundColor: uncheckedColor }),
        },
        checked && checkedStyle,
        style,
      ]}
    >
      {checked &&
        (children ?? (
          <IconTw
            name={checkboxDefaultProps.iconName as keyof TIcons}
            color={checkboxDefaultProps.iconColor}
            size={iconSize as IconPropsTw['size']}
            {...iconProps}
          />
        ))}
    </BoxTw>
  );

  const labelCheckBox = (
    <StringTw
      size={size as StringPropsTw['size']}
      {...labelProps}
      className={cn({ [twStyles.isDisabled]: isDisabled }, twStyles.label, labelProps?.className)}
    >
      {label}
    </StringTw>
  );

  return (
    <BoxTw>
      <BoxTw className={twStyles.container}>
        <Pressable onPress={handlePress} disabled={isDisabled} className={twStyles.pressable}>
          {contentCheckBox}
          {label && isLabelPressable && labelCheckBox}
        </Pressable>
        {label && !isLabelPressable && labelCheckBox}
      </BoxTw>
    </BoxTw>
  );
}
