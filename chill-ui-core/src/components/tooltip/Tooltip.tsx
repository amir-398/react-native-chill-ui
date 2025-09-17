import { useState } from 'react';
import { Pressable } from 'react-native';

import { Box } from '../box';
import { String } from '../string';
import TooltipRoot from './core/TooltipRoot';
import { TooltipProps } from '../../types/tooltip.types';

/**
 * Tooltip component that provides contextual information on press interactions.
 * Features customizable positioning, styling, and content with smooth animations.
 *
 * @example
 * ```tsx
 * // Basic tooltip with text
 * <Tooltip title="This is a helpful tooltip">
 *   <Button>Hover me</Button>
 * </Tooltip>
 *
 * // Custom content tooltip
 * <Tooltip content={<CustomTooltipContent />}>
 *   <Icon name="info-circle" />
 * </Tooltip>
 *
 * // Customized tooltip
 * <Tooltip
 *   title="Custom tooltip"
 *   textColor="#FFFFFF"
 *   textSize="lg"
 *   backgroundColor="#1F2937"
 *   side="top"
 * >
 *   <Button>Custom Tooltip</Button>
 * </Tooltip>
 * ```
 *
 * @param children - Child component that triggers the tooltip
 * @param content - Custom content to display in the tooltip (overrides title)
 * @param textColor - Color of the tooltip text (default: '#000')
 * @param textSize - Size of the tooltip text (default: 'md')
 * @param title - Text content for the tooltip
 * @param rest - Additional props passed to TooltipRoot
 * @returns Tooltip component with press interaction
 */
export default function Tooltip({
  children,
  content,
  textColor = '#000',
  textSize = 'md',
  title,
  ...rest
}: TooltipProps) {
  /** Visibility state of the tooltip */
  const [isVisible, setIsVisible] = useState(false);

  return (
    <TooltipRoot
      {...rest}
      isVisible={isVisible}
      content={
        content || (
          <String color={textColor} size={textSize}>
            {title}
          </String>
        )
      }
    >
      <Box>
        <Pressable
          onPressIn={() => setIsVisible(true)}
          onPressOut={() => setIsVisible(false)}
          className="absolute z-50 size-full"
        />
        {children}
      </Box>
    </TooltipRoot>
  );
}
