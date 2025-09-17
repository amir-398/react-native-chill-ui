import { useCallback, useEffect, useState } from 'react';

import Input from '../inputs/Input';
import { MaskedInputProps } from '../../types/input.types';

/**
 * Applies a mask pattern to the input text
 * @param text - The text to apply mask to
 * @param mask - The mask pattern (use '9' for digits)
 * @returns The masked text
 */
const applyMask = (text: string, mask: string): string => {
  let result = '';
  let textIndex = 0;

  for (let i = 0; i < mask.length && textIndex < text.length; i += 1) {
    if (mask[i] === '9') {
      const char = text[textIndex];
      if (char !== undefined && /\d/.test(char)) {
        result += char;
        textIndex += 1;
      }
    } else {
      result += mask[i];
      if (text[textIndex] === mask[i]) {
        textIndex += 1;
      }
    }
  }

  return result;
};

/**
 * Removes all non-digit characters from text
 * @param text - The text to remove mask from
 * @returns Text with only digits
 */
export const removeMask = (text: string): string => text.replace(/\D/g, '');

/**
 * Handles applying mask to text with null safety
 * @param text - The text to mask (can be undefined)
 * @param mask - The mask pattern to apply
 * @returns The masked text or empty string if text is undefined
 */
export const handleApplyMask = (text: string | undefined, mask: string) => {
  if (!text) {
    return '';
  }

  const maskedText = applyMask(text, mask);
  return maskedText;
};

/**
 * MaskedInput component that applies formatting masks to input text.
 * Supports phone numbers, credit cards, dates, and other formatted inputs.
 *
 * @example
 * ```tsx
 * // Phone number mask
 * <MaskedInput
 *   mask="(999) 999-9999"
 *   placeholder="Enter phone number"
 *   onChangeText={({ maskedText, unmaskedText }) => {
 *     console.log('Masked:', maskedText); // "(123) 456-7890"
 *     console.log('Unmasked:', unmaskedText); // "1234567890"
 *   }}
 * />
 *
 * // Credit card mask
 * <MaskedInput
 *   mask="9999 9999 9999 9999"
 *   placeholder="Enter card number"
 *   onChangeText={({ maskedText, unmaskedText }) => {
 *     setCardNumber(maskedText);
 *     setCardNumberDigits(unmaskedText);
 *   }}
 * />
 *
 * // Date mask
 * <MaskedInput
 *   mask="99/99/9999"
 *   placeholder="MM/DD/YYYY"
 *   onChangeText={({ maskedText, unmaskedText }) => {
 *     setDate(maskedText);
 *   }}
 * />
 * ```
 *
 * @param mask - The mask pattern (use '9' for digits, other characters are literals)
 * @param onChangeText - Callback with both masked and unmasked text
 * @param value - Current input value
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
 * @param leftIconAction - Left icon configuration
 * @param rightIconAction - Right icon configuration
 * @param hasSecureTextEntry - Whether to show secure text entry
 * @param clickableAs - Type of clickable interaction
 * @param showLength - Whether to show character count
 * @param customRegex - Custom regex pattern for validation
 * @param allow - Allowed input types
 * @param isDisabled - Whether the input is disabled
 * @param isStretchable - Whether the input stretches to fill container
 * @param size - Size variant for the input
 * @param placeholder - Placeholder text
 * @param multiline - Whether input supports multiple lines
 * @param editable - Whether input is editable
 * @param onPress - Callback when input is pressed
 * @param secureTextEntry - Whether to show secure text entry
 * @returns MaskedInput component with automatic formatting
 */
export default function MaskedInput({ mask, onChangeText, value, ...props }: MaskedInputProps) {
  const [inputValue, setInputValue] = useState(handleApplyMask(value, mask));
  const maxDigits = mask.length;

  /**
   * Handles text changes by removing mask, applying new mask, and calling onChangeText
   * @param text - The new text value
   */
  const handleChangeText = useCallback(
    (text: string) => {
      const removedMaskText = removeMask(text);
      const maskedText = handleApplyMask(removedMaskText, mask);
      setInputValue(maskedText);
      onChangeText?.({ maskedText, unmaskedText: removedMaskText });
    },
    [mask, onChangeText],
  );

  useEffect(() => {
    setInputValue(handleApplyMask(value, mask));
  }, [value, mask]);

  return <Input value={inputValue} onChangeText={handleChangeText} maxLength={maxDigits} {...props} />;
}
