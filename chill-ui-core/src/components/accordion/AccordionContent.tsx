import { cn } from '@utils';

import type { AccordionContentProps } from '../../types/accordion.types';

import { Box } from '../box';
import { String } from '../string';
import styles from './Accordion.style';
import { useAccordion } from './AccordionContext';
import { isNativeWindInstalled } from '../../utils';
import { useAccordionItem } from './AccordionItemContext';
import { classNamePropsHandler } from '../../utils/hybrid/classNamePropsHandler';

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
 *   <Box>
 *     <String>Custom styled content</String>
 *   </Box>
 * </AccordionContent>
 * ```
 *
 * @param children - Content to display when expanded
 * @param className - Custom CSS classes
 * @param stringProps - Props to pass to String component when children is a string
 * @param ...rest - Props to pass to View props
 */
export default function AccordionContent(props: AccordionContentProps) {
  classNamePropsHandler(props, 'AccordionContent');
  const { children, className, stringProps, style, ...rest } = props;
  const { isItemOpen } = useAccordion();
  const { value } = useAccordionItem();

  const isOpen = isItemOpen(value);

  const staticHeight = isOpen ? 'auto' : 0;

  const contentStyle = isOpen ? undefined : styles.accordionContentHidden;

  return (
    <Box
      style={{
        height: staticHeight,
        overflow: 'hidden',
      }}
    >
      {isNativeWindInstalled() ? (
        <Box className={cn('bg-[#ebebeb] px-4 py-3', className)} style={style} {...rest}>
          {typeof children === 'string' ? <String {...stringProps}>{children}</String> : children}
        </Box>
      ) : (
        <Box style={[styles.accordionContent, contentStyle, style]} {...rest}>
          {typeof children === 'string' ? <String {...stringProps}>{children}</String> : children}
        </Box>
      )}
    </Box>
  );
}
