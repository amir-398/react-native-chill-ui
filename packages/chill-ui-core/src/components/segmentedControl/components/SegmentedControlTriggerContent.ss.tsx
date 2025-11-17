import { BoxSs } from '@components/box';
import { SegmentedControlTriggerContentPropsSs } from '@types';
import { useEffect, PropsWithChildren, useMemo, memo, useState } from 'react';

import { styles } from '../styles/SegmentedControl.ss.styles';
import { segmentedControlDefaultProps } from '../utils/defaultProps';
import { SegmentedControlTrigger } from './SegmentedControlTrigger.ss';
import { useSegmentedControlActions, useSegmentedControlState } from '../context/SegmentedControlContext';

/**
 * Container for SegmentedControlTrigger components.
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
 * @param style - Style object for the container (React Native)
 * @param defaultValue - Initial selected option value (must match one of the trigger values)
 * @param internalPadding - Internal padding between trigger items in pixels (default: from defaultProps)
 * @param onChange - Callback function called when the selected option changes, receives the new option value
 * @returns SegmentedControlTriggerContent component that manages trigger layout and state
 * @throws Error if defaultValue doesn't match any trigger value
 */

function SegmentedControlTriggerContentImpl(props: PropsWithChildren<SegmentedControlTriggerContentPropsSs>) {
  const { children, defaultValue, internalPadding, onChange, style } = props;
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
    <BoxSs
      onLayout={e => setSegmentedWidth(e.nativeEvent.layout.width)}
      style={[
        styles.contentContainer,
        {
          paddingLeft: defaultInternalPadding / 2,
        },
        style,
      ]}
    >
      {indicatorChildren}
      {childrenArray}
    </BoxSs>
  );
}

export const SegmentedControlTriggerContent = memo(SegmentedControlTriggerContentImpl);

SegmentedControlTriggerContent.displayName = 'SegmentedControlTriggerContent';
