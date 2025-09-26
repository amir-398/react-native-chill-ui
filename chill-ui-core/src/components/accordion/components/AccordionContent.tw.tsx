import type { AccordionContentPropsTw } from '@types';

import { cn, isString } from '@utils';
import { BoxTw } from '@components/box';
import { StringTw } from '@components/string';

import { useAccordion } from './AccordionContext';
import { useAccordionItem } from './AccordionItemContext';
import { accordionContentClassName } from '../styles/Accordion.variants';

/**
 * AccordionContent is the collapsible content area that shows/hides based on the accordion state.
 * Supports smooth animations and custom styling.
 *
 * @example
 * ```tsx
 * <AccordionContent stringProps={{ variant: 'body-2' }}>
 *   This content will be shown when the accordion item is expanded.
 * </AccordionContent>
 *
 * // Custom styling
 * <AccordionContent className="bg-gray-100 p-4">
 *   <BoxTw>
 *     <StringTw>Custom styled content</StringTw>
 *   </BoxTw>
 * </AccordionContent>
 * ```
 *
 * @param children - Content to display when expanded
 * @param className - Custom CSS classes
 * @param stringProps - Props to pass to String component when children is a string
 * @param style - Additional inline styles
 * @param ...rest - Props to pass to View props
 */
export default function AccordionContent(props: AccordionContentPropsTw) {
  const { children, className, stringProps, style, ...rest } = props;
  const { isItemOpen } = useAccordion();
  const { value } = useAccordionItem();

  const isOpen = isItemOpen(value);

  const staticHeight = isOpen ? 'auto' : 0;

  return (
    <BoxTw
      style={{
        height: staticHeight,
        overflow: 'hidden',
      }}
    >
      <BoxTw className={cn(accordionContentClassName, className)} style={style} {...rest}>
        {isString(children) ? <StringTw {...stringProps}>{children}</StringTw> : children}
      </BoxTw>
    </BoxTw>
  );
}
