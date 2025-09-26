import type { AccordionPropsTw } from '@types';

import { cn } from '@utils';
import { BoxTw } from '@components/box';
import { PropsWithChildren } from 'react';

import { AccordionProvider } from './AccordionContext';
import { accordionDefaultProps } from '../utils/defaultProps';
import { accordionClassName } from '../styles/Accordion.variants';

/**
 * Accordion component provides a collapsible content area with support for single or multiple items.
 *
 * @example
 * ```tsx
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Is it accessible?</AccordionTrigger>
 *     <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 *
 * @param children - Child AccordionItem components
 * @param type - Whether single or multiple items can be open at once ('single' | 'multiple')
 * @param className - Custom CSS classes for styling
 * @param collapseIcon - Icon to show when item is expanded (default: 'angle-down-solid')
 * @param collapsible - Whether items can be collapsed when type is 'single' (default: false)
 * @param defaultValue - Default open items (string for single, array for multiple)
 * @param disabled - Disable the entire accordion (default: false)
 * @param expandIcon - Icon to show when item is collapsed (default: 'angle-down-solid')
 * @param hasCollapseIcon - Whether to show collapse/expand icons (default: true)
 * @param iconPosition - Position of the expand/collapse icon (default: 'right')
 * @param onValueChange - Callback fired when accordion state changes
 * @param props - Additional ViewProps for the container
 *
 * @see {@link https://github.com/your-repo/chill-ui/tree/main/src/components/accordion/README.md Documentation}
 */
export default function Accordion(props: PropsWithChildren<AccordionPropsTw>) {
  const {
    children,
    className,
    collapseIcon = accordionDefaultProps.collapseIcon,
    collapsible = accordionDefaultProps.collapsible,
    defaultValue,
    disabled = accordionDefaultProps.disabled,
    expandIcon = accordionDefaultProps.expandIcon,
    hasCollapseIcon = accordionDefaultProps.hasCollapseIcon,
    iconPosition = accordionDefaultProps.iconPosition,
    onValueChange,
    style,
    type = accordionDefaultProps.type,
  } = props;

  return (
    <AccordionProvider
      type={type!}
      collapsible={collapsible}
      defaultValue={defaultValue}
      disabled={disabled}
      hasAnimation={false}
      animationDuration={0}
      hasCollapseIcon={hasCollapseIcon ?? true}
      iconPosition={iconPosition}
      expandIcon={expandIcon}
      collapseIcon={collapseIcon}
      onValueChange={onValueChange}
    >
      <BoxTw className={cn(accordionClassName, className)} style={style}>
        {children}
      </BoxTw>
    </AccordionProvider>
  );
}
