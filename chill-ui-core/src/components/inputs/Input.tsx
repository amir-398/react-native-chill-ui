import { cn } from '@utils';
import { forwardRef, useEffect, useState } from 'react';
// eslint-disable-next-line
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Pressable, TextInput, View } from 'react-native';

import Icon from '../icon';
import { Box } from '../box';
import { String } from '../string';
import inputSizeVariants from './styleVariants';
import { InputProps } from '../../types/input.types';
import { getStringLength, isString } from '../../utils';

/**
 * Input component with advanced features including validation, icons, animations, and accessibility support.
 * Supports multiple input types, validation patterns, icons, error handling, and customizable styling.
 *
 * @example
 * ```tsx
 * // Basic input
 * <Input
 *   placeholder="Enter your name"
 *   onChangeText={(text) => console.log(text)}
 * />
 *
 * // Input with label and validation
 * <Input
 *   label="Email Address"
 *   placeholder="Enter your email"
 *   allow="all"
 *   hasError={!!emailError}
 *   errorMessage={emailError}
 *   onChangeText={setEmail}
 * />
 *
 * // Input with icons
 * <Input
 *   placeholder="Search..."
 *   leftIconAction={{
 *     iconName: 'search-solid',
 *     iconSize: 'sm',
 *     iconColor: '#666',
 *   }}
 *   rightIconAction={{
 *     iconName: 'filter-solid',
 *     iconSize: 'sm',
 *     iconPress: handleFilter,
 *   }}
 *   onChangeText={setSearchQuery}
 * />
 *
 * ```
 *

 * @param label - Label text for the input
 * @param className - Custom CSS classes for the input container
 * @param labelClassName - Custom CSS classes for the label
 * @param wrapperRef - Reference to the wrapper component
 * @param hasError - Whether the input has an error
 * @param errorMessage - Error message to display
 * @param errorClassName - Custom CSS classes for the error message
 * @param errorIconName - Icon name to display with error
 * @param hasClearIcon - Whether to show clear icon
 * @param inputClassName - Custom CSS classes for the input field
 * @param leftIconAction - Left icon configuration with iconName, iconColor, iconSize, customIcon, iconPress
 * @param rightIconAction - Right icon configuration with iconName, iconColor, iconSize, customIcon, iconPress
 * @param hasSecureTextEntry - Whether to show secure text entry
 * @param clickableAs - Type of clickable interaction ('pressable' | 'scale')
 * @param showLength - Whether to show character count
 * @param customRegex - Custom regex pattern for validation
 * @param allow - Allowed input types ('all' | 'numbers' | 'letters' | 'lettersWithoutSpecialCharacters')
 * @param isDisabled - Whether the input is disabled
 * @param isStretchable - Whether the input stretches to fill container
 * @param size - Size variant for the input ('xs' | 'sm' | 'md' | 'lg')
 * @param value - Current input value
 * @param onChangeText - Callback when text changes
 * @param placeholder - Placeholder text
 * @param multiline - Whether input supports multiple lines
 * @param maxLength - Maximum character length
 * @param editable - Whether input is editable
 * @param onPress - Callback when input is pressed
 * @param secureTextEntry - Whether to show secure text entry (inherited from TextInputProps)
 * @param ref - Forwarded ref to the underlying TextInput component
 * @returns Input component with label, validation, icons, and error handling
 */
const Input = forwardRef<TextInput, InputProps>((props, ref) => {
  const {
    allow = 'all',
    className,
    clickableAs = 'scale',
    customRegex,
    editable = true,
    errorClassName,
    errorIconName,
    errorMessage,
    hasClearIcon = true,
    hasError,
    hasSecureTextEntry,
    inputClassName,
    isDisabled,
    isStretchable,
    label,
    labelClassName,
    leftIconAction,
    maxLength,
    multiline,
    onChangeText,
    onPress,
    rightIconAction,
    showLength,
    size = 'md',
    value,
    wrapperRef,
    ...rest
  } = props;

  const [isSecureEntry, setIsSecureEntry] = useState<boolean>(hasSecureTextEntry || false);
  const [inputValue, setInputValue] = useState<string>(value || '');
  const scale = useSharedValue(1);

  /**
   * Validates input text based on allow prop or custom regex
   * @param text - Text to validate
   * @returns Whether the text is valid according to validation rules
   */
  const validateInput = (text: string): boolean => {
    if (customRegex) {
      return customRegex.test(text);
    }

    switch (allow) {
      case 'numbers':
        return /^\d*$/.test(text);
      case 'letters':
        return /^[a-zA-ZÀ-ÿ\s]*$/.test(text);
      case 'lettersWithoutSpecialCharacters':
        return /^[a-zA-ZÀ-ÿ0-9\s]*$/.test(text);
      case 'all':
      default:
        return true;
    }
  };

  /**
   * Clears the input value and calls onChangeText callback
   */
  const handleClearInput = () => {
    setInputValue('');
    onChangeText?.('');
  };

  /**
   * Handles text changes with validation and state updates
   * @param text - New text value to process
   */
  const handleOnChange = (text: string) => {
    if (validateInput(text)) {
      !isString(value) && setInputValue(text);
      onChangeText?.(text);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  /**
   * Handles press in animation for scale effect
   */
  const handlePressIn = () => {
    scale.value = withTiming(0.98, { duration: 100 });
  };

  /**
   * Handles press out animation to restore scale
   */
  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  /**
   * Renders the TextInput component with applied styles and props
   * @returns TextInput component with proper styling and behavior
   */
  const renderInput = () => (
    <TextInput
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      ref={ref}
      value={inputValue}
      className={cn(
        'flex-1',
        inputSizeVariants({ isStretchable, multiline, size }),
        inputClassName,
        hasError && errorClassName,
      )}
      onChangeText={handleOnChange}
      secureTextEntry={isSecureEntry}
      multiline={multiline}
      maxLength={maxLength}
      editable={isDisabled ? false : !!editable}
      {...rest}
    />
  );

  /**
   * Renders the input with optional pressable wrapper for animations
   * @returns Input component with or without animated pressable wrapper
   */
  const renderPressableInput = () => {
    if (clickableAs === 'scale') {
      return (
        <Animated.View
          style={animatedStyle}
          className={cn('flex-1', inputSizeVariants({ isStretchable, multiline, size }))}
        >
          {renderInput()}
        </Animated.View>
      );
    }
    return renderInput();
  };

  return (
    <Box>
      {label && (
        <String size="sm" className={cn('mb-1 ml-1', labelClassName)}>
          {label}
        </String>
      )}
      <View
        ref={wrapperRef}
        className={cn(
          'flex flex-row items-center rounded-lg border border-gray-300 bg-white px-3 text-black',
          { 'border-red-500': hasError },
          { 'opacity-50': isDisabled },
          className,
        )}
      >
        {!!leftIconAction?.iconName && !leftIconAction?.customIcon && (
          <Icon
            name={leftIconAction?.iconName}
            size={leftIconAction?.iconSize || 'sm'}
            color={leftIconAction?.iconColor}
            onPress={leftIconAction?.iconPress}
            className="mr-1.5"
          />
        )}
        {leftIconAction?.customIcon && (
          <Pressable onPress={leftIconAction?.iconPress} className="mr-1.5">
            {leftIconAction?.customIcon}
          </Pressable>
        )}

        {onPress ? renderPressableInput() : renderInput()}

        <Box className="flex-row items-center gap-1">
          {inputValue.length > 0 && hasClearIcon && <Icon onPress={handleClearInput} name="xmark-solid" size="sm" />}

          {!!rightIconAction?.iconName && !rightIconAction?.customIcon && (
            <Icon
              name={rightIconAction?.iconName}
              size={rightIconAction?.iconSize || 'sm'}
              color={rightIconAction?.iconColor}
              onPress={rightIconAction?.iconPress}
            />
          )}
          {rightIconAction?.customIcon && (
            <Pressable onPress={rightIconAction?.iconPress}>{rightIconAction?.customIcon}</Pressable>
          )}
        </Box>

        {hasSecureTextEntry && (
          <Icon
            onPress={() => setIsSecureEntry(!isSecureEntry)}
            name={isSecureEntry ? 'eye-slash-solid' : 'eye-solid'}
            size="sm"
          />
        )}
      </View>
      <Box className={cn('flex-row items-center justify-between gap-1', showLength && 'justify-end')}>
        {hasError && (
          <Box className="h-5 flex-row items-center gap-1 pl-1">
            {!!errorIconName && <Icon name={errorIconName} size="xs" color="#FF0000" />}
            <String size="xs" colorVariant="error">
              {errorMessage}
            </String>
          </Box>
        )}
        {showLength && (
          <String size="xs" className="mr-0.5">
            {maxLength ? `${getStringLength(inputValue ?? '')}/${maxLength}` : getStringLength(inputValue ?? '')}
          </String>
        )}
      </Box>
    </Box>
  );
});

Input.displayName = 'Input';

export default Input;
