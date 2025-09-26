import type { AccordionContentPropsSs } from '@types';

import { isString } from '@utils';
import { BoxSs } from '@components/box';
import { StringSs } from '@components/string';

import styles from '../styles/Accordion.styles';
import { useAccordion } from './AccordionContext';
import { useAccordionItem } from './AccordionItemContext';

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
 * <AccordionContent style={{ backgroundColor: '#f0f0f0', padding: 16 }}>
 *   <BoxSs>
 *     <StringSs>Custom styled content</StringSs>
 *   </BoxSs>
 * </AccordionContent>
 * ```
 *
 * @param children - Content to display when expanded
 * @param stringProps - Props to pass to String component when children is a string
 * @param style - Additional inline styles
 * @param ...rest - Props to pass to View props
 */
export default function AccordionContent(props: AccordionContentPropsSs) {
  const { children, stringProps, style, ...rest } = props;
  const { isItemOpen } = useAccordion();
  const { value } = useAccordionItem();

  const isOpen = isItemOpen(value);

  const staticHeight = isOpen ? 'auto' : 0;

  const contentStyle = isOpen ? undefined : styles.accordionContentHidden;

  return (
    <BoxSs
      style={{
        height: staticHeight,
        overflow: 'hidden',
      }}
    >
      <BoxSs style={[styles.accordionContent, contentStyle, style]} {...rest}>
        {isString(children) ? <StringSs {...stringProps}>{children}</StringSs> : children}
      </BoxSs>
    </BoxSs>
  );
}
