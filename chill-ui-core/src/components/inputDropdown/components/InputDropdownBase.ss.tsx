import { Animated } from 'react-native';
import { BoxSs } from '@components/box';
import { useEffect, useRef } from 'react';
import { InputSs } from '@components/input';
import { AnimatedBoxSs } from '@components/animatedBox';

import type { InputDropdownBaseProps } from '../../../types/inputDropdown/inputDropdown.ss.types';

import { styles } from '../styles/InputDropdownBase.ss.styles';

/**
 * InputDropdownBase component with StyleSheet styling.
 * Provides the base container for dropdown components with optional search functionality and animations.
 * Uses React Native StyleSheet for optimal performance and consistent styling across platforms.
 *
 * @example
 * ```tsx
 * <InputDropdownBase
 *   visible={isOpen}
 *   maxHeight={300}
 *   hasSearch
 *   hasAnimation
 *   hasShadow
 *   style={{ backgroundColor: '#fff', borderRadius: 8 }}
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
 * @param style - Custom style object for the container (StyleSheet)
 * @param searchInputProps - Props to pass to the search Input component
 * @param customSearchInput - Custom search input component to replace the default
 * @returns Base dropdown container with optional search and animations
 */
export default function InputDropdownBase({
  children,
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
    <AnimatedBoxSs style={[styles.inputDropdownBase, hasShadow && styles.inputDropdownBaseShadow, style]}>
      {hasSearch &&
        (customSearchInput ?? (
          <BoxSs style={styles.searchInputContainer}>
            <InputSs size="xs" placeholder="search" {...searchInputProps} />
          </BoxSs>
        ))}
      {children}
    </AnimatedBoxSs>
  );
}
