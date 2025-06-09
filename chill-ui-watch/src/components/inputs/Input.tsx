import { tv } from 'tailwind-variants';
import { useEffect, useState } from 'react';
import { Pressable, TextInput } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import cn from '../cn';
import Icon from '../icon';
import Box from '../box/Box';
import String from '../string';
import { InputProps } from '../../types';
import { getStringLength, isString } from '../../utils';

export const inputSizeVariants = tv({
  compoundVariants: [
    // Multiline and stretchable
    {
      className: 'min-h-28  text-[16px]',
      isStretchable: true,
      multiline: true,
      size: 'lg',
    },
    {
      className: 'min-h-24 text-[16px]',
      isStretchable: true,
      multiline: true,
      size: 'md',
    },
    {
      className: 'min-h-20 text-[16px]',
      isStretchable: true,
      multiline: true,
      size: 'sm',
    },
    {
      className: 'min-h-16 text-[16px]',
      isStretchable: true,
      multiline: true,
      size: 'xs',
    },
    // Multiline and not stretchable
    {
      className: 'h-40 text-[16px]',
      isStretchable: false,
      multiline: true,
      size: 'md',
    },
    {
      className: 'h-32 text-[16px]',
      isStretchable: false,
      multiline: true,
      size: 'sm',
    },
    {
      className: 'h-28 text-[16px]',
      isStretchable: false,
      multiline: true,
      size: 'xs',
    },
    {
      className: 'h-52',
      isStretchable: false,
      multiline: true,
      size: 'lg',
    },
    // sigle line and not stretchable
    {
      className: 'h-16 ',
      isStretchable: false,
      multiline: false,
      size: 'lg',
    },
    {
      className: 'h-14',
      isStretchable: false,
      multiline: false,
      size: 'md',
    },
    {
      className: 'h-12',
      isStretchable: false,
      multiline: false,
      size: 'sm',
    },
    {
      className: 'h-10 ',
      isStretchable: false,
      multiline: false,
      size: 'xs',
    },
  ],
  variants: {
    isStretchable: { true: 'leading-6 py-2' },
    multiline: { true: 'leading-6 py-2' },
    size: {
      lg: 'text-[18px]',
      md: 'text-[16px]',
      sm: 'text-[14px]',
      xs: 'text-[13px]',
    },
  },
});

export default function Input(props: InputProps) {
  const {
    allow = 'all',
    className,
    clickableAs = 'scale',
    customRegex,
    errorClassName,
    errorIconName,
    errorMessage,
    hasClearIcon = true,
    hasError,
    hasSecureTextEntry,
    inputClassName,
    inputRef,
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
    ...rest
  } = props;

  const [isSecureEntry, setIsSecureEntry] = useState<boolean>(hasSecureTextEntry || false);
  const [inputValue, setInputValue] = useState<string>(value || '');
  const scale = useSharedValue(1);

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

  const handleClearInput = () => {
    setInputValue('');
    onChangeText?.('');
  };

  const handleOnChange = (text: string) => {
    if (validateInput(text)) {
      !isString(value) && setInputValue(text);
      onChangeText?.(text);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.98, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const renderInput = () => (
    <TextInput
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      ref={inputRef}
      value={inputValue}
      className={cn(
        'flex-1',
        inputSizeVariants({ isStretchable, multiline, size }),
        inputClassName,
        hasError && errorClassName,
      )}
      onChangeText={handleOnChange}
      secureTextEntry={isSecureEntry}
      cursorColor="#fff"
      multiline={multiline}
      maxLength={maxLength}
      {...rest}
    />
  );

  const renderPressableInput = () => {
    if (clickableAs === 'scale') {
      return (
        <Animated.View style={animatedStyle} className="flex-1">
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
      <Box
        className={cn(
          'flex flex-row items-center rounded-lg border border-gray-300 bg-white px-3 text-black',
          { 'border-red-500': hasError },
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
      </Box>
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
}
