import type { AccordionContentPropsTw } from '@types';

import { Box } from '@components/box';
import { String } from '@components/string';
import { classNameHandler, cn, styleHandler, classNamePropsHandler, isString } from '@utils';

import { useAccordion } from './AccordionContext';
import styles from '../styles/Accordion.ss.styles';
import { twStyles } from '../styles/Accordion.tw.styles';
import { useAccordionItem } from './AccordionItemContext';

/**
 * AccordionContent is the collapsible content area that shows/hides based on the accordion state.
 * Supports smooth animations and custom styling.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
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
export default function AccordionContent(props: AccordionContentPropsTw) {
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
      <Box
        {...classNameHandler(cn(twStyles.accordionContent, className))}
        {...styleHandler({ defaultStyle: [styles.accordionContent, contentStyle], style })}
        {...rest}
      >
        {isString(children) ? <String {...stringProps}>{children}</String> : children}
      </Box>
    </Box>
  );
}
