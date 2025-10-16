import { Input } from '@components/input';
import { MaskedInputProps } from '@types';
import { classNamePropsHandler } from '@utils';
import { useCallback, useEffect, useState } from 'react';

import { handleApplyMask, removeMask } from '../utils/maskUtils';

/**
 * The `<MaskedInput />` component applies formatting masks to input text.
 * Supports phone numbers, credit cards, dates, and other formatted inputs.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { MaskedInput } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <MaskedInput
 *   mask="(999) 999-9999"
 *   placeholder="Enter phone number"
 *   onChangeText={({ maskedText, unmaskedText }) => {
 *     console.log('Masked:', maskedText); // "(123) 456-7890"
 *     console.log('Unmasked:', unmaskedText); // "1234567890"
 *   }}
 * />
 * ```
 *
 * @param allow - Allowed input types: 'all' | 'numbers' | 'letters' | 'lettersWithoutSpecialCharacters' (default: 'all')
 * @param className - Custom CSS classes for the input container (NativeWind)
 * @param clickableAs - Type of clickable interaction: 'scale' | undefined
 * @param customRegex - Custom regex pattern for validation
 * @param editable - Whether input is editable (default: true)
 * @param errorClassName - Custom CSS classes for the error message (NativeWind)
 * @param errorIconName - Icon name to display with error
 * @param errorMessage - Error message to display
 * @param hasClearIcon - Whether to show clear icon (default: true)
 * @param hasError - Whether the input has an error
 * @param hasSecureTextEntry - Whether to show secure text entry
 * @param inputClassName - Custom CSS classes for the input field (NativeWind)
 * @param isDisabled - Whether the input is disabled
 * @param isStretchable - Whether the input stretches to fill container
 * @param label - Label text for the input
 * @param leftIconAction - Left icon configuration
 * @param mask - The mask pattern (use '9' for digits, other characters are literals)
 * @param multiline - Whether input supports multiple lines
 * @param onChangeText - Callback with both masked and unmasked text
 * @param onPress - Callback when input is pressed
 * @param placeholder - Placeholder text
 * @param rightIconAction - Right icon configuration
 * @param secureTextEntry - Whether to show secure text entry
 * @param showLength - Whether to show character count
 * @param size - Size variant for the input: 'xs' | 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
 * @param value - Current input value
 * @param wrapperRef - Reference to the wrapper component
 */
export function MaskedInput(props: MaskedInputProps) {
  classNamePropsHandler(props, 'MaskedInput');
  const { mask, onChangeText, value, ...rest } = props;
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

  return <Input value={inputValue} onChangeText={handleChangeText} maxLength={maxDigits} {...rest} />;
}

MaskedInput.displayName = 'MaskedInput';
