import type { TIcons } from '@constants';
import type { IconPropsTw } from '@types';
import type { VariantProps } from 'tailwind-variants';
import type { TextInputProps, View } from 'react-native';

import { inputFieldTv } from '@components/input/styles/Input.tw.styles';

import { StringPropsTw } from '../string';
import { StrictOmit, OptionalProp } from '../utils';

/**
 * Props for the Input component
 */
export type InputProps = TextInputProps &
  VariantProps<typeof inputFieldTv> & {
    /** Input validation type:
     * - `'all'`
     * - `'numbers'`
     * - `'letters'`
     * - `'lettersWithoutSpecialCharacters'`
     */
    allow?: 'all' | 'numbers' | 'letters' | 'lettersWithoutSpecialCharacters';
    /** Custom CSS classes for the input container (NativeWind) */
    className?: string;
    /** Type of clickable interaction:
     * - `'pressable'`
     * - `'scale'`
     */
    clickableAs?: 'pressable' | 'scale';
    /** Custom regex pattern for input validation */
    customRegex?: RegExp;
    /** Whether the input is editable  */
    editable?: boolean;
    /** Custom CSS classes for error state (NativeWind) */
    errorClassName?: string;
    /** Icon name to display with error message */
    errorIconName?: keyof TIcons;
    /** Error message to display below input */
    errorMessage?: string;
    /** Props for the error message String component */
    errorStringProps?: StringPropsTw;
    /** Whether to show clear icon when input has value */
    hasClearIcon?: boolean;
    /** Whether input is in error state */
    hasError?: boolean;
    /** Whether input should hide text (password field) */
    hasSecureTextEntry?: boolean;
    /** Custom CSS classes for the input field (NativeWind) */
    inputClassName?: string;
    /** Whether input is disabled */
    isDisabled?: boolean;
    /** Whether input should stretch to full width */
    isStretchable?: boolean;
    /** Label text to display above input */
    label?: string;
    /** Props for the label String component */
    labelStringProps?: StringPropsTw;
    /** Left icon configuration */
    leftIconAction?: {
      iconName?: keyof TIcons;
      iconColor?: string;
      iconSize?: IconPropsTw['size'];
      customIcon?: React.ReactNode;
      iconPress?: () => void;
      hasPressEffect?: boolean;
    };
    /** Props for the character count String component */
    lengthStringProps?: StringPropsTw;
    /** Maximum number of characters allowed */
    maxLength?: number;
    /** Whether input supports multiple lines */
    multiline?: boolean;
    /** Callback when input text changes */
    onChangeText?: (text: string) => void;
    /** Callback when input is pressed */
    onPress?: () => void;
    /** Placeholder text for the input */
    placeholder?: string;
    /** Right icon configuration */
    rightIconAction?: {
      iconName?: keyof TIcons;
      iconColor?: string;
      iconSize?: IconPropsTw['size'];
      customIcon?: React.ReactNode;
      iconPress?: () => void;
      hasPressEffect?: boolean;
    };
    /** Whether to show character count */
    showLength?: boolean;

    /** Current input value */
    value?: string;
    /** Ref for the input container wrapper */
    wrapperRef?: React.RefObject<View>;
    /** Props for the clear icon component */
    clearIconProps?: OptionalProp<IconPropsTw, 'name'>;
    /** Props for the eye/eye-slash icon component */
    eyeIconProps?: StrictOmit<IconPropsTw, 'name'>;
  };
