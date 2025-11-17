import { BoxSs } from '@components/box';
import { PropsWithChildren } from 'react';
import { SlotSs, isString } from '@utils';
import { StringSs } from '@components/string';
import { DropdownMenuLabelPropsSs } from '@types';

import { styles } from '../styles/DropdownMenu.ss.styles';

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
 * @param stringProps - Props for String component when children is a string
 * @returns Label component for dropdown menu sections
 */
export function DropdownMenuLabel(props: PropsWithChildren<DropdownMenuLabelPropsSs>) {
  const { asChild, children, stringProps, ...rest } = props;

  if (asChild) {
    return <SlotSs {...rest}>{children}</SlotSs>;
  }

  const content = isString(children) ? (
    <StringSs font="primarySemiBold" {...stringProps}>
      {children}
    </StringSs>
  ) : (
    children
  );

  return (
    <BoxSs style={[styles.label, rest.style]} {...rest}>
      {content}
    </BoxSs>
  );
}

DropdownMenuLabel.displayName = 'DropdownMenuLabel';
