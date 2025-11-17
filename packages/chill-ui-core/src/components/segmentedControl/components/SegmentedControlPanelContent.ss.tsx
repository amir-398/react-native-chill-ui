import { SlotSs } from '@utils';
import { BoxSs } from '@components/box';
import { PropsWithChildren } from 'react';
import { SegmentedControlPanelsPropsSs } from '@types';

import { styles } from '../styles/SegmentedControl.ss.styles';

/**
 * Container for SegmentedControlPanel components.
 *
 * @example
 * ```tsx
 * <SegmentedControlPanelContent>
 *   <SegmentedControlPanel value="option1">
 *     <Box style={styles.panelContent}>
 *       <String>Content for Option 1</String>
 *     </Box>
 *   </SegmentedControlPanel>
 *   <SegmentedControlPanel value="option2" style={styles.panelContent}>
 *       <String>Content for Option 2</String>
 *   </SegmentedControlPanel>
 * </SegmentedControlPanelContent>
 * ```
 *
 * @param style - Style object for the panels container (React Native)
 * @param asChild - Whether to use the asChild pattern, rendering children directly without wrapper (default: false)
 * @param children - SegmentedControlPanel components to organize and display (required)
 * @param ...rest - All other props from View component (onLayout, testID, accessibilityLabel, etc.)
 * @returns SegmentedControlPanelContent component that wraps and styles panel content
 */
export function SegmentedControlPanelContent(props: PropsWithChildren<SegmentedControlPanelsPropsSs>) {
  const { asChild, children, style, ...rest } = props;

  if (asChild) {
    return (
      <SlotSs style={style} {...rest}>
        {children}
      </SlotSs>
    );
  }

  return (
    <BoxSs style={[styles.panelContentContainer, style]} {...rest}>
      {children}
    </BoxSs>
  );
}

SegmentedControlPanelContent.displayName = 'SegmentedControlPanelContent';
