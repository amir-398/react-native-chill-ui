import type { VariantProps } from 'tailwind-variants';
import type { TextInputProps, View } from 'react-native';

import type { IconProps } from './icon/icon.tw.types';
import type { TIcons } from '../constants/ICONS';

import inputSizeVariants from '../components/input/styleVariants';

/**
 * Props for the Input component
 */
export interface InputProps extends TextInputProps {
  // Basic props
  /** Label text for the input */
  label?: string;
  /** Custom CSS classes for the input container */
  className?: string;
  /** Custom CSS classes for the label */
  labelClassName?: string;

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
    iconSize?: IconProps['size'];
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
    iconSize?: IconProps['size'];
    /** Custom icon component */
    customIcon?: React.ReactNode;
    /** Callback when icon is pressed */
    iconPress?: () => void;
  };

  // Security
  /** Whether to show secure text entry */
  hasSecureTextEntry?: boolean;

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
  /** Size variant for the input */
  size?: VariantProps<typeof inputSizeVariants>['size'];
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
