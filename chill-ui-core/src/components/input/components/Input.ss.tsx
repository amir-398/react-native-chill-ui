import { InputPropsSs } from '@types';
import { BoxSs } from '@components/box';
import { IconSs } from '@components/icon';
import { StringSs } from '@components/string';
import { getStringLength, isString } from '@utils';
import { AnimatedBoxSs } from '@components/animatedBox';
import { Animated, Pressable, TextInput } from 'react-native';
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';

import { inputDefaultProps } from '../utils/defaultProps';
import { inputContainerSv, inputSv, styles } from '../styles/Input.ss.styles';

/**
 * Input component with StyleSheet styling.
 * Provides a comprehensive text input with validation, icons, error handling, and customizable styling.
 *
 * @example
 * ```tsx
 * // Basic input with label
 * <Input
 *   label="Email"
 *   placeholder="Enter your email"
 *   value={email}
 *   onChangeText={setEmail}
 * />
 *
 * // Input with validation and error handling
 * <Input
 *   label="Password"
 *   placeholder="Enter password"
 *   hasSecureTextEntry
 *   hasError={hasError}
 *   errorMessage="Password is required"
 *   allow="lettersWithoutSpecialCharacters"
 * />
 * ```
 *
 * @param allow - Input validation type ('all' | 'numbers' | 'letters' | 'lettersWithoutSpecialCharacters')
 * @param clearIconProps - Props for the clear icon component
 * @param clickableAs - Animation type when input is pressed ('scale' | undefined)
 * @param customRegex - Custom regex pattern for input validation
 * @param editable - Whether the input is editable (default: true)
 * @param errorStyle - Custom CSS classes for the error message
 * @param errorIconName - Icon name to display with error message
 * @param errorMessage - Error message to display below input
 * @param errorStringProps - Props for the error message String component
 * @param eyeIconProps - Props for the eye/eye-slash icon component
 * @param font - Font family variant for the input text
 * @param hasClearIcon - Whether to show clear icon when input has value (default: true)
 * @param hasError - Whether input is in error state
 * @param hasSecureTextEntry - Whether input should hide text (password field)
 * @param inputStyle - Custom CSS classes for the input field
 * @param isDisabled - Whether input is disabled
 * @param isStretchable - Whether input should stretch to full width
 * @param label - Label text to display above input
 * @param labelStringProps - Props for the label String component
 * @param leftIconAction - Configuration for left icon (iconName, iconSize, iconColor, iconPress, customIcon)
 * @param lengthStringProps - Props for the character count String component
 * @param maxLength - Maximum number of characters allowed
 * @param multiline - Whether input supports multiple lines
 * @param onChangeText - Callback when input text changes
 * @param onPress - Callback when input is pressed
 * @param rightIconAction - Configuration for right icon (iconName, iconSize, iconColor, iconPress, customIcon)
 * @param showLength - Whether to show character count
 * @param size - Input size variant ('xs' | 'sm' | 'md' | 'lg' | 'xl')
 * @param value - Current input value
 * @param wrapperRef - Ref for the input container wrapper
 * @returns Styled input component with validation and icon support using StyleSheet
 */
const Input = forwardRef<TextInput, InputPropsSs>((props, ref) => {
  const {
    allow = inputDefaultProps.allow,
    clearIconProps,
    clickableAs,
    customRegex,
    editable = inputDefaultProps.editable,
    errorIconName,
    errorMessage,
    errorStringProps,
    errorStyle,
    eyeIconProps,
    font = inputDefaultProps.font,
    hasClearIcon = inputDefaultProps.hasClearIcon,
    hasError,
    hasSecureTextEntry,
    inputStyle,
    isDisabled,
    isStretchable,
    label,
    labelStringProps,
    leftIconAction,
    lengthStringProps,
    maxLength,
    multiline,
    onChangeText,
    onPress,
    rightIconAction,
    showLength,
    size = inputDefaultProps.size,
    style,
    value,
    wrapperRef,
    ...rest
  } = props;

  const [isSecureEntry, setIsSecureEntry] = useState<boolean>(hasSecureTextEntry || false);
  const [inputValue, setInputValue] = useState<string>(value || '');
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const xmarkIconSize = useMemo(() => {
    if (size === 'lg' || size === 'xl') return 'sm';
    return 'xs';
  }, [size]);

  /**
   * Validates input text based on allow prop or custom regex
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
   */
  const handleOnChange = (text: string) => {
    if (validateInput(text)) {
      !isString(value) && setInputValue(text);
      onChangeText?.(text);
    }
  };

  /**
   * Handles press in animation for scale effect
   */
  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      duration: 100,
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  /**
   * Handles press out animation to restore scale
   */
  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      duration: 100,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  return (
    <BoxSs>
      {!!label && (
        <StringSs size="sm" style={[styles.label]} {...labelStringProps}>
          {label}
        </StringSs>
      )}
      <AnimatedBoxSs
        ref={wrapperRef}
        style={[
          inputContainerSv({ hasError, isDisabled }),
          clickableAs === 'scale' ? { transform: [{ scale: scaleAnim }] } : undefined,
          hasError && errorStyle,
          style,
        ]}
      >
        {!!leftIconAction?.iconName && !leftIconAction?.customIcon && (
          <IconSs
            name={leftIconAction?.iconName as any}
            size={leftIconAction?.iconSize ?? xmarkIconSize}
            color={leftIconAction?.iconColor}
            onPress={leftIconAction?.iconPress}
            style={styles.leftIcon}
            hasPressEffect={leftIconAction?.hasPressEffect}
          />
        )}
        {leftIconAction?.customIcon && (
          <Pressable onPress={leftIconAction?.iconPress} style={styles.leftIcon}>
            {leftIconAction?.customIcon}
          </Pressable>
        )}

        <TextInput
          style={[inputSv({ font, isStretchable, multiline, size }), inputStyle]}
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          ref={ref}
          value={inputValue}
          onChangeText={handleOnChange}
          secureTextEntry={isSecureEntry}
          multiline={multiline}
          maxLength={maxLength}
          editable={isDisabled ? false : !!editable}
          {...rest}
        />

        <BoxSs style={styles.iconContainer}>
          {inputValue.length > 0 && hasClearIcon && (
            <IconSs onPress={handleClearInput} name="xmark-solid" size={xmarkIconSize} {...clearIconProps} />
          )}

          {!!rightIconAction?.iconName && !rightIconAction?.customIcon && (
            <IconSs
              name={rightIconAction?.iconName as any}
              size={rightIconAction?.iconSize || xmarkIconSize}
              color={rightIconAction?.iconColor}
              onPress={rightIconAction?.iconPress}
              hasPressEffect={rightIconAction?.hasPressEffect}
              style={styles.rightIcon}
            />
          )}
          {rightIconAction?.customIcon && (
            <Pressable onPress={rightIconAction?.iconPress} style={styles.rightIcon}>
              {rightIconAction?.customIcon}
            </Pressable>
          )}

          {hasSecureTextEntry && (
            <IconSs
              onPress={() => setIsSecureEntry(!isSecureEntry)}
              size={xmarkIconSize}
              {...eyeIconProps}
              name={isSecureEntry ? 'eye-slash-solid' : 'eye-solid'}
            />
          )}
        </BoxSs>
      </AnimatedBoxSs>
      <BoxSs style={[styles.bottomInputContainer, showLength && !errorMessage && { justifyContent: 'flex-end' }]}>
        {!!errorMessage && (
          <BoxSs style={styles.errorContainer}>
            {!!errorIconName && <IconSs name={errorIconName as any} size="xs" color="#FF0000" />}
            <StringSs size="xs" style={styles.errorText} {...errorStringProps}>
              {errorMessage}
            </StringSs>
          </BoxSs>
        )}
        {showLength && (
          <StringSs size="xs" style={styles.lengthText} {...lengthStringProps}>
            {maxLength ? `${getStringLength(inputValue ?? '')}/${maxLength}` : getStringLength(inputValue ?? '')}
          </StringSs>
        )}
      </BoxSs>
    </BoxSs>
  );
});

Input.displayName = 'Input';

export default Input;
