import type { AccordionTriggerPropsSs } from '@types';

import { isString } from '@utils';
import { BoxSs } from '@components/box';
import { IconSs } from '@components/icon';
import { StringSs } from '@components/string';
import { AnimatedBox } from '@components/animatedBox';
import { RipplePressable } from '@components/ripplePressable';
import { TouchableOpacity, Animated, Pressable } from 'react-native';
import { useState, useEffect, cloneElement, isValidElement, Children, PropsWithChildren } from 'react';

import { useAccordion } from './AccordionContext';
import styles from '../styles/Accordion.ss.styles';
import { useAccordionItem } from './AccordionItemContext';

/**
 * AccordionTrigger is the clickable header that toggles the accordion item.
 * Supports different trigger types (TouchableOpacity, Pressable, etc.) and custom styling.
 *
 * @example
 * ```tsx
 * <AccordionTrigger as="TouchableOpacity">
 *   Is it accessible?
 * </AccordionTrigger>
 *
 * // Using asChild to pass props to child component
 * <AccordionTrigger asChild>
 *   <TouchableOpacity>
 *     <StringSs>Custom Button</StringSs>
 *   </TouchableOpacity>
 * </AccordionTrigger>
 * ```
 *
 * @param as - Component type to use for the trigger (default: TouchableOpacity)
 * @param asChild - Use the child component as the trigger element instead of wrapping it
 * @param children - Content to display in the trigger
 * @param stringProps - Props to pass to String component when children is a string
 * @param style - Additional inline styles
 */
export default function AccordionTrigger(props: PropsWithChildren<AccordionTriggerPropsSs>) {
  const { as, asChild, children, stringProps, style } = props;
  const {
    animationDuration,
    collapseIcon,
    disabled: accordionDisabled,
    expandIcon,
    hasCollapseIcon,
    iconPosition,
    isItemOpen,
    toggleItem,
  } = useAccordion();
  const { disabled: itemDisabled, value } = useAccordionItem();

  const isOpen = isItemOpen(value);

  const disabled = accordionDisabled || itemDisabled;

  const [animation] = useState(new Animated.Value(isOpen ? 1 : 0));

  useEffect(() => {
    Animated.timing(animation, {
      duration: animationDuration,
      toValue: isOpen ? 1 : 0,
      useNativeDriver: false,
    }).start();
  }, [isOpen, animationDuration, animation]);

  const animatedRotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const handlePress = () => {
    if (!disabled) {
      toggleItem(value);
    }
  };

  const commonProps = {
    disabled,
    onPress: handlePress,
    style: [styles.accordionTrigger, disabled && styles.accordionTriggerDisabled, style],
  };

  const renderContent = () => (
    <>
      {hasCollapseIcon && iconPosition === 'left' && (
        <AnimatedBox
          style={{
            transform: [{ rotate: animatedRotation }],
          }}
        >
          <IconSs
            name={isOpen ? (collapseIcon as any) || 'angle-down-solid' : (expandIcon as any) || 'angle-down-solid'}
          />
        </AnimatedBox>
      )}

      {isString(children) ? (
        <StringSs
          style={[
            styles.triggerText,
            hasCollapseIcon && iconPosition === 'left' && styles.accordionTriggerContentWithLeftIcon,
            hasCollapseIcon && iconPosition === 'right' && styles.accordionTriggerContentWithRightIcon,
          ]}
          {...stringProps}
        >
          {children}
        </StringSs>
      ) : (
        <BoxSs
          style={[
            hasCollapseIcon && iconPosition === 'left' && styles.accordionTriggerContentWithLeftIcon,
            hasCollapseIcon && iconPosition === 'right' && styles.accordionTriggerContentWithRightIcon,
          ]}
        >
          {children}
        </BoxSs>
      )}

      {hasCollapseIcon && iconPosition === 'right' && (
        <AnimatedBox
          style={{
            transform: [{ rotate: animatedRotation }],
          }}
        >
          <IconSs
            name={isOpen ? (collapseIcon as any) || 'angle-down-solid' : (expandIcon as any) || 'angle-down-solid'}
          />
        </AnimatedBox>
      )}
    </>
  );

  // Handle asChild case
  if (asChild) {
    const child = Children.only(children);

    if (isValidElement(child)) {
      const childProps = child.props as any;

      return cloneElement(child, {
        ...childProps,
        disabled: disabled || childProps.disabled,
        onPress: (e: any) => {
          childProps.onPress?.(e);
          handlePress();
        },
        style: [childProps.style, style],
      });
    }
  }

  switch (as) {
    case 'pressable':
      return <Pressable {...commonProps}>{renderContent()}</Pressable>;
    case 'ripple-pressable':
      return <RipplePressable {...commonProps}>{renderContent()}</RipplePressable>;
    case 'touchable-opacity':
    default:
      return <TouchableOpacity {...commonProps}>{renderContent()}</TouchableOpacity>;
  }
}
