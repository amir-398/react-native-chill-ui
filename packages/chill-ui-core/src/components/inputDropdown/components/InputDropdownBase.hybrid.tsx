import { Box } from '@components/box';
import { Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { Input } from '@components/input';
import { AnimatedBox } from '@components/animatedBox';
import { classNameHandler, cn, styleHandler } from '@utils';

import { styles } from '../styles/InputDropdownBase.ss.styles';
import { InputDropdownBaseProps } from '../../../types/inputDropdown/inputDropdown.hybrid.types';
import { inputDropdownBaseClassname, searchInputContainerClassname } from '../styles/InputDropdownBase.tw.styles';

/**
 * InputDropdownBase component with Hybrid styling (Tailwind + StyleSheet).
 * Provides the base container for dropdown components with optional search functionality and animations.
 * Handles the dropdown container styling, animations, and search input rendering.
 *
 * @example
 * ```tsx
 * <InputDropdownBase
 *   visible={isOpen}
 *   maxHeight={300}
 *   hasSearch
 *   hasAnimation
 *   hasShadow
 *   className="bg-white rounded-lg"
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
 * @param className - Custom CSS classes for the container (Tailwind/CSS)
 * @param style - Custom style object for the container
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
  style,
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
    <AnimatedBox
      {...classNameHandler(cn(inputDropdownBaseClassname, className))}
      {...styleHandler({
        defaultStyle: [styles.inputDropdownBase],
        style: [
          hasShadow && styles.inputDropdownBaseShadow,
          {
            height: 'auto',
            maxHeight: hasAnimation ? animatedHeight : maxHeight,
            minHeight,
          },
          style,
        ],
      })}
    >
      {hasSearch &&
        (customSearchInput ?? (
          <Box className={searchInputContainerClassname}>
            <Input size="xs" placeholder="search" {...searchInputProps} />
          </Box>
        ))}
      {children}
    </AnimatedBox>
  );
}
