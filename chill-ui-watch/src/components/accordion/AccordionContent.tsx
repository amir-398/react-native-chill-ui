import { useRef } from 'react';
import { Animated } from 'react-native';

import type { AccordionContentProps } from '../../types';

import cn from '../cn';
import { Box } from '../box';
import { AnimatedBox } from '../animatedBox';
import { useAccordion } from './AccordionContext';
import { useAccordionItem } from './AccordionItemContext';

/**
 * AccordionContent is the collapsible content area that shows/hides based on the accordion state.
 * Supports smooth animations and custom styling.
 *
 * @example
 * ```tsx
 * <AccordionContent>
 *   <String>This content will be shown when the accordion item is expanded.</String>
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
 */
export default function AccordionContent({ children, className, ...props }: AccordionContentProps) {
  const { hasAnimation, isItemOpen } = useAccordion();
  const { value } = useAccordionItem();

  const isOpen = isItemOpen(value);

  const animatedHeight = useRef(new Animated.Value(0)).current;

  const staticHeight = isOpen ? 'auto' : 0;
  const finalHeight = hasAnimation ? animatedHeight : staticHeight;

  return (
    <AnimatedBox
      style={{
        height: finalHeight,
        overflow: 'hidden',
      }}
    >
      <Box className={cn('border-b border-gray-100 bg-white px-4 py-3', className)} {...props}>
        {children}
      </Box>
    </AnimatedBox>
  );
}
