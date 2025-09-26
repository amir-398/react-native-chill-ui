import type { AccordionItemPropsTw } from '@types';

import { Box } from '@components/box';
import { classNameHandler, styleHandler, classNamePropsHandler } from '@utils';

import styles from '../styles/Accordion.styles';
import { AccordionItemProvider } from './AccordionItemContext';

/**
 * AccordionItem wraps a single accordion item with its trigger and content.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
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
 */
export default function AccordionItem(props: AccordionItemPropsTw) {
  classNamePropsHandler(props, 'AccordionItem');
  const { children, className, disabled, style, value, ...rest } = props;

  return (
    <AccordionItemProvider value={value} disabled={disabled}>
      <Box {...classNameHandler(className)} {...styleHandler({ defaultStyle: styles.accordionItem, style })} {...rest}>
        {children}
      </Box>
    </AccordionItemProvider>
  );
}
