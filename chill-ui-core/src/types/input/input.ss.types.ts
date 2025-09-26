import type { TIcons } from '@constants';
import type { VariantProps } from '@utils';
import type { IconPropsSs, StringPropsSs } from '@types';
import type { TextInputProps, View } from 'react-native';

import { inputSv } from '@components/input/styles/Input.styles';

import { StrictOmit, OptionalProp } from '../utils';

/**
 * Props for the Input component
 */
export type InputProps = TextInputProps &
  VariantProps<typeof inputSv> & {
    // Basic props
    /** Label text for the input */
    label?: string;

    labelStringProps?: StringPropsSs;

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
      iconSize?: IconPropsSs['size'];
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
      iconSize?: IconPropsSs['size'];
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

    /** Custom CSS classes for the xmark icon */
    clearIconProps?: OptionalProp<IconPropsSs, 'name'>;
    /** Custom CSS classes for the eye icon */
    eyeIconProps?: StrictOmit<IconPropsSs, 'name'>;

    /** Custom CSS classes for the error message */
    errorStringProps?: StringPropsSs;
    /** Custom CSS classes for the length text */
    lengthStringProps?: StringPropsSs;
  };

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
