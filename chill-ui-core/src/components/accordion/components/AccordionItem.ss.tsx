import type { AccordionItemPropsSs } from '@types';

import { BoxSs } from '@components/box';

import styles from '../styles/Accordion.styles';
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
 * @param style - Additional inline styles
 * @param ...rest - Props to pass to View props
 */
export default function AccordionItem(props: AccordionItemPropsSs) {
  const { children, disabled, style, value, ...rest } = props;

  return (
    <AccordionItemProvider value={value} disabled={disabled}>
      <BoxSs style={[styles.accordionItem, style]} {...rest}>
        {children}
      </BoxSs>
    </AccordionItemProvider>
  );
}
