import { cn } from '@utils';

import type { AccordionProps } from '../../types/accordion.types';

import { Box } from '../box';
import styles from './Accordion.style';
import { AccordionProvider } from './AccordionContext';
import { isNativeWindInstalled } from '../../utils/hybrid/nativewindDetector';
import { classNamePropsHandler } from '../../utils/hybrid/classNamePropsHandler';

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
export default function Accordion(props: AccordionProps) {
  classNamePropsHandler(props, 'Accordion');
  const {
    children,
    className,
    collapseIcon = 'angle-down-solid',
    collapsible = false,
    defaultValue,
    disabled = false,
    expandIcon = 'angle-down-solid',
    hasCollapseIcon = true,
    iconPosition = 'right',
    onValueChange,
    style,
    type,
  } = props;

  return (
    <AccordionProvider
      type={type}
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
      {isNativeWindInstalled() ? (
        <Box className={cn('w-full overflow-hidden rounded-lg', className)} style={style}>
          {children}
        </Box>
      ) : (
        <Box style={[styles.accordion, style]}>{children}</Box>
      )}
    </AccordionProvider>
  );
}
