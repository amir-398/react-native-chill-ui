import { cn, SlotTw } from '@utils';
import { BoxTw } from '@components/box';
import { PropsWithChildren } from 'react';
import { SegmentedControlPanelsPropsTw } from '@types';

import { twStyles } from '../styles/SegmentedControl.tw.styles';

/**
 * Container for SegmentedControlPanel components.
 *
 * @example
 * ```tsx
 * <SegmentedControlPanelContent>
 *   <SegmentedControlPanel value="option1">
 *     <Box className="p-4 bg-blue-100 rounded-lg">
 *       <String>Content for Option 1</String>
 *     </Box>
 *   </SegmentedControlPanel>
 *   <SegmentedControlPanel value="option2">
 *     <Box className="p-4 bg-red-100 rounded-lg">
 *       <String>Content for Option 2</String>
 *     </Box>
 *   </SegmentedControlPanel>
 * </SegmentedControlPanelContent>
 * ```
 *
 * @param className - Custom CSS classes for styling the panels container (NativeWind)
 * @param style - Style object for the panels container (React Native)
 * @param asChild - Whether to use the asChild pattern, rendering children directly without wrapper (default: false)
 * @param children - SegmentedControlPanel components to organize and display (required)
 * @param ...rest - All other props from View component (onLayout, testID, accessibilityLabel, etc.)
 * @returns SegmentedControlPanelContent component that wraps and styles panel content
 */
export function SegmentedControlPanelContent(props: PropsWithChildren<SegmentedControlPanelsPropsTw>) {
  const { asChild, children, className, ...rest } = props;

  if (asChild) {
    return (
      <SlotTw className={className} {...rest}>
        {children}
      </SlotTw>
    );
  }

  return (
    <BoxTw className={cn(twStyles.panelContentContainer, className)} {...rest}>
      {children}
    </BoxTw>
  );
}

SegmentedControlPanelContent.displayName = 'SegmentedControlPanelContent';
