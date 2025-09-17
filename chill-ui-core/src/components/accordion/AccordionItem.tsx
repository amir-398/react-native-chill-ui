import type { AccordionItemProps } from '../../types/accordion.types';

import { Box } from '../box';
import styles from './Accordion.style';
import { AccordionItemProvider } from './AccordionItemContext';
import { isNativeWindInstalled } from '../../utils/hybrid/nativewindDetector';
import { classNamePropsHandler } from '../../utils/hybrid/classNamePropsHandler';

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
 */
export default function AccordionItem(props: AccordionItemProps) {
  const { children, className, disabled, style, value, ...rest } = props;
  classNamePropsHandler(props, 'AccordionItem');

  return (
    <AccordionItemProvider value={value} disabled={disabled}>
      {isNativeWindInstalled() ? (
        <Box className={className} style={style} {...rest}>
          {children}
        </Box>
      ) : (
        <Box style={[styles.accordionItem, style]} {...rest}>
          {children}
        </Box>
      )}
    </AccordionItemProvider>
  );
}
