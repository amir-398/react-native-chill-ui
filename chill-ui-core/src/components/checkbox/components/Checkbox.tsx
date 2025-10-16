import type { CheckboxPropsTw } from '@types';

import { TIcons } from '@constants';
import { Box } from '@components/box';
import { Icon } from '@components/icon';
import { Pressable } from 'react-native';
import { String } from '@components/string';
import { PropsWithChildren, useMemo, useState } from 'react';
import { classNameHandler, classNamePropsHandler, cn, isUndefined, styleHandler } from '@utils';

import { checkboxDefaultProps } from '../utils/defaultProps';
import { checkboxSv, styles } from '../styles/Checkbox.ss.styles';
import { checkboxTv, twStyles } from '../styles/Checkbox.tw.styles';

/**
 * The `<Checkbox />` component provides a flexible and accessible checkbox implementation.
 * Supports different variants, custom styling, and accessibility features.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { Checkbox } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
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
 * @param checkedClassName - Additional CSS classes when checked (NativeWind)
 * @param checkedColor - Background color when checked
 * @param checkedStyle - Additional style when checked
 * @param children - Custom content to render inside the checkbox
 * @param className - Custom CSS classes for the checkbox container (NativeWind)
 * @param iconProps - Props for the icon component
 * @param isChecked - Whether the checkbox is checked (default: false)
 * @param isDisabled - Whether the checkbox is disabled (default: false)
 * @param isLabelPressable - Whether the label is pressable (default: false)
 * @param label - Label text for the checkbox
 * @param labelProps - Props for the label component
 * @param onCheckedChange - Callback when checkbox state changes
 * @param size - Size variant of the checkbox: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' (default: 'md')
 * @param style - Style object for the checkbox container
 * @param uncheckedColor - Background color when unchecked
 * @param variant - Visual variant of the checkbox: 'circle' | 'square' (default: 'square')
 */
export default function Checkbox(props: PropsWithChildren<CheckboxPropsTw>) {
  classNamePropsHandler(props, 'Checkbox');

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
    <Box
      {...classNameHandler(
        cn(
          twStyles.contentCheckBox,
          checkboxTv({ isChecked: checked, isDisabled, size, variant }),
          checked && checkedClassName,
          className,
        ),
      )}
      {...styleHandler({
        defaultStyle: [checkboxSv({ isChecked: checked, isDisabled, size, variant })],
        style: [
          {
            ...(checkedColor && checked && { backgroundColor: checkedColor }),
            ...(uncheckedColor && !checked && { backgroundColor: uncheckedColor }),
          },
          checked && checkedStyle,
          style,
        ],
      })}
    >
      {checked &&
        (children ?? (
          <Icon
            name={checkboxDefaultProps.iconName as keyof TIcons}
            color={checkboxDefaultProps.iconColor}
            size={iconSize as any}
            {...iconProps}
          />
        ))}
    </Box>
  );

  const labelCheckBox = (
    <String
      size={size}
      {...labelProps}
      {...classNameHandler(cn({ [twStyles.isDisabled]: isDisabled }, twStyles.label, labelProps?.className))}
      {...styleHandler({
        defaultStyle: [styles.label, isDisabled && styles.isDisabled],
        style: labelProps?.style,
      })}
    >
      {label}
    </String>
  );

  return (
    <Box>
      <Box {...classNameHandler(twStyles.container)} {...styleHandler({ defaultStyle: styles.container })}>
        <Pressable
          onPress={handlePress}
          disabled={isDisabled}
          {...classNameHandler(twStyles.pressable)}
          {...styleHandler({ defaultStyle: styles.pressable })}
        >
          {contentCheckBox}
          {label && isLabelPressable && labelCheckBox}
        </Pressable>
        {label && !isLabelPressable && labelCheckBox}
      </Box>
    </Box>
  );
}
