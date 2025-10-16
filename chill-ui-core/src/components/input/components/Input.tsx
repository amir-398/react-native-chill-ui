import { InputProps } from '@types';
import { Box } from '@components/box';
import { Icon } from '@components/icon';
import { String } from '@components/string';
import { AnimatedBox } from '@components/animatedBox';
import { Animated, Pressable, TextInput } from 'react-native';
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { cn, getStringLength, isString, classNamePropsHandler, classNameHandler, styleHandler } from '@utils';

import { inputDefaultProps } from '../utils/defaultProps';
import { inputContainerSv, inputSv, styles } from '../styles/Input.ss.styles';
import { inputContainerTv, inputFieldTv, twStyles } from '../styles/Input.tw.styles';

/**
 * Input component with Hybrid styling (Tailwind + StyleSheet).
 * Provides a comprehensive text input with validation, icons, error handling, and customizable styling.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
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
 * @param className - Custom CSS classes for the input container
 * @param clickableAs - Animation type when input is pressed ('scale' | undefined)
 * @param customRegex - Custom regex pattern for input validation
 * @param editable - Whether the input is editable (default: true)
 * @param errorClassName - Custom CSS classes for error state
 * @param errorStyle - Custom CSS classes for the error message
 * @param inputStyle - Custom CSS classes for the input field
 * @param errorIconName - Icon name to display with error message
 * @param errorMessage - Error message to display below input
 * @param errorStringProps - Props for the error message String component
 * @param hasClearIcon - Whether to show clear icon when input has value (default: true)
 * @param hasError - Whether input is in error state
 * @param hasSecureTextEntry - Whether input should hide text (password field)
 * @param inputClassName - Custom CSS classes for the input field
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
 * @returns Styled input component with validation and icon support
 */
const Input = forwardRef<TextInput, InputProps>((props, ref) => {
  classNamePropsHandler(props, 'Input');
  const {
    allow = inputDefaultProps.allow,
    className,
    clickableAs,
    customRegex,
    editable = inputDefaultProps.editable,
    errorClassName,
    errorIconName,
    errorMessage,
    errorStringProps,
    errorStyle,
    hasClearIcon = inputDefaultProps.hasClearIcon,
    hasError,
    hasSecureTextEntry,
    inputClassName,
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
    <Box>
      {!!label && (
        <String
          size="sm"
          {...classNameHandler(twStyles.label)}
          {...styleHandler({ defaultStyle: styles.label })}
          {...labelStringProps}
        >
          {label}
        </String>
      )}
      <AnimatedBox
        ref={wrapperRef}
        {...styleHandler({
          defaultStyle: [inputContainerSv({ hasError: !!hasError, isDisabled: !!isDisabled })],
          style: [
            clickableAs === 'scale' ? { transform: [{ scale: scaleAnim }] } : undefined,
            hasError && errorStyle,
            style,
          ],
        })}
        {...classNameHandler(
          cn(
            inputContainerTv({ hasError: !!hasError, isDisabled: !!isDisabled }),
            hasError && errorClassName,
            className,
          ),
        )}
      >
        {!!leftIconAction?.iconName && !leftIconAction?.customIcon && (
          <Icon
            name={leftIconAction?.iconName as any}
            size={leftIconAction?.iconSize || xmarkIconSize}
            color={leftIconAction?.iconColor}
            onPress={leftIconAction?.iconPress}
            hasPressEffect={leftIconAction?.hasPressEffect}
            {...classNameHandler(cn(twStyles.leftIcon))}
            {...styleHandler({ defaultStyle: styles.leftIcon })}
          />
        )}
        {leftIconAction?.customIcon && (
          <Pressable
            onPress={leftIconAction?.iconPress}
            {...classNameHandler(cn(twStyles.leftIcon))}
            {...styleHandler({ defaultStyle: styles.leftIcon })}
          >
            {leftIconAction?.customIcon}
          </Pressable>
        )}

        <TextInput
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          ref={ref}
          value={inputValue}
          {...classNameHandler(
            cn(inputFieldTv({ isStretchable: !!isStretchable, multiline: !!multiline, size }), inputClassName),
          )}
          {...styleHandler({ defaultStyle: [inputSv({ isStretchable, multiline, size })], style: inputStyle })}
          onChangeText={handleOnChange}
          secureTextEntry={isSecureEntry}
          multiline={multiline}
          maxLength={maxLength}
          editable={isDisabled ? false : !!editable}
          {...rest}
        />

        <Box
          {...classNameHandler(cn(twStyles.iconContainer))}
          {...styleHandler({ defaultStyle: styles.iconContainer })}
        >
          {inputValue.length > 0 && hasClearIcon && (
            <Icon onPress={handleClearInput} name="xmark-solid" size={xmarkIconSize} />
          )}

          {!!rightIconAction?.iconName && !rightIconAction?.customIcon && (
            <Icon
              name={rightIconAction?.iconName as any}
              size={rightIconAction?.iconSize || xmarkIconSize}
              color={rightIconAction?.iconColor}
              onPress={rightIconAction?.iconPress}
              hasPressEffect={rightIconAction?.hasPressEffect}
              {...classNameHandler(cn(twStyles.rightIcon))}
              {...styleHandler({ defaultStyle: styles.rightIcon })}
            />
          )}
          {rightIconAction?.customIcon && (
            <Pressable
              onPress={rightIconAction?.iconPress}
              {...classNameHandler(cn(twStyles.rightIcon))}
              {...styleHandler({ defaultStyle: styles.rightIcon })}
            >
              {rightIconAction?.customIcon}
            </Pressable>
          )}

          {hasSecureTextEntry && (
            <Icon
              onPress={() => setIsSecureEntry(!isSecureEntry)}
              name={isSecureEntry ? 'eye-slash-solid' : 'eye-solid'}
              size="sm"
            />
          )}
        </Box>
      </AnimatedBox>
      <Box
        {...classNameHandler(
          cn(twStyles.bottomInputContainer, {
            [twStyles.bottomInputContainerShowLength]: showLength && !errorMessage,
          }),
        )}
        {...styleHandler({
          defaultStyle: styles.bottomInputContainer,
          style: showLength && !errorMessage && { justifyContent: 'flex-end' },
        })}
      >
        {!!errorMessage && (
          <Box
            {...classNameHandler(cn(twStyles.errorContainer))}
            {...styleHandler({ defaultStyle: styles.errorContainer })}
          >
            {!!errorIconName && <Icon name={errorIconName as any} size="xs" color="#FF0000" />}
            <String
              size="xs"
              colorVariant="error"
              {...styleHandler({ defaultStyle: styles.errorText })}
              {...errorStringProps}
            >
              {errorMessage}
            </String>
          </Box>
        )}
        {showLength && (
          <String
            size="xs"
            {...classNameHandler(cn('mr-0.5'))}
            {...styleHandler({ defaultStyle: styles.lengthText })}
            {...lengthStringProps}
          >
            {maxLength ? `${getStringLength(inputValue ?? '')}/${maxLength}` : getStringLength(inputValue ?? '')}
          </String>
        )}
      </Box>
    </Box>
  );
});

Input.displayName = 'Input';

export default Input;
