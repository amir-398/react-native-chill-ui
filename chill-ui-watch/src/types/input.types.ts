import type { VariantProps } from 'tailwind-variants';
import type { TextInputProps, View } from 'react-native';

import { inputSizeVariants } from '@/components/inputs/Input';

import type { IconProps } from './icon.types';
import type { TIcons } from '../constants/ICONS';

export interface InputProps extends TextInputProps {
  // Basic props
  label?: string;
  className?: string;
  labelClassName?: string;

  // Refs
  wrapperRef?: React.RefObject<View>;

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
  size?: VariantProps<typeof inputSizeVariants>['size'];
}

export type MaskedInputProps = {
  mask: string;
  onChangeText: ({ maskedText, unmaskedText }: { maskedText: string; unmaskedText: string }) => void;
} & Omit<InputProps, 'onChangeText'>;

export type InputsProps = {
  containerClassName?: string;
} & InputProps;
