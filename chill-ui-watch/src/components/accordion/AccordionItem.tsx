import type { AccordionItemProps } from '../../types';

import cn from '../cn';
import { Box } from '../box';
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
 */
export default function AccordionItem({ children, className, disabled, value, ...props }: AccordionItemProps) {
  return (
    <AccordionItemProvider value={value} disabled={disabled}>
      <Box className={cn('border-b border-gray-100 last:border-b-0', className)} {...props}>
        {children}
      </Box>
    </AccordionItemProvider>
  );
}
