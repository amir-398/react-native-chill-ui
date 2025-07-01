import type { VariantProps } from 'tailwind-variants';
import type { TextInput, TextInputProps } from 'react-native';

import { inputSizeVariants } from '@/components/inputs/Input';
import type { TIcons } from '../constants/ICONS';
import type { IconProps } from './icon.types';

export interface InputProps extends TextInputProps {
  // Basic props
  label?: string;
  className?: string;
  labelClassName?: string;

  // Error handling
  hasError?: boolean;
  errorMessage?: string;
  errorClassName?: string;
  errorIconName?: keyof TIcons;

  // Icons
  hasClearIcon?: boolean;

  // Icon actions
  inputClassName?: string;
  leftIconAction?: {
    iconName?: keyof TIcons;
    iconColor?: string;
    iconSize?: IconProps['size'];
    customIcon?: React.ReactNode;
    iconPress?: () => void;
  };
  rightIconAction?: {
    iconName?: keyof TIcons;
    iconColor?: string;
    iconSize?: IconProps['size'];
    customIcon?: React.ReactNode;
    iconPress?: () => void;
  };

  // Security
  hasSecureTextEntry?: boolean;

  // Interaction
  clickableAs?: 'pressable' | 'scale';

  // Features
  showLength?: boolean;
  customRegex?: RegExp;
  allow?: 'all' | 'numbers' | 'letters' | 'lettersWithoutSpecialCharacters';

  // Styling
  isDisabled?: boolean;
  isStretchable?: boolean;
  inputRef?: React.RefObject<TextInput | null>;
  size?: VariantProps<typeof inputSizeVariants>['size'];
}

export type MaskedInputProps = {
  mask: string;
  onChangeText: ({ maskedText, unmaskedText }: { maskedText: string; unmaskedText: string }) => void;
} & Omit<InputProps, 'onChangeText'>;

export type InputsProps = {
  containerClassName?: string;
} & InputProps;
