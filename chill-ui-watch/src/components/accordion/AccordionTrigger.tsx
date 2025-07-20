import { useState, useEffect, cloneElement, isValidElement, Children } from 'react';
import { TouchableOpacity, Animated, TouchableHighlight, Pressable } from 'react-native';

import type { AccordionTriggerProps } from '../../types';

import cn from '../cn';
import Icon from '../icon';
import { Box } from '../box';
import String from '../string';
import { AnimatedBox } from '../animated-box';
import RipplePressable from '../ripple-pressable';
import { useAccordion } from './AccordionContext';
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
export default function AccordionTrigger({
  as = 'TouchableOpacity',
  asChild = false,
  children,
  className,
  stringProps,
  ...props
}: AccordionTriggerProps) {
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
    className: cn(
      'w-full flex-row items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3',
      {
        'opacity-50': disabled,
      },
      className,
    ),
    disabled,
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

      <Box className="flex-1">
        {typeof children === 'string' ? (
          <String
            {...stringProps}
            className={cn('text-gray-900', {
              'ml-3': hasCollapseIcon && iconPosition === 'left',
              'mr-3': hasCollapseIcon && iconPosition === 'right',
            })}
            weight="medium"
          >
            {children}
          </String>
        ) : (
          <Box
            className={cn({
              'ml-3': hasCollapseIcon && iconPosition === 'left',
              'mr-3': hasCollapseIcon && iconPosition === 'right',
            })}
          >
            {children}
          </Box>
        )}
      </Box>

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
        className: cn(childProps.className, commonProps.className),
        disabled: disabled || childProps.disabled,
        onPress: (e: any) => {
          childProps.onPress?.(e);
          handlePress();
        },
      });
    }
  }

  switch (as) {
    case 'TouchableHighlight':
      return (
        <TouchableHighlight {...commonProps} underlayColor="#F6F7F8">
          {renderContent()}
        </TouchableHighlight>
      );
    case 'Pressable':
      return (
        <Pressable {...commonProps} android_ripple={{ color: '#F6F7F8' }}>
          {renderContent()}
        </Pressable>
      );
    case 'RipplePressable':
      return (
        <RipplePressable onPress={handlePress} className={commonProps.className}>
          {renderContent()}
        </RipplePressable>
      );
    case 'TouchableOpacity':
    default:
      return (
        <TouchableOpacity {...commonProps} activeOpacity={0.7}>
          {renderContent()}
        </TouchableOpacity>
      );
  }
}
