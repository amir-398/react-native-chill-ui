import type { InputProps } from '../input/input.ss.types';

/**
 * Props for the MaskedInput component (StyleSheet version)
 */
export type MaskedInputProps = {
  /** Mask pattern for the input (use '9' for digits, other characters are literals) */
  mask: string;
  /** Callback with masked and unmasked text */
  onChangeText?: ({ maskedText, unmaskedText }: { maskedText: string; unmaskedText: string }) => void;
} & Omit<InputProps, 'onChangeText'>;
