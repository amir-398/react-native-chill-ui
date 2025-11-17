import type { TIcons } from '@constants';
import type { VariantProps } from '@utils';
import type { IconPropsSs, StringPropsSs } from '@types';
import type { TextInputProps, View } from 'react-native';

import { StyleProp, ViewStyle } from 'react-native';
import { inputSv } from '@components/input/styles/Input.ss.styles';

import { StrictOmit, OptionalProp } from '../utils';

/**
 * Props for the Input component
 */
export type InputProps = TextInputProps &
  VariantProps<typeof inputSv> & {
    /** Input validation type:
     * - `'all'`
     * - `'numbers'`
     * - `'letters'`
     * - `'lettersWithoutSpecialCharacters'`
     */
    allow?: 'all' | 'numbers' | 'letters' | 'lettersWithoutSpecialCharacters';
    /** Type of clickable interaction:
     * - `'pressable'`
     * - `'scale'`
     */
    clickableAs?: 'pressable' | 'scale';
    /** Custom regex pattern for input validation */
    customRegex?: RegExp;
    /** Whether the input is editable */
    editable?: boolean;
    /** Custom style for the error message */
    errorStyle?: StyleProp<ViewStyle>;
    /** Icon name to display with error message */
    errorIconName?: keyof TIcons;
    /** Error message to display below input */
    errorMessage?: string;
    /** Props for the error message String component */
    errorStringProps?: StringPropsSs;
    /** Whether to show clear icon when input has value */
    hasClearIcon?: boolean;
    /** Whether input is in error state */
    hasError?: boolean;
    /** Whether input should hide text (password field) */
    hasSecureTextEntry?: boolean;
    /** Custom style for the input field */
    inputStyle?: StyleProp<ViewStyle>;
    /** Whether input is disabled */
    isDisabled?: boolean;
    /** Whether input should stretch to full width */
    isStretchable?: boolean;
    /** Label text to display above input */
    label?: string;
    /** Props for the label String component */
    labelStringProps?: StringPropsSs;
    /** Left icon configuration */
    leftIconAction?: {
      iconName?: keyof TIcons;
      iconColor?: string;
      iconSize?: IconPropsSs['size'];
      customIcon?: React.ReactNode;
      iconPress?: () => void;
      hasPressEffect?: boolean;
    };
    /** Props for the character count String component */
    lengthStringProps?: StringPropsSs;
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
      iconSize?: IconPropsSs['size'];
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
    clearIconProps?: OptionalProp<IconPropsSs, 'name'>;
    /** Props for the eye/eye-slash icon component */
    eyeIconProps?: StrictOmit<IconPropsSs, 'name'>;
  };
