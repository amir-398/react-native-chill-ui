import { cn } from '@utils';
import { useState, useEffect, cloneElement, isValidElement, Children } from 'react';
import { TouchableOpacity, Animated, TouchableHighlight, Pressable } from 'react-native';

import type { AccordionTriggerProps } from '../../types/accordion.types';

import Icon from '../icon';
import { Box } from '../box';
import { String } from '../string';
import styles from './Accordion.style';
import { AnimatedBox } from '../animatedBox';
import { useAccordion } from './AccordionContext';
import { RipplePressable } from '../ripplePressable';
import { useAccordionItem } from './AccordionItemContext';
import { isNativeWindInstalled } from '../../utils/hybrid/nativewindDetector';
import { classNamePropsHandler } from '../../utils/hybrid/classNamePropsHandler';

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
export default function AccordionTrigger(props: AccordionTriggerProps) {
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

  const commonProps = isNativeWindInstalled()
    ? {
        className: cn(
          'w-full flex-row items-center justify-between border-y border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3',
          {
            'opacity-50': disabled,
          },
          className,
        ),
        disabled,
        onPress: handlePress,
        style,
        ...props,
      }
    : {
        disabled,
        onPress: handlePress,
        style: [styles.accordionTrigger, disabled && styles.accordionTriggerDisabled, style],
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

      <Box style={styles.accordionTriggerContent}>
        {typeof children === 'string' ? (
          <String
            {...stringProps}
            {...(isNativeWindInstalled()
              ? {
                  className: cn('text-gray-900', {
                    'ml-3': hasCollapseIcon && iconPosition === 'left',
                    'mr-3': hasCollapseIcon && iconPosition === 'right',
                  }),
                }
              : {
                  style: [
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
            {...(isNativeWindInstalled()
              ? {
                  className: cn({
                    'ml-3': hasCollapseIcon && iconPosition === 'left',
                    'mr-3': hasCollapseIcon && iconPosition === 'right',
                  }),
                }
              : {
                  style: [
                    hasCollapseIcon && iconPosition === 'left' && styles.accordionTriggerContentWithLeftIcon,
                    hasCollapseIcon && iconPosition === 'right' && styles.accordionTriggerContentWithRightIcon,
                  ],
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

      if (isNativeWindInstalled()) {
        return cloneElement(child, {
          ...childProps,
          className: cn(childProps.className, commonProps.className),
          disabled: disabled || childProps.disabled,
          onPress: (e: any) => {
            childProps.onPress?.(e);
            handlePress();
          },
          style: [childProps.style, commonProps.style],
        });
      }
      return cloneElement(child, {
        ...childProps,
        disabled: disabled || childProps.disabled,
        onPress: (e: any) => {
          childProps.onPress?.(e);
          handlePress();
        },
        style: [childProps.style, commonProps.style],
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
