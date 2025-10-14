import type { TIcons } from '@constants';
import type { VariantProps } from '@utils';
import type { IconPropsSs, StringPropsSs } from '@types';
import type { TextInputProps, View } from 'react-native';

import { StyleProp, ViewStyle } from 'react-native';

import { inputSv } from '@/components/input/styles/Input.ss.styles';

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

    /** Icon name to display with error */
    errorIconName?: keyof TIcons;

    // Icons
    /** Whether to show clear icon */
    hasClearIcon?: boolean;

    /** Custom CSS classes for the error message */
    errorStyle?: StyleProp<ViewStyle>;

    /** Custom CSS classes for the input field */
    inputStyle?: StyleProp<ViewStyle>;

    // Icon actions
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
      /** Whether to show press effect when icon is pressed */
      hasPressEffect?: boolean;
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
      /** Whether to show press effect when icon is pressed */
      hasPressEffect?: boolean;
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
