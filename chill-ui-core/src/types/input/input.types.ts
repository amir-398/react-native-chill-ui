import type { TIcons } from '@constants';
import type { VariantProps } from '@utils';
import type { TextInputProps, View } from 'react-native';
import type { IconPropsTw, StringPropsTw } from '@types';

import { StyleProp, ViewStyle } from 'react-native';

import { inputSv } from '@/components/input/styles/Input.ss.styles';

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
    /** Custom CSS classes for the input container (NativeWind) */
    className?: string;
    /** Type of clickable interaction:
     * - `'pressable'`
     * - `'scale'`
     */
    clickableAs?: 'pressable' | 'scale';
    /** Custom regex pattern for input validation */
    customRegex?: RegExp;
    /** Whether the input is editable */
    editable?: boolean;
    /** Custom CSS classes for error state (NativeWind) */
    errorClassName?: string;
    /** Icon name to display with error message */
    errorIconName?: keyof TIcons;
    /** Error message to display below input */
    errorMessage?: string;
    /** Props for the error message String component */
    errorStringProps?: StringPropsTw;
    /** Custom style for the error message */
    errorStyle?: StyleProp<ViewStyle>;
    /** Whether to show clear icon when input has value */
    hasClearIcon?: boolean;
    /** Whether input is in error state */
    hasError?: boolean;
    /** Whether input should hide text (password field) */
    hasSecureTextEntry?: boolean;
    /** Custom CSS classes for the input field (NativeWind) */
    inputClassName?: string;
    /** Custom style for the input field */
    inputStyle?: StyleProp<ViewStyle>;
    /** Whether input is disabled */
    isDisabled?: boolean;
    /** Whether input should stretch to full width */
    isStretchable?: boolean;
    /** Label text to display above input */
    label?: string;
    /** Props for the label String component */
    labelStringProps?: StringPropsTw;
    /** Left icon configuration
     * - `iconName`
     * - `iconSize`
     * - `iconColor`
     * - `iconPress`
     * - `customIcon`
     */
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
    /** Right icon configuration
     * - `iconName`
     * - `iconSize`
     * - `iconColor`
     * - `iconPress`
     * - `customIcon`
     */
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
    /** Input size variant:
     * - `'xs'`
     * - `'sm'`
     * - `'md'`
     * - `'lg'`
     * - `'xl'`
     */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /** Style object for the input container */
    style?: StyleProp<ViewStyle>;
    /** Current input value */
    value?: string;
    /** Ref for the input container wrapper */
    wrapperRef?: React.RefObject<View>;
    /** Props for the clear icon component */
    clearIconProps?: OptionalProp<IconPropsTw, 'name'>;
    /** Props for the eye/eye-slash icon component */
    eyeIconProps?: StrictOmit<IconPropsTw, 'name'>;
  };
