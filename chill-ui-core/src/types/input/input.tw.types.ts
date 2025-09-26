import type { TIcons } from '@constants';
import type { IconPropsTw } from '@types';
import type { VariantProps } from 'tailwind-variants';
import type { TextInputProps, View } from 'react-native';

import { inputFieldTv } from '@components/input/styles/Input.variants';

import { StringPropsTw } from '../string';
import { StrictOmit, OptionalProp } from '../utils';

/**
 * Props for the Input component
 */
export interface InputProps extends TextInputProps {
  // Basic props
  /** Label text for the input */
  label?: string;
  /** Custom CSS classes for the input container */
  className?: string;

  labelStringProps?: StringPropsTw;

  // Refs
  /** Reference to the wrapper component */
  wrapperRef?: React.RefObject<View>;

  // Error handling
  /** Whether the input has an error */
  hasError?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** Custom CSS classes for the error message */
  errorClassName?: string;
  /** Icon name to display with error */
  errorIconName?: keyof TIcons;

  // Icons
  /** Whether to show clear icon */
  hasClearIcon?: boolean;

  // Icon actions
  /** Custom CSS classes for the input field */
  inputClassName?: string;
  /** Left icon configuration */
  leftIconAction?: {
    /** Icon name from the available icon set */
    iconName?: keyof TIcons;
    /** Color of the icon */
    iconColor?: string;
    /** Size of the icon */
    iconSize?: IconPropsTw['size'];
    /** Custom icon component */
    customIcon?: React.ReactNode;
    /** Callback when icon is pressed */
    iconPress?: () => void;
  };
  /** Right icon configuration */
  rightIconAction?: {
    /** Icon name from the available icon set */
    iconName?: keyof TIcons;
    /** Color of the icon */
    iconColor?: string;
    /** Size of the icon */
    iconSize?: IconPropsTw['size'];
    /** Custom icon component */
    customIcon?: React.ReactNode;
    /** Callback when icon is pressed */
    iconPress?: () => void;
  };

  // Security
  /** Whether to show secure text entry */
  hasSecureTextEntry?: boolean;

  /** Font variant for the input */
  font?: VariantProps<typeof inputFieldTv>['font'];

  // Interaction
  /** Type of clickable interaction */
  clickableAs?: 'pressable' | 'scale';

  // Features
  /** Whether to show character count */
  showLength?: boolean;
  /** Custom regex pattern for validation */
  customRegex?: RegExp;
  /** Allowed input types */
  allow?: 'all' | 'numbers' | 'letters' | 'lettersWithoutSpecialCharacters';

  // Styling
  /** Whether the input is disabled */
  isDisabled?: boolean;
  /** Whether the input stretches to fill container */
  isStretchable?: boolean;

  /** Custom CSS classes for the xmark icon */
  clearIconProps?: OptionalProp<IconPropsTw, 'name'>;
  /** Custom CSS classes for the eye icon */
  eyeIconProps?: StrictOmit<IconPropsTw, 'name'>;
  /** Size variant for the input */
  size?: VariantProps<typeof inputFieldTv>['size'];

  /** Custom CSS classes for the error message */
  errorStringProps?: StringPropsTw;
  /** Custom CSS classes for the length text */
  lengthStringProps?: StringPropsTw;
}

/**
 * Props for the MaskedInput component
 */
export type MaskedInputProps = {
  /** Mask pattern for the input */
  mask: string;
  /** Callback with masked and unmasked text */
  onChangeText: ({ maskedText, unmaskedText }: { maskedText: string; unmaskedText: string }) => void;
} & Omit<InputProps, 'onChangeText'>;

/**
 * Props for the Inputs component
 */
export type InputsProps = {
  /** Custom CSS classes for the container */
  containerClassName?: string;
} & InputProps;
