import type { AccordionItemPropsTw } from '@types';

import { BoxTw } from '@components/box';

import { AccordionItemProvider } from './AccordionItemContext';

/**
 * AccordionItem wraps a single accordion item with its trigger and content.
 *
 * @example
 * ```tsx
 * <AccordionItem value="item-1" disabled={false}>
 *   <AccordionTrigger>Question</AccordionTrigger>
 *   <AccordionContent>Answer</AccordionContent>
 * </AccordionItem>
 * ```
 *
 * @param value - Unique identifier for the item
 * @param disabled - Whether this specific item is disabled
 * @param className - Custom CSS classes
 * @param style - Additional inline styles
 * @param ...rest - Props to pass to View props
 */
export default function AccordionItem(props: AccordionItemPropsTw) {
  const { children, className, disabled, style, value, ...rest } = props;

  return (
    <AccordionItemProvider value={value} disabled={disabled}>
      <BoxTw className={className} style={style} {...rest}>
        {children}
      </BoxTw>
    </AccordionItemProvider>
  );
}
