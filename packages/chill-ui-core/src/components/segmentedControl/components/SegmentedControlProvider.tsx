import { PropsWithChildren, useMemo, useState } from 'react';

import { SegmentedControlActionsContext, SegmentedControlStateContext } from '../context/SegmentedControlContext';

/**
 * Context provider for SegmentedControl components.
 *
 * @example
 * ```tsx
 * <SegmentedControlProvider indicatorChildren={indicatorElements}>
 *   <SegmentedControlTriggerContent>
 *     <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
 *   </SegmentedControlTriggerContent>
 * </SegmentedControlProvider>
 * ```
 *
 * @param children - SegmentedControlContent and other child components (required)
 * @param indicatorChildren - SegmentedControlIndicator components to inject into content (optional)
 * @returns SegmentedControlProvider component that provides segmented control context
 */
export function SegmentedControlProvider(props: PropsWithChildren<{ indicatorChildren?: React.ReactNode }>) {
  const { children, indicatorChildren } = props;
  const [selectedOption, setSelectedOption] = useState('');
  const [itemWidth, setItemWidth] = useState(0);
  const [validItemsValues, setValidItemsValues] = useState<string[]>([]);

  const actions = useMemo(() => ({ setItemWidth, setSelectedOption, setValidItemsValues }), []);

  const state = useMemo(
    () => ({ indicatorChildren: indicatorChildren || null, itemWidth, selectedOption, validItemsValues }),
    [selectedOption, itemWidth, validItemsValues, indicatorChildren],
  );

  return (
    <SegmentedControlActionsContext.Provider value={actions}>
      <SegmentedControlStateContext.Provider value={state}>{children}</SegmentedControlStateContext.Provider>
    </SegmentedControlActionsContext.Provider>
  );
}
