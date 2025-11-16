import { Box } from '@components/box';
import { PropsWithChildren } from 'react';
import { String } from '@components/string';
import { DropdownMenuLabelPropsTw } from '@types';
import { isString, classNameHandler, classNamePropsHandler, cn, SlotTw, styleHandler } from '@utils';

import { styles } from '../styles/DropdownMenu.ss.styles';
import { twStyles } from '../styles/DropdownMenu.tw.styles';

/**
 * DropdownMenuLabel component that renders a label within a dropdown menu.
 * Typically used for section headers or non-interactive text.
 * Supports custom styling and can clone child elements.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <DropdownMenuLabel>Settings</DropdownMenuLabel>
 * ```
 *
 * @param asChild - Whether to clone the child element
 * @param children - Label content (string or React element)
 * @param className - Custom CSS classes (NativeWind only)
 * @param stringProps - Props for String component when children is a string
 * @param style - Style object for the label
 * @returns Label component with proper styling
 */
export function DropdownMenuLabel(props: PropsWithChildren<DropdownMenuLabelPropsTw>) {
  classNamePropsHandler(props, 'DropdownMenuLabel');
  const { asChild, children, className, stringProps, style, ...rest } = props;

  if (asChild) {
    return (
      <SlotTw className={className} style={style} {...rest}>
        {children}
      </SlotTw>
    );
  }

  const content = isString(children) ? (
    <String font="primarySemiBold" {...stringProps}>
      {children}
    </String>
  ) : (
    children
  );

  return (
    <Box
      {...classNameHandler(cn(twStyles.label, className))}
      {...styleHandler({ defaultStyle: styles.label, style })}
      {...rest}
    >
      {content}
    </Box>
  );
}

DropdownMenuLabel.displayName = 'DropdownMenuLabel';
