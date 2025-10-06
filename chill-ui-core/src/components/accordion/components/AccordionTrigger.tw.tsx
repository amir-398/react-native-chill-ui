import type { AccordionTriggerPropsTw } from '@types';

import { cn, isString } from '@utils';
import { BoxTw } from '@components/box';
import { IconTw } from '@components/icon';
import { StringTw } from '@components/string';
import { AnimatedBox } from '@components/animatedBox';
import { RipplePressableTw } from '@components/ripplePressable';
import { TouchableOpacity, Animated, Pressable } from 'react-native';
import { useState, useEffect, cloneElement, isValidElement, Children, PropsWithChildren } from 'react';

import { useAccordion } from './AccordionContext';
import { twStyles } from '../styles/Accordion.tw.styles';
import { useAccordionItem } from './AccordionItemContext';

/**
 * AccordionTrigger is the clickable header that toggles the accordion item.
 * Supports different trigger types (TouchableOpacity, Pressable, etc.) and custom styling.
 *
 * @example
 * ```tsx
 * <AccordionTrigger as="touchable-opacity">
 *   Is it accessible?
 * </AccordionTrigger>
 *
 * // Using asChild to pass props to child component
 * <AccordionTrigger asChild>
 *   <TouchableOpacity>
 *     <StringTw>Custom Button</StringTw>
 *   </TouchableOpacity>
 * </AccordionTrigger>
 * ```
 *
 * @param as - Component type to use for the trigger (default: TouchableOpacity)
 * @param asChild - Use the child component as the trigger element instead of wrapping it
 * @param children - Content to display in the trigger (Element or string)
 * @param className - Custom CSS classes
 * @param stringProps - Props to pass to String component when children is a string
 * @param style - Additional inline styles
 */
export default function AccordionTrigger(props: PropsWithChildren<AccordionTriggerPropsTw>) {
  const { as, asChild, children, className, stringProps, style } = props;

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
    className: cn(twStyles.accordionTrigger, { [twStyles.accordionTriggerDisabled]: disabled }, className),
    disabled,
    onPress: handlePress,
    style,
  };

  const renderContent = () => (
    <>
      {hasCollapseIcon && iconPosition === 'left' && (
        <AnimatedBox
          style={{
            transform: [{ rotate: animatedRotation }],
          }}
        >
          <IconTw
            name={isOpen ? (collapseIcon as any) || 'angle-down-solid' : (expandIcon as any) || 'angle-down-solid'}
          />
        </AnimatedBox>
      )}

      {isString(children) ? (
        <StringTw
          className={cn(
            twStyles.accordionTriggerText,
            hasCollapseIcon && iconPosition === 'left' && twStyles.accordionTriggerTextWithLeftIcon,
            hasCollapseIcon && iconPosition === 'right' && twStyles.accordionTriggerTextWithRightIcon,
          )}
          {...stringProps}
        >
          {children}
        </StringTw>
      ) : (
        <BoxTw
          className={cn(
            hasCollapseIcon && iconPosition === 'left' && twStyles.accordionTriggerTextWithLeftIcon,
            hasCollapseIcon && iconPosition === 'right' && twStyles.accordionTriggerTextWithRightIcon,
          )}
        >
          {children}
        </BoxTw>
      )}

      {hasCollapseIcon && iconPosition === 'right' && (
        <AnimatedBox
          style={{
            transform: [{ rotate: animatedRotation }],
          }}
        >
          <IconTw
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
        className: cn(childProps.className, className),
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
      return <RipplePressableTw {...commonProps}>{renderContent()}</RipplePressableTw>;
    case 'touchable-opacity':
    default:
      return <TouchableOpacity {...commonProps}>{renderContent()}</TouchableOpacity>;
  }
}
