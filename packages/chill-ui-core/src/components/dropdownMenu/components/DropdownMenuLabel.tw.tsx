import { BoxTw } from '@components/box';
import { PropsWithChildren } from 'react';
import { StringTw } from '@components/string';
import { isString, cn, SlotTw } from '@utils';
import { DropdownMenuLabelPropsTw } from '@types';

import { twStyles } from '../styles/DropdownMenu.tw.styles';

/**
 * DropdownMenuLabel component that renders a label within a dropdown menu.
 * Supports cloning child elements and custom styling.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <DropdownMenuLabel>Section Label</DropdownMenuLabel>
 * ```
 *
 * @param asChild - Whether to clone the child element
 * @param children - Label content (string or React element)
 * @param className - Custom CSS classes (NativeWind)
 * @param stringProps - Props for String component when children is a string
 * @returns Label component for dropdown menu sections
 */
export function DropdownMenuLabel(props: PropsWithChildren<DropdownMenuLabelPropsTw>) {
  const { asChild, children, className, stringProps, ...rest } = props;

  if (asChild) {
    return (
      <SlotTw className={className} {...rest}>
        {children}
      </SlotTw>
    );
  }

  const content = isString(children) ? (
    <StringTw {...stringProps} font="primarySemiBold">
      {children}
    </StringTw>
  ) : (
    children
  );

  return (
    <BoxTw className={cn(twStyles.label, className)} {...rest}>
      {content}
    </BoxTw>
  );
}

DropdownMenuLabel.displayName = 'DropdownMenuLabel';
