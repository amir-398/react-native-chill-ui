import { SlotSs } from '@utils';
import { BoxSs } from '@components/box';
import { PropsWithChildren } from 'react';
import { SegmentedControlPanelPropsSs } from '@types';

import { styles } from '../styles/SegmentedControl.ss.styles';
import { useSegmentedControlState } from '../context/SegmentedControlContext';

/**
 * Panel that renders content when its value matches the selected option.
 *
 * @example
 * ```tsx
 * <SegmentedControlPanel value="option1">
 *   <Box style={styles.panelContent}>
 *     <String style={styles.panelTitle}>Content for Option 1</String>
 *   </Box>
 * </SegmentedControlPanel>
 * ```
 *
 * @param value - The value that must match the selected option to display this panel (required)
 * @param asChild - Whether to use the asChild pattern, rendering children directly without wrapper (default: false)
 * @param style - Style object for the panel container (React Native)
 * @param children - Child components to render when this panel is active (required)
 * @param ...rest - All other props from View component (onLayout, testID, accessibilityLabel, etc.)
 * @returns SegmentedControlPanel component that conditionally renders content
 * @throws Error if used outside of SegmentedControlProvider context
 */
export function SegmentedControlPanel(props: PropsWithChildren<SegmentedControlPanelPropsSs>) {
  const { asChild, children, forceRender, style, value, ...rest } = props;
  const { selectedOption } = useSegmentedControlState();

  if (!forceRender && selectedOption !== value) {
    return null;
  }

  if (asChild) {
    return (
      <SlotSs style={style} {...rest}>
        {children}
      </SlotSs>
    );
  }

  return (
    <BoxSs style={[styles.panelContainer, style]} {...rest}>
      {children}
    </BoxSs>
  );
}

SegmentedControlPanel.displayName = 'SegmentedControlPanel';
