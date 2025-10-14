import { Box } from '@components/box';
import { SegmentedControlTriggerContentPropsTw } from '@types';
import { useEffect, PropsWithChildren, useMemo, memo, useState } from 'react';
import { cn, classNameHandler, classNamePropsHandler, styleHandler } from '@utils';

import { styles } from '../styles/SegmentedControl.ss.styles';
import { twStyles } from '../styles/SegmentedControl.tw.styles';
import { segmentedControlDefaultProps } from '../utils/defaultProps';
import { SegmentedControlTrigger } from './SegmentedControlTrigger.tw';
import { useSegmentedControlActions, useSegmentedControlState } from '../context/SegmentedControlContext';

/**
 * Container for SegmentedControlTrigger components.
 *
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <SegmentedControlTriggerContent onChange={(option) => console.log('Selected:', option)}>
 *   <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
 *   <SegmentedControlTrigger value="option2">Option 2</SegmentedControlTrigger>
 * </SegmentedControlTriggerContent>
 * ```
 *
 * @param children - SegmentedControlTrigger components to display (required)
 * @param className - Custom CSS classes for styling the container (NativeWind)
 * @param defaultValue - Initial selected option value (must match one of the trigger values)
 * @param internalPadding - Internal padding between trigger items in pixels (default: from defaultProps)
 * @param onChange - Callback function called when the selected option changes, receives the new option value
 * @param style - Style object for the container (React Native)
 * @returns SegmentedControlTriggerContent component that manages trigger layout and state
 * @throws Error if defaultValue doesn't match any trigger value
 */

function SegmentedControlTriggerContentImpl(props: PropsWithChildren<SegmentedControlTriggerContentPropsTw>) {
  classNamePropsHandler(props, 'SegmentedControlTriggerContent');
  const { children, className, defaultValue, internalPadding, onChange, style } = props;
  const { setItemWidth, setSelectedOption, setValidItemsValues } = useSegmentedControlActions();
  const [segmentedWidth, setSegmentedWidth] = useState(0);
  const { indicatorChildren, selectedOption } = useSegmentedControlState();

  const childrenArray = useMemo(() => {
    if (!children) return [];
    return Array.isArray(children) ? children : [children];
  }, [children]);

  const triggersChildren = useMemo(
    () => childrenArray.filter(item => item.type === SegmentedControlTrigger),
    [childrenArray],
  );

  const validItemsValues = useMemo(() => triggersChildren.map(item => item.props.value), [triggersChildren]);

  const defaultInternalPadding = useMemo(
    () => internalPadding ?? segmentedControlDefaultProps.internalPadding,
    [internalPadding],
  );

  useEffect(() => {
    setValidItemsValues(validItemsValues);
    if (validItemsValues.length > 0) {
      if (defaultValue && !validItemsValues.includes(defaultValue)) {
        setSelectedOption(validItemsValues[0]);
        console.error(segmentedControlDefaultProps.defaultValueWrongMessage);
        return;
      }
      const defaultOption = defaultValue ?? validItemsValues[0];
      setSelectedOption(defaultOption);
    }
  }, [validItemsValues, setValidItemsValues, setSelectedOption, defaultValue]);

  useEffect(() => {
    onChange?.(selectedOption);
  }, [selectedOption, onChange]);

  const itemWidth = useMemo(
    () => (segmentedWidth - defaultInternalPadding) / triggersChildren.length,
    [segmentedWidth, triggersChildren, defaultInternalPadding],
  );

  useEffect(() => {
    setItemWidth(itemWidth);
  }, [itemWidth, setItemWidth]);

  return (
    <Box
      onLayout={e => setSegmentedWidth(e.nativeEvent.layout.width)}
      {...classNameHandler(cn(twStyles.contentContainer, className))}
      {...styleHandler({
        defaultStyle: [
          styles.contentContainer,
          {
            paddingLeft: defaultInternalPadding / 2,
          },
        ],
        style,
      })}
    >
      {indicatorChildren}
      {childrenArray}
    </Box>
  );
}

export const SegmentedControlTriggerContent = memo(SegmentedControlTriggerContentImpl);

SegmentedControlTriggerContent.displayName = 'SegmentedControlTriggerContent';
