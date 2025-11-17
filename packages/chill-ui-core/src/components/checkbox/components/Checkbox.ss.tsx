import type { CheckboxPropsSs } from '@types';

import { TIcons } from '@constants';
import { BoxSs } from '@components/box';
import { Pressable } from 'react-native';
import { IconSs } from '@components/icon';
import { StringSs } from '@components/string';
import { flattenStyle, isUndefined } from '@utils';
import { PropsWithChildren, useMemo, useState } from 'react';

import { checkboxDefaultProps } from '../utils/defaultProps';
import { checkboxSv, styles } from '../styles/Checkbox.ss.styles';

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
 * @param checkedColor - Background color when checked
 * @param checkedStyle - Additional style when checked
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
export default function Checkbox(props: PropsWithChildren<CheckboxPropsSs>) {
  const {
    checkedColor,
    checkedStyle,
    children,
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
    <BoxSs
      style={[
        styles.contentCheckBox,
        checkboxSv({ isChecked: checked, isDisabled, size, variant }),
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
          <IconSs
            name={checkboxDefaultProps.iconName as keyof TIcons}
            color={checkboxDefaultProps.iconColor}
            size={iconSize as any}
            {...iconProps}
          />
        ))}
    </BoxSs>
  );

  const labelCheckBox = (
    <StringSs
      size={size as any}
      {...labelProps}
      style={flattenStyle([styles.label, isDisabled && styles.isDisabled, labelProps?.style])}
    >
      {label}
    </StringSs>
  );

  return (
    <BoxSs>
      <BoxSs style={styles.container}>
        <Pressable onPress={handlePress} disabled={isDisabled} style={styles.pressable}>
          {contentCheckBox}
          {label && isLabelPressable && labelCheckBox}
        </Pressable>
        {label && !isLabelPressable && labelCheckBox}
      </BoxSs>
    </BoxSs>
  );
}
