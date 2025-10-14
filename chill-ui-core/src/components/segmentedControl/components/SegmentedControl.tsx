import { PropsWithChildren, useMemo } from 'react';

import { SegmentedControlProvider } from './SegmentedControlProvider';
import { SegmentedControlIndicator } from './SegmentedControlIndicator';
import { SegmentedControlPanelContent } from './SegmentedControlPanelContent';
import { SegmentedControlTriggerContent } from './SegmentedControlTriggerContent';
import { SegmentedControlPanelSliderContent } from './SegmentedControlPanelSliderContent';

/**
 * Tab-like interface for switching between options.
 *
 * @example
 * ```tsx
 * <SegmentedControl>
 *   <SegmentedControlTriggerContent>
 *     <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
 *     <SegmentedControlTrigger value="option2">Option 2</SegmentedControlTrigger>
 *   </SegmentedControlTriggerContent>
 *   <SegmentedControlIndicator />
 *   <SegmentedControlPanelContent>
 *     <SegmentedControlPanel value="option1">
 *       <Box>Content for Option 1</Box>
 *     </SegmentedControlPanel>
 *     <SegmentedControlPanel value="option2">
 *       <Box>Content for Option 2</Box>
 *     </SegmentedControlPanel>
 *   </SegmentedControlPanelContent>
 * </SegmentedControl>
 * ```
 *
 * @param children - SegmentedControlTriggerContent, SegmentedControlIndicator, and SegmentedControlPanelContent components (required)
 * @returns SegmentedControl component that manages segmented control state and context
 */
export function SegmentedControl(props: PropsWithChildren<any>) {
  const { children } = props;

  const childrenArray = useMemo(() => {
    if (!children) return [];
    return Array.isArray(children) ? children : [children];
  }, [children]);

  const contentChildren = useMemo(
    () => childrenArray.filter(item => item.type === SegmentedControlTriggerContent),
    [childrenArray],
  );

  const panelsChildren = useMemo(
    () =>
      childrenArray.filter(
        item => item.type === SegmentedControlPanelContent || item.type === SegmentedControlPanelSliderContent,
      ),
    [childrenArray],
  );

  const indicatorChildren = useMemo(
    () => childrenArray.filter(item => item.type === SegmentedControlIndicator),
    [childrenArray],
  );

  return (
    <SegmentedControlProvider indicatorChildren={indicatorChildren}>
      {contentChildren}
      {panelsChildren}
    </SegmentedControlProvider>
  );
}

SegmentedControl.displayName = 'SegmentedControl';
