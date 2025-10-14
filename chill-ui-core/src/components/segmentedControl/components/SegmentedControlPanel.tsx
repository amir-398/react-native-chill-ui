import { Box } from '@components/box';
import { PropsWithChildren } from 'react';
import { SegmentedControlPanelPropsTw } from '@types';
import { cn, classNameHandler, classNamePropsHandler, SlotTw, styleHandler } from '@utils';

import { styles } from '../styles/SegmentedControl.ss.styles';
import { twStyles } from '../styles/SegmentedControl.tw.styles';
import { useSegmentedControlState } from '../context/SegmentedControlContext';

/**
 * Panel that renders content when its value matches the selected option.
 *
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <SegmentedControlPanel value="option1">
 *   <Box className="p-4 bg-blue-100 rounded-lg">
 *     <String className="text-lg font-bold">Content for Option 1</String>
 *   </Box>
 * </SegmentedControlPanel>
 * ```
 *
 * @param value - The value that must match the selected option to display this panel (required)
 * @param asChild - Whether to use the asChild pattern, rendering children directly without wrapper (default: false)
 * @param className - Custom CSS classes for styling the panel container (NativeWind)
 * @param forceRender - If true, renders the panel even when not selected (used internally by slider) (default: false)
 * @param style - Style object for the panel container (React Native)
 * @param children - Child components to render when this panel is active (required)
 * @param ...rest - All other props from View component (onLayout, testID, accessibilityLabel, etc.)
 * @returns SegmentedControlPanel component that conditionally renders content
 * @throws Error if used outside of SegmentedControlProvider context
 */
export function SegmentedControlPanel(props: PropsWithChildren<SegmentedControlPanelPropsTw>) {
  classNamePropsHandler(props, 'SegmentedControlPanel');
  const { asChild, children, className, forceRender, style, value, ...rest } = props;
  const { selectedOption } = useSegmentedControlState();

  if (!forceRender && selectedOption !== value) {
    return null;
  }

  if (asChild) {
    return (
      <SlotTw className={className} {...rest}>
        {children}
      </SlotTw>
    );
  }

  return (
    <Box
      {...classNameHandler(cn(twStyles.panelContainer, className))}
      {...styleHandler({ defaultStyle: styles.panelContainer, style })}
      {...rest}
    >
      {children}
    </Box>
  );
}

SegmentedControlPanel.displayName = 'SegmentedControlPanel';
