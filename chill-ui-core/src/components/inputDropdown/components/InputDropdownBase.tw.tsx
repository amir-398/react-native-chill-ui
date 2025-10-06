import { cn } from '@utils';
import { Animated } from 'react-native';
import { BoxTw } from '@components/box';
import { useEffect, useRef } from 'react';
import { InputTw } from '@components/input';
import { AnimatedBoxTw } from '@components/animatedBox';

import { InputDropdownBaseProps } from '../../../types/inputDropdown/inputDropdown.tw.types';
import { inputDropdownBaseClassname, searchInputContainerClassname } from '../styles/InputDropdownBase.tw.styles';

/**
 * Provides the base container for dropdown components with optional search functionality and animations.
 *
 * @example
 * ```tsx
 * <InputDropdownBase
 *   visible={isOpen}
 *   maxHeight={300}
 *   hasSearch
 *   hasAnimation
 *   hasShadow
 *   className="bg-white rounded-lg shadow-lg border border-gray-200"
 * >
 *   <DropdownContent />
 * </InputDropdownBase>
 * ```
 *
 * @param children - Content to render inside the dropdown container
 * @param visible - Whether the dropdown is visible and should be rendered
 * @param maxHeight - Maximum height of the dropdown container
 * @param minHeight - Minimum height of the dropdown container
 * @param hasAnimation - Whether to enable opening/closing animations (default: true)
 * @param hasSearch - Whether to show a search input at the top
 * @param hasShadow - Whether to apply shadow styling
 * @param className - Custom Tailwind CSS classes for the container
 * @param searchInputProps - Props to pass to the search Input component
 * @param customSearchInput - Custom search input component to replace the default
 * @returns Base dropdown container with optional search and animations
 */
export default function InputDropdownBase({
  children,
  className,
  customSearchInput,
  hasAnimation = true,
  hasSearch,
  hasShadow,
  maxHeight,
  minHeight,
  searchInputProps,
  visible,
}: InputDropdownBaseProps) {
  const animatedHeight = useRef(new Animated.Value(minHeight ?? 0)).current;

  useEffect(() => {
    if (visible && hasAnimation) {
      Animated.timing(animatedHeight, {
        duration: 200,
        toValue: maxHeight ?? 250,
        useNativeDriver: false,
      }).start();
    }
  }, [visible, hasAnimation, maxHeight, minHeight, animatedHeight]);

  return (
    <AnimatedBoxTw
      className={cn(inputDropdownBaseClassname, className)}
      style={[
        {
          height: 'auto',
          maxHeight: hasAnimation ? animatedHeight : maxHeight,
          minHeight,
        },
        hasShadow && {
          shadowColor: '#000',
          shadowOffset: { height: 1, width: 0 },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
        },
      ]}
    >
      {hasSearch &&
        (customSearchInput ?? (
          <BoxTw className={searchInputContainerClassname}>
            <InputTw size="xs" placeholder="search" {...searchInputProps} />
          </BoxTw>
        ))}
      {children}
    </AnimatedBoxTw>
  );
}
