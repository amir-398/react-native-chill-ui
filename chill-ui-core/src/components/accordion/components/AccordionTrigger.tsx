import type { AccordionTriggerPropsTw } from '@types';

import { Box } from '@components/box';
import { Icon } from '@components/icon';
import { String } from '@components/string';
import { AnimatedBox } from '@components/animatedBox';
import { RipplePressable } from '@components/ripplePressable';
import { TouchableOpacity, Animated, Pressable } from 'react-native';
import { cn, classNameHandler, styleHandler, classNamePropsHandler, isString } from '@utils';
import { useState, useEffect, cloneElement, isValidElement, Children, PropsWithChildren } from 'react';

import { useAccordion } from './AccordionContext';
import styles from '../styles/Accordion.ss.styles';
import { twStyles } from '../styles/Accordion.tw.styles';
import { useAccordionItem } from './AccordionItemContext';

/**
 * AccordionTrigger is the clickable header that toggles the accordion item.
 * Supports different trigger types (TouchableOpacity, Pressable, etc.) and custom styling.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <AccordionTrigger as="TouchableOpacity">
 *   Is it accessible?
 * </AccordionTrigger>
 *
 * // Custom content
 * <AccordionTrigger>
 *   <Box className="flex-row items-center">
 *     <Icon name="user" />
 *     <String>Custom Trigger</String>
 *   </Box>
 * </AccordionTrigger>
 *
 * // Using asChild to pass props to child component
 * <AccordionTrigger asChild>
 *   <TouchableOpacity>
 *     <String>Custom Button</String>
 *   </TouchableOpacity>
 * </AccordionTrigger>
 * ```
 *
 * @param as - Component type to use for the trigger (default: TouchableOpacity)
 * @param asChild - Use the child component as the trigger element instead of wrapping it
 * @param children - Content to display in the trigger
 * @param className - Custom CSS classes
 * @param stringProps - Props to pass to String component when children is a string
 * @param props - Additional TouchableOpacityProps
 */
export default function AccordionTrigger(props: PropsWithChildren<AccordionTriggerPropsTw>) {
  classNamePropsHandler(props, 'AccordionTrigger');
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
    ...classNameHandler(cn(twStyles.accordionTrigger, { [twStyles.accordionTriggerDisabled]: disabled }, className)),
    ...styleHandler({
      defaultStyle: [styles.accordionTrigger, disabled && styles.accordionTriggerDisabled],
      style: [style],
    }),
    onPress: handlePress,
    ...props,
  };

  const renderContent = () => (
    <>
      {hasCollapseIcon && iconPosition === 'left' && (
        <AnimatedBox
          style={{
            transform: [{ rotate: animatedRotation }],
          }}
        >
          <Icon
            name={isOpen ? (collapseIcon as any) || 'angle-down-solid' : (expandIcon as any) || 'angle-down-solid'}
          />
        </AnimatedBox>
      )}

      {isString(children) ? (
        <String
          {...stringProps}
          {...classNameHandler(
            cn(twStyles.accordionTriggerText, {
              [twStyles.accordionTriggerTextWithLeftIcon]: hasCollapseIcon && iconPosition === 'left',
              [twStyles.accordionTriggerTextWithRightIcon]: hasCollapseIcon && iconPosition === 'right',
            }),
          )}
          {...styleHandler({
            defaultStyle: [
              styles.triggerText,
              hasCollapseIcon && iconPosition === 'left' && styles.accordionTriggerContentWithLeftIcon,
              hasCollapseIcon && iconPosition === 'right' && styles.accordionTriggerContentWithRightIcon,
            ],
          })}
        >
          {children}
        </String>
      ) : (
        <Box
          {...classNameHandler(
            cn({
              [twStyles.accordionTriggerTextWithLeftIcon]: hasCollapseIcon && iconPosition === 'left',
              [twStyles.accordionTriggerTextWithRightIcon]: hasCollapseIcon && iconPosition === 'right',
            }),
          )}
          {...styleHandler({
            defaultStyle: [
              hasCollapseIcon && iconPosition === 'left' && styles.accordionTriggerContentWithLeftIcon,
              hasCollapseIcon && iconPosition === 'right' && styles.accordionTriggerContentWithRightIcon,
            ],
          })}
        >
          {children}
        </Box>
      )}

      {hasCollapseIcon && iconPosition === 'right' && (
        <AnimatedBox
          style={{
            transform: [{ rotate: animatedRotation }],
          }}
        >
          <Icon
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
        ...classNameHandler(cn(childProps.className, className)),
        ...styleHandler({ style: [childProps.style, style] }),
        disabled: disabled || childProps.disabled,
        onPress: (e: any) => {
          childProps.onPress?.(e);
          handlePress();
        },
      });
    }
  }

  switch (as) {
    case 'pressable':
      return (
        <Pressable {...commonProps} android_ripple={{ color: '#F6F7F8' }}>
          {renderContent()}
        </Pressable>
      );
    case 'ripple-pressable':
      return (
        <RipplePressable onPress={handlePress} {...classNameHandler(commonProps.className)}>
          {renderContent()}
        </RipplePressable>
      );
    case 'touchable-opacity':
    default:
      return <TouchableOpacity {...commonProps}>{renderContent()}</TouchableOpacity>;
  }
}
